"""Make WebP copies of the heavy PNG/JPEG files in public/ and point the sources at them.

The archive kept the theme's originals (up to 4000px, 4.5 MB each) and the static export serves
images as they are, so pages pulled ~25 MB of pictures and scrolling stuttered while they decoded.
Originals stay in place; only references are switched. Safe to re-run (also after `npm run extract`).

    python3 -I scripts/optimize_images.py
"""
import os
import re
import sys
from urllib.parse import quote

from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PUBLIC = os.path.join(ROOT, "public")
MIN_BYTES = 100_000  # icons and small pictures are fine as they are
MAX_SIDE = 2000  # nothing on the site is shown wider than ~1700 css px
QUALITY = 82
KEEP_IF_BELOW = 0.8  # use the WebP only if it is at least 20% smaller

# Product pictures in the header drop-down are shown ~120px wide on every page.
THUMBS = {
    "/wp-content/themes/velle/images/menu/menu1.png": 360,
    "/wp-content/themes/velle/images/menu/menu2.png": 360,
    "/wp-content/uploads/2025/04/vizualperedklubnika-2.png": 360,
    "/wp-content/uploads/2025/04/vizualpered-pechenoe-yabloko-2.png": 360,
    "/wp-content/uploads/2025/04/vizualperedkashi-kuraga-1.png": 360,
    "/wp-content/uploads/2025/04/pered_limon-1.png": 360,
}
THUMB_DIR = "/images/menu-thumbs"

# Where references live. Generated output (.next, out) and dependencies are left alone.
SOURCES = [("content", (".json",)), ("components", (".tsx", ".ts")), ("app", (".tsx", ".ts", ".css")),
           ("lib", (".ts",)), ("public", (".css",))]


def to_webp(src: str, dst: str, max_side: int) -> None:
    with Image.open(src) as im:
        im.load()
        if im.mode == "P":
            im = im.convert("RGBA" if "transparency" in im.info else "RGB")
        elif im.mode not in ("RGB", "RGBA"):
            im = im.convert("RGBA")
        if im.mode == "RGBA" and im.getchannel("A").getextrema()[0] == 255:
            im = im.convert("RGB")  # alpha channel present but unused
        if max(im.size) > max_side:
            im.thumbnail((max_side, max_side), Image.LANCZOS)
        im.save(dst, "WEBP", quality=QUALITY, method=6)


def convert_all() -> dict[str, list[str]]:
    """Returns basename -> public paths of every converted file, for the reference rewrite."""
    done: dict[str, list[str]] = {}
    seen: dict[str, int] = {}
    before = after = 0
    for root, _, files in os.walk(PUBLIC):
        for name in files:
            if not name.lower().endswith((".png", ".jpg", ".jpeg")):
                continue
            seen[name] = seen.get(name, 0) + 1
            src = os.path.join(root, name)
            size = os.path.getsize(src)
            if size < MIN_BYTES:
                continue
            dst = os.path.splitext(src)[0] + ".webp"
            if not os.path.exists(dst) or os.path.getmtime(dst) < os.path.getmtime(src):
                to_webp(src, dst, MAX_SIDE)
            if os.path.getsize(dst) > size * KEEP_IF_BELOW:
                os.remove(dst)
                continue
            before += size
            after += os.path.getsize(dst)
            done.setdefault(name, []).append(src)
    # A basename is rewritten only if every file of that name got a WebP (several dirs share names).
    safe = {n: p for n, p in done.items() if len(p) == seen[n]}
    print(f"webp: {sum(map(len, safe.values()))} files, {before / 2**20:.1f} MB -> {after / 2**20:.1f} MB")
    return safe


def make_thumbs() -> None:
    os.makedirs(PUBLIC + THUMB_DIR, exist_ok=True)
    for path, side in THUMBS.items():
        name = os.path.splitext(os.path.basename(path))[0] + ".webp"
        to_webp(PUBLIC + path, f"{PUBLIC}{THUMB_DIR}/{name}", side)
    print(f"thumbs: {len(THUMBS)} in public{THUMB_DIR}")


def rewrite(names) -> None:
    alts = []
    for name in names:
        for form in {name, quote(name)}:
            alts.append(re.escape(form[: -len(os.path.splitext(name)[1])]) + r"\." + re.escape(os.path.splitext(name)[1][1:]))
    if not alts:
        return
    # After "/" (a path), and not followed by more filename characters.
    pattern = re.compile(r"(?<=/)(" + "|".join(sorted(alts, key=len, reverse=True)) + r")(?![\w.-])")
    changed = 0
    for folder, exts in SOURCES:
        for root, _, files in os.walk(os.path.join(ROOT, folder)):
            if THUMB_DIR.strip("/") in root:
                continue
            for f in files:
                if not f.endswith(exts):
                    continue
                p = os.path.join(root, f)
                text = open(p, encoding="utf-8").read()
                new = pattern.sub(lambda m: os.path.splitext(m.group(1))[0] + ".webp", text)
                if new != text:
                    open(p, "w", encoding="utf-8").write(new)
                    changed += 1
    print(f"rewrote references in {changed} files")


if __name__ == "__main__":
    if not os.path.isdir(PUBLIC):
        sys.exit("run from the web/ project")
    make_thumbs()
    rewrite(convert_all())
