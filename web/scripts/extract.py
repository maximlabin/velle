"""Extract products, recipes, blog posts and page metadata from the WordPress copy into JSON.

Usage (from web/): python3 -I scripts/extract.py ../site content
Run with -I: the copy is downloaded data, nothing in it should be importable.
"""
import hashlib
import json
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from dom import bg_image, parse, rewrite_attr, site_path, to_html  # noqa: E402

SITE, OUT = sys.argv[1], sys.argv[2]
os.makedirs(OUT, exist_ok=True)


def load(rel):
    with open(os.path.join(SITE, rel), encoding="utf-8") as f:
        return parse(f.read())


def pages(section):
    root = os.path.join(SITE, section)
    return sorted(d for d in os.listdir(root) if os.path.isfile(os.path.join(root, d, "index.html")) and d != "page")


def slug_of(path):
    """'/recipes/bananovoe-sufle/' -> 'bananovoe-sufle'"""
    return path.strip("/").split("/")[-1] if path else None


def meta(doc):
    head = doc.find("head")
    get = lambda **kw: (head.find("meta", **kw) or {}).attrs.get("content") if head.find("meta", **kw) else None
    title = head.find("title")
    short = head.find("link", rel="shortlink")
    post_id = re.search(r"[?&]p=(\d+)", short.attrs.get("href", "")) if short else None
    return {
        "title": title.clean_text() if title else None,
        "description": get(name="description"),
        "ogImage": get(property="og:image"),
        # WordPress lists posts newest first; these give that order back.
        "published": get(property="article:published_time"),
        "postId": int(post_id.group(1)) if post_id else None,
    }


def newest_first(item):
    m = item["meta"]
    return (m.get("published") or "", m.get("postId") or 0)


def texts(nodes):
    return [n.clean_text() for n in nodes]


def pairs(node):
    """<p>Label</p><span>Value</span>… -> [{label, value}]"""
    out, label = [], None
    for child in node.kids():
        if child.tag == "p":
            label = child.clean_text()
        elif child.tag == "span" and label is not None:
            out.append({"label": label, "value": child.clean_text()})
            label = None
    return out


def write(name, data):
    with open(os.path.join(OUT, name), "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
        f.write("\n")


# ---------- products ----------

def card(page_file, item):
    link = item.find("a")
    img, tag = item.find("img", "productPic"), item.find("img", "tag")
    return {
        "slug": slug_of(site_path(page_file, link.attrs.get("href"))) if link else None,
        "flavour": item.classes[1] if len(item.classes) > 1 else None,
        "image": site_path(page_file, img.attrs.get("src")) if img else None,
        "tag": site_path(page_file, tag.attrs.get("src")) if tag else None,
        "title": item.find("div", "itemTitle").clean_text(),
        "volume": item.find("div", "volume").clean_text() if item.find("div", "volume") else "",
    }


def extract_products():
    f = "products/index.html"
    doc = load(f)
    main = doc.find("main")
    tabs = main.find("div", "tabs")
    filters = {
        kind: [{"key": b.attrs.get("data-attribute"), "label": b.clean_text()} for b in tabs.find_all("button", kind)]
        for kind in ("lineage", "flavour")
    }
    lines = [
        {
            "slug": block.classes[1],
            "title": block.find("div", "contentBlock__title").clean_text(),
            "items": [card(f, it) for it in block.find("div", "contentItems").kids("div", "contentItem")],
        }
        for block in main.find_all("div", "contentBlock")
    ]

    variants, product_pages, keys = {}, {}, {}
    raw_slides = {}
    for slug in pages("products"):
        pf = f"products/{slug}/index.html"
        d = load(pf)
        slides = []
        for s in d.find("div", "cardSlider").find("div", "swiper-wrapper").kids("div", "swiper-slide"):
            desc = s.find("div", "description")
            img = s.find("div", "pic").find("img")
            where = s.find("a", "where-btn")
            slides.append({
                "anchor": s.attrs.get("id") or None,
                "title": desc.find("div", "title").clean_text(),
                "subtitle": desc.find("div", "subtitle").clean_text(),
                "textHtml": to_html(desc.find("div", "text"), pf),
                "tagsHtml": to_html(desc.find("div", "tags"), pf) or None,
                "where": site_path(pf, where.attrs.get("href")) if where else None,
                "image": site_path(pf, img.attrs.get("src")) if img else None,
                "compound": pairs(s.find("div", "compound")),
            })
        raw_slides[slug] = slides
        keys[slug] = (slides[0]["title"], slides[0]["subtitle"], slides[0]["image"])

        rec = d.find("div", "recipesSlider")
        recipes = []
        for item in rec.find_all("div", "recipeCard") if rec else []:
            m = re.search(r"location\.href='([^']+)'", item.find("button", "itemLink").attrs.get("onclick", ""))
            img = item.find("img")
            recipes.append({
                "slug": slug_of(site_path(pf, m.group(1))) if m else None,
                "title": item.find("div", "maskTitle").clean_text(),
                "image": site_path(pf, img.attrs.get("src")) if img else None,
                "badges": texts(item.find_all("div", "bottomItem")),
            })
        other = d.find("div", "otherSlider")
        others = [slug_of(site_path(pf, a.attrs.get("href"))) for a in other.find_all("a", "otherLink")] if other else []
        main = d.find("main")
        section = lambda cls: main.find("div", cls)
        product_pages[slug] = {
            "crumb": main.find("nav").kids("div", "navItem")[-1].clean_text(),
            "recipesTitle": section("recipes").find("div", "title").clean_text() if section("recipes") else None,
            "recipesSubtitleHtml": to_html(section("recipes").find("div", "subtitle"), pf) if section("recipes") else None,
            "otherTitle": section("other").find("div", "title").clean_text() if section("other") else None,
            "otherSubtitleHtml": to_html(section("other").find("div", "subtitle"), pf) if section("other") else None,
            "recipes": recipes, "others": others, "meta": meta(d),
        }

    # Every variant once: a product's own first slide is keyed by its slug, the rest by content.
    by_key = {v: k for k, v in keys.items()}
    for slug, slides in raw_slides.items():
        ids = []
        for s in slides:
            key = (s["title"], s["subtitle"], s["image"])
            vid = by_key.get(key) or "v-" + hashlib.md5(repr(key).encode()).hexdigest()[:8]
            variants.setdefault(vid, s)
            ids.append(vid)
        product_pages[slug]["slides"] = ids

    write("products.json", {"filters": filters, "lines": lines, "variants": variants, "pages": product_pages})
    return len(product_pages), len(variants)


# ---------- recipes ----------

MEAL_KEYS = {"Завтрак": "mealzavtrak-2", "Обед": "mealobed-2", "Ужин": "mealsupper", "Десерт": "desert", "Напитки": "mealbeverages"}


def recipe_card(page_file, a):
    img = a.find("img", "card-image")
    return {
        "slug": slug_of(site_path(page_file, a.attrs.get("href"))),
        "image": site_path(page_file, img.attrs.get("src")) if img else None,
        "badges": texts(a.find_all("div", "bottomItem")),
        "text": a.find("p", "text").clean_text() if a.find("p", "text") else "",
    }


def extract_recipes():
    f = "recipes/index.html"
    doc = load(f)
    main = doc.find("main")
    tabs = main.find("div", "tabs")
    filters = {
        "meal": [{"key": b.attrs["data-meal_time"], "label": b.clean_text()} for b in tabs.find_all("button") if "data-meal_time" in b.attrs],
        "time": [{"key": b.attrs["data-cooking_time"], "label": b.clean_text()} for b in tabs.find_all("button") if "data-cooking_time" in b.attrs],
    }
    featured = []
    for cls in ("recipes-block", "recipes-block2"):
        block = main.find("div", cls)
        if not block:
            continue
        featured.append({
            "title": block.find("h3").clean_text(),
            "items": [
                {
                    "slug": slug_of(site_path(f, s.find("a").attrs.get("href"))),
                    "style": rewrite_attr(f, "style", s.find("div", "recipes-item").attrs.get("style") or ""),
                    "badge": s.find("button").clean_text(),
                    "title": s.find("h5").clean_text(),
                    "subtitle": s.find("p").clean_text() if s.find("p") else "",
                }
                for s in block.find("div", "swiper-wrapper").kids("div", "swiper-slide")
            ],
        })

    cards = {}  # slug -> card seen anywhere (index, related blocks)
    for a in main.find_all("a", "post-card-wrapper"):
        c = recipe_card(f, a)
        cards.setdefault(c["slug"], c)

    time_labels = {t["label"]: t["key"] for t in filters["time"]}
    recipes = []
    for slug in pages("recipes"):
        pf = f"recipes/{slug}/index.html"
        d = load(pf)
        m = d.find("main")
        intro = m.find("div", "intro-block")
        badges = texts(intro.find("div", "bottom").kids("div", "bottomItem"))
        content = m.find("div", "content-wrapper").kids("div", "content")[0]
        related = []
        wrapper = m.find("div", "content-wrapper")
        title = None
        for child in wrapper.kids():
            if child.tag == "h3":
                title = child.clean_text()
            elif child.has_class("cards-wrapper"):
                group = [recipe_card(pf, a) for a in child.find_all("a", "post-card-wrapper")]
                for c in group:
                    cards.setdefault(c["slug"], c)
                related.append({"title": title, "slugs": [c["slug"] for c in group]})
        time, category = (badges + ["", ""])[:2]
        recipes.append({
            "slug": slug,
            "title": intro.find("h1").clean_text(),
            "subtitleHtml": to_html(intro.find("p", "subtitle"), pf) or None,
            "background": bg_image(pf, intro.attrs.get("style")),
            "introStyle": rewrite_attr(pf, "style", intro.attrs.get("style") or ""),
            "introClass": " ".join(intro.classes),
            "badges": badges,
            "meal": MEAL_KEYS.get(category),
            "time": next((k for label, k in time_labels.items() if label.replace(" ", "") in time.replace(" ", "")), None),
            "hasVideo": content.find("div", id="video-block") is not None,
            "bodyHtml": to_html(content, pf),
            "related": related,
            "meta": meta(d),
        })
    recipes.sort(key=newest_first, reverse=True)
    for r in recipes:
        c = cards.get(r["slug"], {})
        r["card"] = {"image": c.get("image") or r["background"], "text": c.get("text", "")}
    head = {"title": main.find("h1").clean_text(), "intro": main.find("p", id="slider").clean_text()}
    write("recipes.json", {"page": {**head, "meta": meta(doc)}, "filters": filters, "featured": featured, "recipes": recipes})
    return len(recipes)


# ---------- blog ----------

BARISTA = re.compile(r"бариста|barista|латте|капучино|кофе", re.I)


def extract_blog():
    f = "blog/index.html"
    doc = load(f)
    main = doc.find("main")
    listed = {}
    for a in main.find_all("a", "post-card-wrapper"):
        img = a.find("img", "card-image")
        listed[slug_of(site_path(f, a.attrs.get("href")))] = {
            "image": site_path(f, img.attrs.get("src")) if img else None,
            "excerpt": a.find("p", "text").clean_text() if a.find("p", "text") else "",
        }
    posts = []
    for slug in pages("blog"):
        pf = f"blog/{slug}/index.html"
        d = load(pf)
        m = d.find("main")
        intro = m.find("div", "intro-block")
        content = m.find("div", "content-wrapper").kids("div", "content")[0]
        first_text = next((p.clean_text() for p in content.find_all("p") if len(p.clean_text()) > 80), "")
        title = intro.find("h1").clean_text()
        known = listed.get(slug, {})
        posts.append({
            "slug": slug,
            "title": title,
            "date": intro.find("p", "date").clean_text() if intro.find("p", "date") else "",
            "background": bg_image(pf, intro.attrs.get("style")),
            "introStyle": rewrite_attr(pf, "style", intro.attrs.get("style") or ""),
            "image": known.get("image") or bg_image(pf, intro.attrs.get("style")),
            "excerpt": known.get("excerpt") or (first_text[:160].rsplit(" ", 1)[0] + "…" if first_text else ""),
            # The WordPress filter was server-side and the copy has no category marks: guessed by keywords.
            "category": "barista" if BARISTA.search(title + " " + content.clean_text()[:2000]) else "vmesto-moloka",
            "bodyHtml": to_html(content, pf),
            "meta": meta(d),
        })
    posts.sort(key=newest_first, reverse=True)
    tabs = main.find("div", "tabs")
    filters = [{"key": b.attrs.get("data-blog_mark"), "label": b.clean_text()} for b in tabs.find_all("button") if b.attrs.get("data-blog_mark")]
    head = {"title": main.find("h1").clean_text(), "intro": main.find("div", "blog").kids("p")[0].clean_text()}
    write("blog.json", {"page": {**head, "meta": meta(doc)}, "filters": filters, "posts": posts})
    return len(posts)


# ---------- static pages ----------

def extract_meta():
    out = {}
    for rel in ("index.html", "products/index.html", "about-company/index.html", "contacts/index.html",
                "where/index.html", "sustainability/index.html"):
        out["/" + rel[: -len("index.html")]] = meta(load(rel))
    write("pages.json", out)
    return len(out)


if __name__ == "__main__":
    print("products: %d pages, %d variants" % extract_products())
    print("recipes: %d" % extract_recipes())
    print("blog: %d" % extract_blog())
    print("page meta: %d" % extract_meta())
