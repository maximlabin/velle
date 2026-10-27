"use client";

// /search/?search=… — WordPress searched on the server; the copy has no such page, so this one
// looks through product, recipe and blog titles in the browser.
import { useSearchParams } from "next/navigation";

export type SearchEntry = { section: string; title: string; href: string; text: string };

const norm = (s: string) => s.toLowerCase().replace(/ё/g, "е");

export default function SearchResults({ entries }: { entries: SearchEntry[] }) {
  const query = (useSearchParams().get("search") ?? "").trim();
  const words = norm(query).split(/\s+/).filter(Boolean);
  const found = words.length ? entries.filter((e) => words.every((w) => norm(`${e.title} ${e.text}`).includes(w))) : [];

  return (
    <div className="results-mobile" style={{ display: "block" }}>
      <p>{query ? `Результаты поиска: «${query}»` : "Введите запрос в поиске"}</p>
      {query && !found.length && <p>Ничего не найдено.</p>}
      <ul className="numeric">
        {found.map((e) => (
          <li key={e.href}><a href={e.href}>{e.section}: “{e.title}”</a></li>
        ))}
      </ul>
    </div>
  );
}
