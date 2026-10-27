import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import PostCard from "@/components/PostCard";
import Share from "@/components/Share";
import ThemeStyles from "@/components/ThemeStyles";
import { cssToStyle, recipe, recipes, toMetadata } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => recipes.recipes.map((r) => ({ slug: r.slug }));

export async function generateMetadata({ params }: Props) {
  return toMetadata(recipe((await params).slug)?.meta);
}

export default async function RecipePage({ params }: Props) {
  const r = recipe((await params).slug);
  if (!r) notFound();

  return (
    <>
      <ThemeStyles section="recipes" />
      <main className="mainRecipesPost">
        <div className={r.introClass} style={cssToStyle(r.introStyle)}>
          <div className="overlay">
            <Breadcrumbs trail={[{ title: "Рецепты", href: "/recipes/" }, { title: r.title }]} back="/recipes/" />
            <div className="intro-text">
              <div className="bottom">
                {r.badges.map((b, i) => <div className="bottomItem" key={i}>{b}</div>)}
              </div>
              <h1>{r.title}</h1>
              <p className="subtitle" dangerouslySetInnerHTML={{ __html: r.subtitleHtml ?? "" }} />
              <Share />
            </div>
          </div>
        </div>
        <div className="content-wrapper">
          <div className="content" dangerouslySetInnerHTML={{ __html: r.bodyHtml }} />
          {r.related.map((group, i) => (
            <div key={i} style={{ display: "contents" }}>
              <h3 className={i === 0 ? "cards-title" : "cards-title2"}>{group.title}</h3>
              <div className="cards-wrapper">
                {group.slugs.map((slug) => {
                  const other = recipe(slug);
                  return other ? (
                    <PostCard key={slug} wrap={false} card={{
                      href: `/recipes/${slug}/`, image: other.card.image, badges: other.badges.slice(0, 2),
                      title: other.title, text: other.card.text, cta: "Смотреть рецепт",
                    }} />
                  ) : null;
                })}
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
