import Breadcrumbs from "@/components/Breadcrumbs";
import Catalog from "@/components/Catalog";
import ThemeStyles from "@/components/ThemeStyles";
import { pageMetadata, products } from "@/lib/content";

export const metadata = pageMetadata("/products/");

export default function ProductsPage() {
  return (
    <>
      <ThemeStyles section="products" />
      <main className="mainProducts">
        <img src="/wp-content/themes/velle/images/straw.png" alt="strawberry" className="straw" />
        <img src="/wp-content/themes/velle/images/butter.png" alt="butterscotch" className="butter" />
        <Breadcrumbs trail={[{ title: "Продукты Velle" }]} back="/" />
        <div className="productPage">
          <h1 className="title">Продукты Velle</h1>
          <Catalog lines={products.lines} filters={products.filters} />
        </div>
      </main>
    </>
  );
}
