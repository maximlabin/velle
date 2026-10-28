import { Suspense } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import SearchResults, { type SearchEntry } from "@/components/SearchResults";
import ThemeStyles from "@/components/ThemeStyles";
import { blog, products, recipes } from "@/lib/content";

export const metadata = { title: "Поиск | Velle", robots: { index: false } };

const entries: SearchEntry[] = [
  ...products.lines.flatMap((l) => l.items.map((i) => ({ section: "Продукты", title: i.title, href: `/products/${i.slug}/`, text: l.title }))),
  ...recipes.recipes.map((r) => ({ section: "Рецепты", title: r.title, href: `/recipes/${r.slug}/`, text: r.badges.join(" ") })),
  ...blog.posts.map((p) => ({ section: "Блог", title: p.title, href: `/blog/${p.slug}/`, text: p.excerpt })),
];

export default function SearchPage() {
  return (
    <>
      <ThemeStyles />
      <main className="mainBlog">
        <Breadcrumbs trail={[{ title: "Поиск" }]} back="/" />
        <div className="blog">
          <h1 className="mb-75">Поиск</h1>
          <Suspense>
            <SearchResults entries={entries} />
          </Suspense>
        </div>
      </main>
    </>
  );
}
