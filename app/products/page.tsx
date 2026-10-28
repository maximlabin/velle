import Breadcrumbs from "@/components/Breadcrumbs";
import Catalog from "@/components/Catalog";
import ThemeStyles from "@/components/ThemeStyles";
import { pageMetadata, products } from "@/lib/content";
import { PRODUCT_PLACEHOLDER, productImage } from "@/lib/files";

export const metadata = pageMetadata("/products/");

const lines = products.lines.map((line) => ({
  ...line,
  items: line.items.map((item) => {
    const image = productImage(item.image);
    return { ...item, image, placeholder: image === PRODUCT_PLACEHOLDER };
  }),
}));

export default function ProductsPage() {
  return (
    <>
      <ThemeStyles section="products" />
      <main className="mainProducts">
        <img src="/wp-content/themes/velle/images/straw.png" alt="strawberry" className="straw" />
        <img src="/wp-content/themes/velle/images/butter.webp" alt="butterscotch" className="butter" />
        <Breadcrumbs trail={[{ title: "Продукты Velle" }]} back="/" />
        <div className="productPage">
          <h1 className="title">Продукты Velle</h1>
          <Catalog lines={lines} filters={products.filters} />
        </div>
      </main>
    </>
  );
}
