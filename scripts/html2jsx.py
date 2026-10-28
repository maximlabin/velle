"""Convert one element of a page in the WordPress copy into JSX (a starting point for hand-written components).

Usage (from web/): python3 -I scripts/html2jsx.py ../site PAGE SELECTOR [--inner]
SELECTOR is tag, tag.class or tag#id; the first match is converted.
"""
import json
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from dom import RAW, VOID, nav_attrs, parse, rewrite_attr  # noqa: E402

ATTR_MAP = {
    "class": "className", "for": "htmlFor", "tabindex": "tabIndex", "readonly": "readOnly", "maxlength": "maxLength",
    "autocomplete": "autoComplete", "autoplay": "autoPlay", "playsinline": "playsInline", "frameborder": "frameBorder",
    "allowfullscreen": "allowFullScreen", "colspan": "colSpan", "rowspan": "rowSpan", "srcset": "srcSet",
    "crossorigin": "crossOrigin", "viewbox": "viewBox", "xlink:href": "xlinkHref", "xml:space": "xmlSpace",
    "xmlns:xlink": "xmlnsXlink", "enctype": "encType", "novalidate": "noValidate", "contenteditable": "contentEditable",
    "itemscope": "itemScope", "itemprop": "itemProp", "itemtype": "itemType",
}
BOOL_ATTRS = {"checked", "disabled", "selected", "required", "multiple", "autoplay", "muted", "loop", "controls",
              "playsinline", "readonly", "hidden", "allowfullscreen", "novalidate", "defer", "async", "itemscope", "download"}
NUMERIC = {"maxLength", "minLength", "tabIndex", "rows", "cols", "size", "colSpan", "rowSpan", "span", "start"}
NAMED_TAGS = {"input", "textarea", "select", "button", "form", "iframe", "object", "output", "fieldset", "meta",
              "map", "param", "slot", "img", "a"}
# Attributes React would reject or warn about on these elements; uncontrolled form state stays in the DOM.
RENAME_FORM = {"value": "defaultValue", "checked": "defaultChecked", "selected": None}
# SVG presentation attributes are kebab-case in HTML, camelCase in React.
KEEP_KEBAB = re.compile(r"^(data|aria)-")
# html.parser lowercases names; SVG needs its camelCase element and attribute names back.
SVG_TAGS = {t.lower(): t for t in (
    "clipPath linearGradient radialGradient foreignObject textPath feBlend feColorMatrix feComponentTransfer "
    "feComposite feConvolveMatrix feDiffuseLighting feDisplacementMap feDropShadow feFlood feFuncA feFuncB feFuncG "
    "feFuncR feGaussianBlur feImage feMerge feMergeNode feMorphology feOffset feSpecularLighting feTile feTurbulence "
    "animateMotion animateTransform").split()}
SVG_ATTRS = {a.lower(): a for a in (
    "filterUnits gradientUnits gradientTransform patternUnits patternContentUnits patternTransform clipPathUnits "
    "maskUnits maskContentUnits primitiveUnits stdDeviation preserveAspectRatio baseFrequency numOctaves "
    "markerHeight markerWidth markerUnits refX refY spreadMethod startOffset tableValues kernelMatrix "
    "diffuseConstant specularConstant specularExponent surfaceScale xChannelSelector yChannelSelector "
    "pathLength textLength lengthAdjust").split()}


def attr_name(name):
    if name in ATTR_MAP:
        return ATTR_MAP[name]
    if name in SVG_ATTRS:
        return SVG_ATTRS[name]
    if KEEP_KEBAB.match(name):
        return name
    return re.sub(r"[-:]([a-z])", lambda m: m.group(1).upper(), name)


def style_obj(css):
    items = []
    for decl in css.split(";"):
        if ":" not in decl:
            continue
        prop, val = decl.split(":", 1)
        prop, val = prop.strip(), val.strip()
        if not prop:
            continue
        key = prop if prop.startswith("--") else re.sub(r"-([a-z])", lambda m: m.group(1).upper(), prop.lower())
        items.append(f"{json.dumps(key)}: {json.dumps(val, ensure_ascii=False)}")
    return "{{ " + ", ".join(items) + " }}"


def text_jsx(s):
    if not s.strip():
        return " " if s and "\n" not in s else ""
    s = re.sub(r"\s+", " ", s)
    if re.search(r"[{}<>]", s):
        return "{" + json.dumps(s, ensure_ascii=False) + "}"
    return s


class _Renamed:
    """A node seen under another tag name, with replaced attributes."""

    def __init__(self, node, tag, attrs):
        self.tag, self.attrs, self.children, self.parent = tag, attrs, node.children, node.parent


def convert(node, page_file, depth=0, in_link=False):
    pad = "  " * depth
    if isinstance(node, str):
        t = text_jsx(node)
        return pad + t.strip() if t.strip() else ""
    if node.tag in RAW or node.tag == "noscript":
        return ""
    attrs_src = nav_attrs(node.attrs)
    if node.tag == "a" and in_link:
        # Browsers split a link nested in a link; keep it clickable as a span (see ThemeScripts data-href).
        href = attrs_src.pop("href", None)
        if href and "data-href" not in attrs_src:
            attrs_src["data-href"] = href
        node = _Renamed(node, "span", attrs_src)
    attrs = []
    for k, v in attrs_src.items():
        name = attr_name(k)
        if node.tag in ("input", "textarea", "select", "option") and k in RENAME_FORM:
            if k == "selected" or RENAME_FORM[k] is None:
                continue  # <option selected> has no React form; the first option is the default anyway
            if node.tag != "option" and not (node.tag == "input" and node.attrs.get("type") in ("submit", "button", "hidden")):
                name = RENAME_FORM[k]
        if node.tag == "img" and k == "href":
            continue  # invalid on <img> (footer logo)
        if v is None or (k in BOOL_ATTRS and v in ("", k)):
            attrs.append(name)
            continue
        v = rewrite_attr(page_file, k, v)
        if k == "style":
            attrs.append(f"style={style_obj(v)}")
        elif name in NUMERIC and re.fullmatch(r"-?\d+", v):
            attrs.append(f"{name}={{{int(v)}}}")
        elif k == "name" and node.tag not in NAMED_TAGS:
            attrs.append(f"{{...{{ name: {json.dumps(v, ensure_ascii=False)} }}}}")  # kept in the DOM, unknown to React's types
        else:
            attrs.append(f"{name}={json.dumps(v, ensure_ascii=False)}")
    tag = SVG_TAGS.get(node.tag, node.tag)
    open_tag = f"<{tag}{' ' + ' '.join(attrs) if attrs else ''}"
    if node.tag in VOID or not node.children:
        return pad + open_tag + " />"
    kids = [convert(c, page_file, depth + 1, in_link or node.tag == "a") for c in node.children]
    kids = [k for k in kids if k.strip()]
    if not kids:
        return pad + open_tag + " />"
    if len(kids) == 1 and isinstance(node.children[0], str) and len(kids[0]) < 90:
        return pad + open_tag + ">" + kids[0].strip() + f"</{tag}>"
    return pad + open_tag + ">\n" + "\n".join(kids) + f"\n{pad}</{tag}>"


def select(root, selector):
    m = re.match(r"^([a-z0-9]+)?(?:\.([\w-]+))?(?:#([\w-]+))?$", selector)
    tag, cls, id_ = m.groups()
    kw = {"id": id_} if id_ else {}
    return root.find(tag, cls, **kw)


if __name__ == "__main__":
    site, page, selector = sys.argv[1:4]
    inner = "--inner" in sys.argv
    component = sys.argv[sys.argv.index("--component") + 1] if "--component" in sys.argv else None
    with open(os.path.join(site, page), encoding="utf-8") as f:
        node = select(parse(f.read()), selector)
    if node is None:
        sys.exit(f"{selector} not found in {page}")
    parts = node.children if inner else [node]
    body = "\n".join(c for c in (convert(p, page, 3 if component else 0) for p in parts) if c.strip())
    if not component:
        print(body)
    else:
        print(f"// Generated by scripts/html2jsx.py from site/{page} ({selector}); edit freely.\n"
              f"export default function {component}() {{\n  return (\n    <>\n{body}\n    </>\n  );\n}}")
