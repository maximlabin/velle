// Typed access to content/*.json, produced from the WordPress copy by scripts/extract.py.
import type { Metadata } from "next";
import blogJson from "@/content/blog.json";
import pagesJson from "@/content/pages.json";
import productsJson from "@/content/products.json";
import recipesJson from "@/content/recipes.json";

export type PageMeta = {
  title: string | null; description: string | null; ogImage: string | null; published?: string | null; postId?: number | null;
};

// "background: url('/x.png') no-repeat center center/cover" -> React style object
export function cssToStyle(css: string): React.CSSProperties {
  return Object.fromEntries(
    css.split(";").map((d) => d.split(/:(.+)/)).filter(([k, v]) => k?.trim() && v)
      .map(([k, v]) => [k.trim().replace(/-([a-z])/g, (_, c: string) => c.toUpperCase()), v.trim()]),
  );
}
export type Filter = { key: string; label: string };

export type CatalogItem = { slug: string; flavour: string | null; image: string | null; tag: string | null; title: string; volume: string; placeholder?: boolean };
export type Line = { slug: string; title: string; items: CatalogItem[] };
export type Variant = {
  anchor: string | null; title: string; subtitle: string; textHtml: string; tagsHtml: string | null;
  where: string | null; image: string | null; compound: { label: string; value: string }[];
};
export type ProductRecipe = { slug: string | null; title: string; image: string | null; badges: string[] };
export type ProductPage = {
  crumb: string; recipesTitle: string | null; recipesSubtitleHtml: string | null; otherTitle: string | null;
  otherSubtitleHtml: string | null; slides: string[]; recipes: ProductRecipe[]; others: string[]; meta: PageMeta;
};
type ProductsData = { filters: { lineage: Filter[]; flavour: Filter[] }; lines: Line[]; variants: Record<string, Variant>; pages: Record<string, ProductPage> };

export type RecipeCard = { image: string | null; text: string };
export type Recipe = {
  slug: string; title: string; subtitleHtml: string | null; background: string | null; introStyle: string; introClass: string;
  badges: string[]; meal: string | null; time: string | null; hasVideo: boolean; bodyHtml: string;
  related: { title: string | null; slugs: string[] }[]; meta: PageMeta; card: RecipeCard;
};
export type FeaturedBlock = { title: string; items: { slug: string; style: string; badge: string; title: string; subtitle: string }[] };
type RecipesData = { page: { title: string; intro: string; meta: PageMeta }; filters: { meal: Filter[]; time: Filter[] }; featured: FeaturedBlock[]; recipes: Recipe[] };

export type Post = {
  slug: string; title: string; date: string; background: string | null; introStyle: string; image: string | null; excerpt: string;
  category: string; bodyHtml: string; meta: PageMeta;
};
type BlogData = { page: { title: string; intro: string; meta: PageMeta }; filters: Filter[]; posts: Post[] };

export const products = productsJson as ProductsData;
export const recipes = recipesJson as RecipesData;
export const blog = blogJson as BlogData;
const pages = pagesJson as Record<string, PageMeta>;

export const catalogItem = (slug: string) =>
  products.lines.flatMap((l) => l.items).find((i) => i.slug === slug);
export const recipe = (slug: string) => recipes.recipes.find((r) => r.slug === slug);
export const post = (slug: string) => blog.posts.find((p) => p.slug === slug);

export function toMetadata(meta: PageMeta | undefined): Metadata {
  if (!meta) return {};
  return {
    title: meta.title ?? undefined,
    description: meta.description ?? undefined,
    openGraph: {
      title: meta.title ?? undefined,
      description: meta.description ?? undefined,
      images: meta.ogImage ? [meta.ogImage] : undefined,
      locale: "ru_RU",
      siteName: "Velle",
    },
  };
}

export const pageMetadata = (path: string): Metadata => toMetadata(pages[path]);
