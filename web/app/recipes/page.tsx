import Breadcrumbs from "@/components/Breadcrumbs";
import FilteredList, { type ListItem } from "@/components/FilteredList";
import ThemeStyles from "@/components/ThemeStyles";
import { cssToStyle, recipes, toMetadata } from "@/lib/content";

export const metadata = toMetadata(recipes.page.meta);

const items: ListItem[] = recipes.recipes.map((r) => ({
  href: `/recipes/${r.slug}/`,
  image: r.card.image,
  badges: r.badges.slice(0, 2),
  title: r.title,
  text: r.card.text,
  cta: "Смотреть рецепт",
  tags: { meal: r.meal, time: r.time },
}));

export default function RecipesPage() {
  return (
    <>
      <ThemeStyles section="recipes" />
      <main className="allRecipesPage">
        <Breadcrumbs trail={[{ title: "Рецепты" }]} back="/" />
        <div className="all-recipes">
          <h1 className="mb-75">{recipes.page.title}</h1>
          <p id="slider">{recipes.page.intro}</p>
          <div className="recipes-blocks">
            <div className="recipes-blocks__container">
              {recipes.featured.map((block, i) => {
                const n = i === 0 ? "" : String(i + 1);
                return (
                  <div key={block.title} className={`swiper recipes-block${n}`}>
                    <h3 className={`recipes-block__title${n ? ` recipes-block__title${n}` : ""}`}>{block.title}</h3>
                    <div className="swiper-wrapper">
                      {block.items.map((it) => (
                        <div className="swiper-slide" key={it.slug}>
                          <a className="" href={`/recipes/${it.slug}/`}>
                            <div className="recipes-item" style={cssToStyle(it.style)}>
                              <div className="recipes-item__button">
                                <button className="recipes-item__btn">{it.badge}</button>
                              </div>
                              <h5 className="recipes-item__title">{it.title}</h5>
                              <p className="recipes-item__subtitle">{it.subtitle}</p>
                            </div>
                          </a>
                        </div>
                      ))}
                    </div>
                    <div className={`slider__pagination${n}`} />
                    <div className={`recipes-button-prev${n}`} />
                    <div className={`recipes-button-next${n}`} />
                  </div>
                );
              })}
            </div>
          </div>
          <FilteredList
            items={items}
            separator
            groups={[
              { param: "meal", dataAttr: "data-meal_time", options: recipes.filters.meal },
              { param: "time", dataAttr: "data-cooking_time", options: recipes.filters.time },
            ]}
          />
        </div>
      </main>
    </>
  );
}
