"use client";

import { useEffect, useState, type CSSProperties } from "react";

// Small copies made by scripts/optimize_images.py: the originals are up to 4.5 MB and loaded on every page.
const THUMBS = "/images/menu-thumbs";

// The products drop-down is a hand-picked list in the theme, not the whole catalog.
const PRODUCT_MENU = [
  { line: "vmestomoloka", title: "Velle Растительное молоко", image: `${THUMBS}/menu1.webp`, links: [
    ["vmesto-moloka-bananovoe", "Банановое молоко"], ["kokosovoe", "Кокосовое молоко"],
    ["ovsyanoe", "Овсяное молоко"], ["mindalnoe", "Миндальное молоко"]] },
  { line: "barista", title: "Velle Barista", image: `${THUMBS}/menu2.webp`, links: [
    ["barista-funduchnoe", "Фундучное"], ["barista-bananovoe", "Банановое"], ["barista-ovsyanoe", "Овсяное"],
    ["barista-mindalnoe", "Миндальное"], ["barista-kokosovoe", "Кокосовое"]] },
  { line: "pityevoyyogurt", title: "Velle Вместо питьевого йогурта", image: `${THUMBS}/vizualperedklubnika-2.webp`, width: 70, links: [
    ["vmesto-pitevogo-jogurta-kokosovyj-zemlyanika-klubnika", "Кокосовый Клубника-Земляника"],
    ["vmesto-pitevogo-jogurta-malina", "Овсяный Малина"], ["vmesto-pitevogo-jogurta-vishnya", "Овсяный Вишня"],
    ["vmesto-pitevogo-jogurta-oblepiha", "Овсяный Облепиха"], ["vmesto-pitevogo-jogurta-chernika", "Овсяный Черника"]] },
  { line: "lozhkoviyyogurt", title: "Velle Вместо ложкового йогурта", image: `${THUMBS}/vizualpered-pechenoe-yabloko-2.webp`, width: 120, links: [
    ["vmesto-lozhkovogo-jogurta-pechenoe-yabloko", "Овсяный Печеное Яблоко"],
    ["vmesto-lozhkovogo-jogurta-klubnika-banan", "Овсяный Клубника-Банан"],
    ["vmesto-lozhkovogo-jogurta-malina-ezhevika", "Овсяный Малина-Ежевика"]] },
  { line: "kasha", title: "Velle Каша", image: `${THUMBS}/vizualperedkashi-kuraga-1.webp`, width: 100, links: [
    ["kasha-chernosliv", "Мультизлак Чернослив"], ["kasha-kuraga", "Мультизлак Курага"]] },
  { line: "dessert", title: "Velle Десерт", image: `${THUMBS}/pered_limon-1.webp`, width: 120, links: [
    ["desert-yablochnaya-sharlotka", "Кокосовый \"Яблочная шарлотка\""], ["desert-limonnii-tart", "Кокосовый \"Лимонный тарт\""],
    ["desert-klubnichnii-chizkeik", "Кокосовый \"Клубничный чизкейк\""], ["desert-solenaya-karamel", "Соленая Карамель"]] },
] as const;

const Chevron = ({ className }: { className?: string }) => (
  <svg className={className} width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 1.5L7 6.5L2 1.5" stroke="#008425" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// main.js toggled these with inline display styles; null means "leave it to the CSS", as before the first click.
const shown = (open: boolean | null, display = "flex"): CSSProperties | undefined =>
  open === null ? undefined : { display: open ? display : "none" };

function goSearch(value: string) {
  if (value) window.location.href = "/search/?search=" + encodeURIComponent(value);
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState<"products" | "about" | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState<boolean | null>(null);
  const [mobProducts, setMobProducts] = useState<boolean | null>(null);
  const [mobAbout, setMobAbout] = useState<boolean | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openProducts = () => setMenu("products");
  const openAbout = () => setMenu("about");
  const closeMenus = () => setMenu(null);
  // First click on a mobile sub-menu hides it, as in main.js (its counters started at "open").
  const flip = (v: boolean | null) => (v === null ? false : !v);

  return (
    <header className={scrolled ? "scroll-header" : undefined} onMouseLeave={closeMenus}>
      <div style={{ display: "none" }} itemScope itemType="http://schema.org/Organization">
        <p itemProp="name">Velle</p>
        <link itemProp="url" href="/" />
        <div itemProp="description">Velle - растительная альтернатива молочным продуктам</div>
        <div itemProp="address" itemScope itemType="http://schema.org/PostalAddress">
          <span itemProp="streetAddress">ул. Льва Толстого, 23с4</span>
          <span itemProp="addressLocality">Москва</span>
          <span itemProp="telephone">8 (800) 200-19-00</span>
        </div>
      </div>
      <div className="headerWrapper" style={menu ? { background: "#FFFFFF" } : undefined}>
        <a href="/">
          <img src="/wp-content/themes/velle/images/logo_header.svg" alt="logo" className="logo" />
        </a>
        <div className="headerMenu">
          <div className={`item itemPassive${menu === "products" ? " itemActive" : ""}`}>
            <a href="/products/" className="popupMenu mainItem" onMouseEnter={openProducts}>
              Продукты
              <div className="line" />
            </a>
            <span onMouseEnter={openProducts}><Chevron className="popupMenu" /></span>
            <div className="headerPopup">
              <div className="content">
                {PRODUCT_MENU.map((group) => (
                  <div className="item" key={group.line}>
                    <div className="itemPic">
                      <a href="">
                        <img src={group.image} alt="menu" width={"width" in group ? group.width : undefined} />
                      </a>
                    </div>
                    <div className="itemTitle">
                      <a href={`/products/#${group.line}`}>{group.title}</a>
                    </div>
                    {group.links.map(([slug, title]) => (
                      <a key={slug} href={`/products/${slug}/`} className="headerlink">{title}</a>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className={`item itemLink aboutPassive${menu === "about" ? " aboutActive" : ""}`}>
            <a href="#" className="mainItem aboutMenu" onMouseEnter={openAbout} onClick={(e) => e.preventDefault()}>
              О нас
              <div className="line" />
            </a>
            <span onMouseEnter={openAbout}><Chevron className="aboutMenu" /></span>
            <div className={`aboutPopup${menu === "about" ? "" : " closedAbout"}`}>
              <a href="/about-company/" className="itemAbout itemLink">О компании</a>
              <a href="/sustainability/" className="itemAbout itemLink">Устойчивое развитие</a>
            </div>
          </div>
          {[["/recipes/", "Рецепты", " itemLink"], ["/blog/", "Блог", ""], ["/where/", "Где купить", ""], ["/contacts/", "Контакты", ""]].map(
            ([href, title, extra]) => (
              <div key={href} className={`item${extra} itemEmpty`} onMouseEnter={closeMenus}>
                <a href={href} className="mainItem">
                  {title}
                  <div className="line" />
                </a>
              </div>
            ),
          )}
        </div>
        <button className="search" onClick={() => setSearchOpen((v) => !v)}>
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="8.12965" height="1.90165" rx="0.950827" transform="matrix(0.709482 -0.704723 0.709482 0.704723 0 13.6602)" fill="#3D3D3D" />
            <circle cx="9.44287" cy="5.5" r="4.5" stroke="#3D3D3D" strokeWidth="2" />
          </svg>
        </button>
        <div className={`searchPopup${searchOpen ? " active" : ""}`}>
          <div className="content">
            <div className="search-wrapper">
              <input
                type="search"
                className="search-input header-search-inpt"
                placeholder="Поиск..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && goSearch(query)}
              />
              <button className="search-button header-search-btn" onClick={() => goSearch(query)}>
                <img src="/wp-content/themes/velle/images/white-arr-right.svg" alt="" />
              </button>
            </div>
          </div>
        </div>
        <button className="burger" style={shown(mobileOpen === null ? null : !mobileOpen, "block")} onClick={() => setMobileOpen(true)}>
          <svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="18" height="3" rx="1.5" fill="#3D3D3D" />
            <rect y="6" width="18" height="3" rx="1.5" fill="#3D3D3D" />
            <rect y="12" width="18" height="3" rx="1.5" fill="#3D3D3D" />
          </svg>
        </button>
        <button className="closeBurger" style={shown(mobileOpen, "block")} onClick={() => setMobileOpen(false)}>
          <svg width="17" height="15" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="2.06979" y="0.565796" width="18.5" height="3" rx="1.5" transform="rotate(40 2.06979 0.565796)" fill="#3D3D3D" />
            <rect y="12.213" width="18.5" height="3" rx="1.5" transform="rotate(-40 0 12.213)" fill="#3D3D3D" />
          </svg>
        </button>
      </div>
      <div className="mWrapper" style={shown(mobileOpen)}>
        <div className={`item mobMenuProducts${mobProducts ? " openedItem" : ""}`} onClick={() => setMobProducts(flip)}>
          <a href="/products/">Продукты</a>
          <Chevron />
        </div>
        <div className="subItems" style={shown(mobProducts)}>
          {PRODUCT_MENU.map((group) => (
            <a key={group.line} href={`/products/#${group.line}`}>{group.title}</a>
          ))}
        </div>
        <div className={`item mobAboutProducts${mobAbout ? " openedItem" : ""}`} onClick={() => setMobAbout(flip)}>
          <a href="#" className="itemLink" onClick={(e) => e.preventDefault()}>О нас</a>
          <Chevron />
        </div>
        <div className="subAbout" style={shown(mobAbout)}>
          <a href="/about-company/" className="itemLink">О компании</a>
          <a href="/sustainability/" className="itemLink">Устойчивое развитие</a>
        </div>
        <div className="item"><a href="/recipes/" className="itemLink">Рецепты</a></div>
        <div className="item"><a href="/blog/">Блог</a></div>
        <div className="item"><a href="/where/">Где купить</a></div>
        <div className="item"><a href="/contacts/">Контакты</a></div>
      </div>
    </header>
  );
}
