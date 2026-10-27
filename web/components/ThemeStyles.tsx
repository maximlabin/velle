// Theme CSS from the WordPress copy, linked in the original order: a page's own stylesheet
// comes before style.css, so style.css still wins where they overlap.
const STYLE = "/wp-content/themes/velle/style";
const BEFORE = { products: ["buy-btns.css"], recipes: ["video-recipes.css"], about: ["about.css"], sustainability: ["sustainability.css"] };
const COMMON = ["free-popup.css", "style.css", "stylesheet.css", "review-slider.css", "telegram-popup.css", "footer-popup.css"];

export type ThemeSection = keyof typeof BEFORE;

export default function ThemeStyles({ section }: { section?: ThemeSection }) {
  const files = [...(section ? BEFORE[section] : []), ...COMMON];
  return (
    <>
      {files.map((file) => (
        <link key={file} rel="stylesheet" href={`${STYLE}/${file}`} precedence="theme" />
      ))}
    </>
  );
}
