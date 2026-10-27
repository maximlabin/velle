import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import ThemeStyles from "@/components/ThemeStyles";
import { catalogItem, products, toMetadata, type Variant } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => Object.keys(products.pages).map((slug) => ({ slug }));

export async function generateMetadata({ params }: Props) {
  return toMetadata(products.pages[(await params).slug]?.meta);
}

const Arrow = ({ d }: { d: string }) => (
  <svg width="14" height="23" viewBox="0 0 14 23" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d={d} stroke="#008425" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SmallArrow = ({ d }: { d: string }) => (
  <svg width="9" height="13" viewBox="0 0 9 13" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d={d} stroke="#008425" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const GoButton = () => (
  <svg width="52" height="26" viewBox="0 0 52 26" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#filter0_i_186_4332)">
      <g clipPath="url(#clip0_186_4332)">
        <rect width="52" height="26" rx="13" fill="#F4B223" />
        <path d="M24 8.5L28 13L24 17.5" stroke="#008425" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </g>
    <defs>
      <filter id="filter0_i_186_4332" x="0" y="0" width="52" height="26" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset />
        <feGaussianBlur stdDeviation="5" />
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
        <feBlend mode="normal" in2="shape" result="effect1_innerShadow_186_4332" />
      </filter>
      <clipPath id="clip0_186_4332"><rect width="52" height="26" rx="13" fill="white" /></clipPath>
    </defs>
  </svg>
);

const Compound = ({ v }: { v: Variant }) =>
  v.compound.map((c, i) => [<p key={`p${i}`}>{c.label}</p>, <span key={`s${i}`}>{c.value}</span>]);

function Slide({ v }: { v: Variant }) {
  return (
    <div className="swiper-slide" id={v.anchor ?? ""}>
      <div className="slideContent">
        <div className="description">
          <div className="title">{v.title}</div>
          <div className="subtitle">{v.subtitle}</div>
          <div className="text" dangerouslySetInnerHTML={{ __html: v.textHtml }} />
          <div className="tags" dangerouslySetInnerHTML={{ __html: v.tagsHtml ?? "" }} />
          <div className="buttons">
            <button className="more comp itemLink">Состав</button>
            <a className="where-btn" href={v.where ?? "/where/"}>
              <button className="more">Где купить</button>
            </a>
            <div className="buy-buttons" />
          </div>
        </div>
        <div className="pic">
          <img src={v.image ?? undefined} alt="product" />
        </div>
        <div className="compound">
          <Compound v={v} />
        </div>
      </div>
    </div>
  );
}

export default async function ProductPage({ params }: Props) {
  const page = products.pages[(await params).slug];
  if (!page) notFound();
  const slides = page.slides.map((id) => products.variants[id]);

  return (
    <>
      <ThemeStyles section="products" />
      <main className="mainCards">
        <Breadcrumbs trail={[{ title: "Продукты", href: "/products/" }, { title: page.crumb }]} back="/products/" />
        <div className="cardPage">
          <div className="compound compound-mobile mobile-compound">
            <div className="comp-close">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="2.12132" y1="2" x2="10" y2="9.87868" stroke="#008425" strokeWidth="3" strokeLinecap="round" />
                <line x1="10" y1="2.12132" x2="2.12132" y2="10" stroke="#008425" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </div>
            <Compound v={slides[0]} />
          </div>
          <div className="banner">
            <div className="cardSlider swiper">
              <div className="swiper-wrapper">
                {slides.map((v, i) => <Slide key={i} v={v} />)}
              </div>
              <div className="swiper-pagination main-pagination" />
              <div className="prev-arrow"><Arrow d="M11.55 20.6499L2.40002 11.4999L11.55 2.34991" /></div>
              <div className="next-arrow"><Arrow d="M2.44998 2.3501L11.6 11.5001L2.44997 20.6501" /></div>
            </div>
          </div>
          {page.recipesTitle && (
            <div className="recipes">
              <div className="title">{page.recipesTitle}</div>
              <div className="subtitle" dangerouslySetInnerHTML={{ __html: page.recipesSubtitleHtml ?? "" }} />
              <button className="more" data-href="/recipes/">Больше рецептов</button>
              <div className="recipesSlider">
                <div className="swiper-wrapper">
                  {page.recipes.map((r, i) => (
                    <div className="swiper-slide" key={i}>
                      <div className="recipeCard">
                        <div className="item">
                          <div className="mask">
                            <div className="maskTitle">{r.title}</div>
                            <button data-href={r.slug ? `/recipes/${r.slug}/` : undefined} className="itemLink">
                              <GoButton />
                            </button>
                          </div>
                          <img src={r.image ?? undefined} alt="item" />
                          <div className="bottom">
                            {r.badges.map((b, j) => <div className="bottomItem" key={j}>{b}</div>)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="navigation">
                  <div className="prev-recipe recipe-arrow"><SmallArrow d="M6.625 11L2.125 6.5L6.625 2" /></div>
                  <div className="next-recipe recipe-arrow"><SmallArrow d="M2.375 2L6.875 6.5L2.375 11" /></div>
                </div>
              </div>
            </div>
          )}
          {page.otherTitle && (
            <div className="other">
              <div className="title">{page.otherTitle}</div>
              <div className="subtitle" dangerouslySetInnerHTML={{ __html: page.otherSubtitleHtml ?? "" }} />
              <div className="otherSlider">
                <div className="swiper-wrapper">
                  {page.others.map((slug) => {
                    const item = catalogItem(slug);
                    if (!item) return null;
                    return (
                      <div className="swiper-slide" key={slug}>
                        <div className="contentItem">
                          {item.tag && <img loading="lazy" src={item.tag} alt="tag" className="tag" />}
                          <a className="otherLink" href={`/products/${slug}/`} />
                          <img src={item.image ?? undefined} className="productPic" alt="product" />
                          <div className="itemTitle" style={{ textAlign: "center" }}>{item.title}</div>
                          <div className="volume">{item.volume}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="swiper-pagination other-pagination" />
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
