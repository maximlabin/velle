import Breadcrumbs from "@/components/Breadcrumbs";
import ThemeStyles from "@/components/ThemeStyles";

// The archive has no WordPress 404 page; this one uses the blog page layout of the theme.
export const metadata = { title: "Страница не найдена | Velle", robots: { index: false } };

// The theme styles .more only inside particular sections; this is its product-page look.
const button = {
  background: "#FFFFFF", borderRadius: 12, padding: "16px 47px", fontFamily: "'PT Sans'", fontWeight: 700,
  fontSize: 22, lineHeight: "100%", textAlign: "center", color: "#008425",
} as const;

export default function NotFound() {
  return (
    <>
      <ThemeStyles />
      <main className="mainBlog">
        <Breadcrumbs trail={[{ title: "Страница не найдена" }]} back="/" />
        <div className="blog">
          <h1 className="mb-75">404</h1>
          <p>Такой страницы нет: возможно, она была удалена или в адресе опечатка.</p>
          <div className="d-flex align-items-center" style={{ gap: 20, flexWrap: "wrap", justifyContent: "center", marginTop: 40 }}>
            <a href="/"><button className="more" style={button}>На главную</button></a>
            <a href="/products/"><button className="more" style={button}>Продукты Velle</button></a>
          </div>
        </div>
      </main>
    </>
  );
}
