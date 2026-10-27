"""Find markup the HTML parser restructures (and React then fails to hydrate) in exported pages.

Usage (from web/): python3 -I scripts/check_nesting.py out
Reports <a> in <a>, block elements in <p>, nested <p>/<button>/<form>, headings in headings.
"""
import collections
import os
import sys
from html.parser import HTMLParser

VOID = {"area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "source", "track", "wbr"}
BLOCK = {"address", "article", "aside", "blockquote", "details", "div", "dl", "fieldset", "figcaption", "figure",
         "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "hr", "main", "nav", "ol", "p", "pre",
         "section", "table", "ul", "menu"}
HEADINGS = {"h1", "h2", "h3", "h4", "h5", "h6"}


class Check(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.stack, self.issues, self.skip = [], collections.Counter(), 0

    def where(self):
        return " > ".join(f"{t}.{c}" if c else t for t, c in self.stack[-3:])

    def handle_starttag(self, tag, attrs):
        if tag in ("script", "style", "svg") or self.skip:
            if tag in ("script", "style", "svg"):
                self.skip += 1
            return
        tags = [t for t, _ in self.stack]
        cls = (dict(attrs).get("class") or "").split()[:1]
        if tag == "a" and "a" in tags:
            self.issues[f"<a> in <a>: {self.where()}"] += 1
        if tag in BLOCK and tags and tags[-1] == "p":
            self.issues[f"<{tag}> in <p>: {self.where()}"] += 1
        if tag in ("button", "form") and tag in tags:
            self.issues[f"<{tag}> in <{tag}>: {self.where()}"] += 1
        if tag in HEADINGS and tags and tags[-1] in HEADINGS:
            self.issues[f"<{tag}> in <{tags[-1]}>: {self.where()}"] += 1
        if tag not in VOID:
            self.stack.append((tag, cls[0] if cls else ""))

    def handle_endtag(self, tag):
        if tag in ("script", "style", "svg") and self.skip:
            self.skip -= 1
            return
        if self.skip:
            return
        for i in range(len(self.stack) - 1, -1, -1):
            if self.stack[i][0] == tag:
                del self.stack[i:]
                break


if __name__ == "__main__":
    total = collections.Counter()
    pages_with = collections.defaultdict(set)
    for root, _, files in os.walk(sys.argv[1]):
        for f in files:
            if f.endswith(".html"):
                c = Check()
                c.feed(open(os.path.join(root, f), encoding="utf-8").read())
                for issue, n in c.issues.items():
                    total[issue] += n
                    pages_with[issue].add(os.path.relpath(root, sys.argv[1]))
    for issue, n in total.most_common():
        sample = sorted(pages_with[issue])[:3]
        print(f"{n:5d}  {issue}   [{len(pages_with[issue])} pages, e.g. {', '.join(sample)}]")
