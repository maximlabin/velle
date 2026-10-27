"use client";

// The catalog with its filters, ported from main.js: a line tab shows one block, a flavour tab shows
// matching products in every block, clicking the active tab clears it, and /products/#barista opens a tab.
import { useEffect, useRef, useState } from "react";
import Swiper from "swiper";
import { Pagination } from "swiper/modules";
import type { CatalogItem, Filter, Line } from "@/lib/content";

type Active = { kind: "lineage" | "flavour"; key: string } | null;

const hidden = (hide: boolean) => (hide ? { display: "none" } : undefined);
const cls = (...parts: (string | null | false | undefined)[]) => parts.filter(Boolean).join(" ");

function DesktopItem({ item, hide }: { item: CatalogItem; hide: boolean }) {
  const href = `/products/${item.slug}/`;
  return (
    <div className={cls("contentItem", item.flavour)} style={hidden(hide)}>
      {item.tag && <img loading="lazy" src={item.tag} alt="tag" className="tag" />}
      <a href={href} />
      <img loading="lazy" src={item.image ?? undefined} className="productPic" alt="product" />
      <div className="itemTitle" style={{ textAlign: "center" }}>{item.title}</div>
      <div className="volume">{item.volume}</div>
      <div>
        <a className="product-card-more" href={href}>Узнать больше</a>
      </div>
    </div>
  );
}

function MobileSlide({ item, hide }: { item: CatalogItem; hide: boolean }) {
  return (
    <div className={cls("swiper-slide", item.flavour)} style={hidden(hide)}>
      <div className="slideContent">
        {item.tag && <img src={item.tag} alt="tag" className="tag" />}
        <a href={`/products/${item.slug}/`} className="mobile-product">
          <img loading="lazy" src={item.image ?? undefined} alt="product" />
          <div className="name">{item.title}</div>
          <div className="volume">{item.volume}</div>
        </a>
      </div>
    </div>
  );
}

export default function Catalog({ lines, filters }: { lines: Line[]; filters: { lineage: Filter[]; flavour: Filter[] } }) {
  const [active, setActive] = useState<Active>(null);
  const [mobLine, setMobLine] = useState("all-items");
  const [mobFlavour, setMobFlavour] = useState("all-flavours");
  const sliders = useRef<HTMLDivElement>(null);
  const swipers = useRef<Swiper[]>([]);

  const toggle = (kind: "lineage" | "flavour", key: string) =>
    setActive((a) => (a && a.kind === kind && a.key === key ? null : { kind, key }));

  useEffect(() => {
    const key = window.location.hash.slice(1);
    if (filters.lineage.some((f) => f.key === key)) toggle("lineage", key);
    else if (filters.flavour.some((f) => f.key === key)) toggle("flavour", key);
  }, [filters]);

  useEffect(() => {
    swipers.current = Array.from(sliders.current?.querySelectorAll<HTMLElement>(".slider") ?? []).map(
      (el) =>
        new Swiper(el, {
          modules: [Pagination],
          centeredSlides: true,
          spaceBetween: 19,
          pagination: { el: el.querySelector<HTMLElement>(".swiper-pagination"), clickable: true },
        }),
    );
    return () => swipers.current.forEach((s) => s.destroy(true, false));
  }, []);

  // Hidden slides change the layout; main.js never told Swiper, which left gaps.
  useEffect(() => swipers.current.forEach((s) => s.update()), [mobLine, mobFlavour]);

  const isActive = (kind: string, key: string) => active?.kind === kind && active.key === key;
  const flavour = active?.kind === "flavour" ? active.key : null;
  const noMargin = mobFlavour === "multigrain" || mobFlavour === "coconut";

  return (
    <>
      <div className="tabs">
        <button className={cls("item all-items", !active && "active")} onClick={() => setActive(null)}>
          <a href="#">Все</a>
        </button>
        {(["lineage", "flavour"] as const).map((kind) =>
          filters[kind].map((f) => (
            <button
              key={f.key}
              className={cls("item", kind, f.key, isActive(kind, f.key) && "active")}
              data-attribute={f.key}
              onClick={() => toggle(kind, f.key)}
            >
              <a href={`#${f.key}`}>{f.label}</a>
            </button>
          )),
        )}
      </div>
      <div className="mTabs">
        <select className="select" name="line" id="line" value={mobLine}
          onChange={(e) => { setMobLine(e.target.value); setMobFlavour("all-flavours"); }}>
          <option className="all-items" value="all-items">Выберите линейку</option>
          {filters.lineage.map((f) => <option key={f.key} value={f.key}>{f.label}</option>)}
        </select>
        <select className="select" name="flavour" id="flavour" value={mobFlavour}
          onChange={(e) => { setMobFlavour(e.target.value); setMobLine("all-items"); }}>
          <option className="all-flavours" value="all-flavours">Выберите основу</option>
          {filters.flavour.map((f) => <option key={f.key} value={f.key}>{f.label}</option>)}
        </select>
      </div>
      <div className="content" ref={sliders}>
        {lines.map((line) => {
          const blockHidden =
            (active?.kind === "lineage" && active.key !== line.slug) ||
            (flavour !== null && !line.items.some((i) => i.flavour === flavour));
          return (
            <div key={line.slug} className={cls("contentBlock", line.slug)} style={hidden(blockHidden)}>
              <div className="contentBlock__title">{line.title}</div>
              <div className="contentItems">
                {line.items.map((item) => (
                  <DesktopItem key={item.slug} item={item} hide={flavour !== null && item.flavour !== flavour} />
                ))}
              </div>
            </div>
          );
        })}
        {lines.map((line) => {
          const byFlavour = mobFlavour !== "all-flavours";
          const sliderHidden = mobLine !== "all-items" && mobLine !== line.slug;
          return (
            <div key={line.slug} className={cls("slider", line.slug)}
              style={sliderHidden ? { display: "none" } : byFlavour ? { marginBottom: noMargin ? 0 : 80 } : undefined}>
              <div className="sliderTitle" style={hidden(byFlavour)}>{line.title}</div>
              <div className="swiper-wrapper">
                {line.items.map((item) => (
                  <MobileSlide key={item.slug} item={item} hide={byFlavour && item.flavour !== mobFlavour} />
                ))}
              </div>
              <div className={`swiper-pagination ${line.slug}_pagination`} />
            </div>
          );
        })}
      </div>
    </>
  );
}
