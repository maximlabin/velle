"use client";

// Recipe and blog lists. WordPress filtered and paged them on the server (admin-ajax.php and
// ?meal=&time=&blog-mark= reloads); here the same query parameters filter the data in the browser.
// The static HTML holds the unfiltered first page (for search engines and before scripts load);
// the query is read after hydration, since useSearchParams would leave the export empty.
import { useEffect, useState } from "react";
import Pagination from "@/components/Pagination";
import PostCard, { type CardData } from "@/components/PostCard";
import type { Filter } from "@/lib/content";

export type ListItem = CardData & { tags: Record<string, string | null> };
export type FilterGroup = { param: string; dataAttr: string; options: Filter[] };

const PER_PAGE = 9;
const cls = (...p: (string | false | null | undefined)[]) => p.filter(Boolean).join(" ");

export default function FilteredList({ items, groups, separator, loadMore }: {
  items: ListItem[]; groups: FilterGroup[]; separator?: boolean; loadMore?: boolean;
}) {
  const [params, setParams] = useState(() => new URLSearchParams());
  useEffect(() => {
    const read = () => setParams(new URLSearchParams(window.location.search));
    read();
    window.addEventListener("popstate", read);
    return () => window.removeEventListener("popstate", read);
  }, []);
  const chosen = Object.fromEntries(groups.map((g) => [g.param, params.get(g.param)]));
  const page = Math.max(1, parseInt(params.get("page") ?? "1", 10) || 1);
  const [extra, setExtra] = useState(0); // pages appended by "Показать ещё"

  const href = (changes: Record<string, string | null>) => {
    const next = new URLSearchParams();
    for (const [k, v] of Object.entries({ ...chosen, ...changes })) if (v) next.set(k, v);
    const q = next.toString();
    return q ? `?${q}` : "?";
  };
  const filtered = items.filter((it) => groups.every((g) => !chosen[g.param] || it.tags[g.param] === chosen[g.param]));
  const pages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const shown = filtered.slice((page - 1) * PER_PAGE, (page + extra) * PER_PAGE);
  const none = groups.every((g) => !chosen[g.param]);

  return (
    <>
      <div className="tabs">
        <button className={cls("item all-items", none && "active")} onClick={() => (window.location.search = "")}>
          <a href="?">Все</a>
        </button>
        {groups.map((g, gi) => [
          separator && gi > 0 && (
            <span className="middle" key={`sep${gi}`}>
              <svg width="7" height="7" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0.5" y="0.5" width="6" height="6" rx="3" fill="#898989" />
                <rect x="0.5" y="0.5" width="6" height="6" rx="3" stroke="#898989" />
              </svg>
            </span>
          ),
          ...g.options.map((o) => (
            <button key={o.key} className={cls("item", separator && "lineage", o.key, chosen[g.param] === o.key && "active")}
              {...{ [g.dataAttr]: o.key }}>
              <a href={href({ [g.param]: o.key, page: null })}>{o.label}</a>
            </button>
          )),
        ])}
      </div>
      <div className="content" data-page_num={page}>
        {shown.map((it) => <PostCard key={it.href} card={it} />)}
      </div>
      {loadMore && page + extra < pages && (
        <div id="load-more-btn" className="load-button">
          <button className="load-more blog_new" onClick={() => setExtra((e) => e + 1)}>Загрузить</button>
        </div>
      )}
      <Pagination page={page} pages={pages} href={(p) => href({ page: p > 1 ? String(p) : null })} />
    </>
  );
}
