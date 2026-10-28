"""Tiny DOM for reading the WordPress copy: parse, query by tag/class, serialize with URL rewriting."""
import html
import posixpath
import re
from html.parser import HTMLParser

VOID = {"area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "source", "track", "wbr"}
RAW = {"script", "style"}
SITE_HOSTS = ("https://velle.ru", "http://velle.ru", "https://www.velle.ru", "//velle.ru")


class Node:
    __slots__ = ("tag", "attrs", "children", "parent")

    def __init__(self, tag, attrs=None, parent=None):
        self.tag, self.attrs, self.children, self.parent = tag, dict(attrs or {}), [], parent

    @property
    def classes(self):
        return (self.attrs.get("class") or "").split()

    def has_class(self, name):
        return name in self.classes

    def iter(self):
        for child in self.children:
            if isinstance(child, Node):
                yield child
                yield from child.iter()

    def find_all(self, tag=None, cls=None, **attrs):
        return [n for n in self.iter() if matches(n, tag, cls, attrs)]

    def find(self, tag=None, cls=None, **attrs):
        return next((n for n in self.iter() if matches(n, tag, cls, attrs)), None)

    def kids(self, tag=None, cls=None):
        return [c for c in self.children if isinstance(c, Node) and matches(c, tag, cls, {})]

    def text(self):
        parts = []
        for child in self.children:
            if isinstance(child, str):
                parts.append(child)
            elif child.tag == "br":
                parts.append("\n")
            elif child.tag not in RAW:
                parts.append(child.text())
        return "".join(parts)

    def clean_text(self):
        return " ".join(self.text().split())


def matches(node, tag, cls, attrs):
    if tag and node.tag != tag:
        return False
    if cls and cls not in node.classes:
        return False
    return all(node.attrs.get(k.rstrip("_").replace("_", "-")) == v for k, v in attrs.items())


# Elements whose start tag closes an open <p>, as the HTML5 parser does ("close a p element").
CLOSES_P = {"address", "article", "aside", "blockquote", "center", "details", "dialog", "dir", "div", "dl",
            "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header",
            "hgroup", "hr", "main", "menu", "nav", "ol", "p", "pre", "section", "summary", "table", "ul", "li",
            "dd", "dt"}
P_SCOPE_STOP = {"button", "table", "td", "th", "caption", "marquee", "object", "applet", "template", "svg", "html"}


class _Builder(HTMLParser):
    """Builds the tree the way browsers do for the theme's invalid markup, so React hydrates what it rendered:
    a block start tag closes an open <p>, a stray </p> becomes an empty <p>, a <form> inside a <form> is dropped."""

    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.root = Node("#root")
        self.cur = self.root
        self.dropped_forms = 0

    def _open_p(self):
        n = self.cur
        while n is not self.root and n.tag not in P_SCOPE_STOP:
            if n.tag == "p":
                return n
            n = n.parent
        return None

    def _inside(self, tag):
        n = self.cur
        while n is not self.root:
            if n.tag == tag:
                return True
            n = n.parent
        return False

    def handle_starttag(self, tag, attrs):
        if tag == "form" and self._inside("form"):
            self.dropped_forms += 1
            return
        if tag in CLOSES_P:
            p = self._open_p()
            if p is not None:
                self.cur = p.parent
        node = Node(tag, attrs, self.cur)
        self.cur.children.append(node)
        if tag not in VOID:
            self.cur = node

    def handle_startendtag(self, tag, attrs):
        self.cur.children.append(Node(tag, attrs, self.cur))

    def handle_endtag(self, tag):
        if tag == "form" and self.dropped_forms:
            self.dropped_forms -= 1
            return
        if tag == "p" and self._open_p() is None:
            self.cur.children.append(Node("p", {}, self.cur))
            return
        n = self.cur
        while n is not self.root and n.tag != tag:
            n = n.parent
        if n is not self.root:
            self.cur = n.parent

    def handle_data(self, data):
        self.cur.children.append(data)


def parse(source):
    b = _Builder()
    b.feed(source)
    return b.root


def site_path(page_file, url):
    """Turn a link found in page_file (path inside the copy) into a root path of the new site."""
    if url is None:
        return None
    url = url.strip()
    for host in SITE_HOSTS:
        if url.startswith(host):
            url = url[len(host):] or "/"
            break
    if not url or url.startswith(("#", "mailto:", "tel:", "javascript:", "data:")) or re.match(r"^[a-z]+:", url):
        return url
    path, sep, frag = url.partition("#")
    path, qsep, query = path.partition("?")
    if not path.startswith("/"):
        path = posixpath.normpath(posixpath.join(posixpath.dirname(page_file), path))
        path = "/" + path.lstrip("./")
    if path.endswith("/index.html") or path == "/index.html":
        path = path[: -len("index.html")]
    elif not posixpath.splitext(path)[1] and not path.endswith("/"):
        path += "/"
    return path + (qsep + query if qsep else "") + (sep + frag if sep else "")


URL_ATTRS = {"href", "src", "poster", "data-src", "data-href", "action"}
CSS_URL = re.compile(r"url\(\s*(['\"]?)([^'\")]+)\1\s*\)")
EVENT_ATTR = re.compile(r"^on[a-z]+$")
# Every onclick in the theme is a plain redirect; it becomes data-href, followed by components/ThemeScripts.tsx.
ONCLICK_NAV = re.compile(r"^\s*(?:window\.)?location\.href\s*=\s*'([^']*)'\s*;?\s*$")


def nav_attrs(attrs):
    """Attributes with onclick redirects turned into data-href and other on* handlers dropped."""
    out = {}
    for k, v in attrs.items():
        if EVENT_ATTR.match(k):
            m = ONCLICK_NAV.match(v or "") if k == "onclick" else None
            if m:
                out["data-href"] = m.group(1)
            continue
        out[k] = v
    return out


def rewrite_attr(page_file, name, value):
    if name in URL_ATTRS:
        return site_path(page_file, value)
    if name in ("srcset", "data-srcset"):
        return ", ".join(
            " ".join([site_path(page_file, part.split()[0])] + part.split()[1:])
            for part in value.split(",") if part.strip()
        )
    if name == "style":
        return CSS_URL.sub(lambda m: f"url('{site_path(page_file, m.group(2))}')", value)
    return value


def to_html(node, page_file, inner=True):
    """Serialize a node (its children when inner) with links rewritten for the new site; scripts and on* handlers dropped."""
    out = []

    def walk(n):
        if isinstance(n, str):
            out.append(html.escape(n, quote=False))
            return
        if n.tag in RAW:
            return
        attrs = "".join(
            f' {k}="{html.escape(rewrite_attr(page_file, k, v or ""), quote=True)}"' if v is not None else f" {k}"
            for k, v in nav_attrs(n.attrs).items()
        )
        out.append(f"<{n.tag}{attrs}>")
        if n.tag in VOID:
            return
        for c in n.children:
            walk(c)
        out.append(f"</{n.tag}>")

    if inner:
        for c in node.children:
            walk(c)
    else:
        walk(node)
    return "".join(out).strip()


def bg_image(page_file, style):
    m = CSS_URL.search(style or "")
    return site_path(page_file, m.group(2)) if m else None
