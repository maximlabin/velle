import Breadcrumbs from "@/components/Breadcrumbs";
import FilteredList, { type ListItem } from "@/components/FilteredList";
import ThemeStyles from "@/components/ThemeStyles";
import { blog, toMetadata } from "@/lib/content";

export const metadata = toMetadata(blog.page.meta);

const items: ListItem[] = blog.posts.map((p) => ({
  href: `/blog/${p.slug}/`,
  image: p.image,
  date: p.date,
  title: p.title,
  text: p.excerpt,
  cta: "Читать статью",
  tags: { "blog-mark": p.category },
}));

export default function BlogPage() {
  return (
    <>
      <ThemeStyles />
      <main className="mainBlog">
        <Breadcrumbs trail={[{ title: "Блог" }]} back="/" />
        <div className="blog">
          <h1 className="mb-75">{blog.page.title}</h1>
          <p>{blog.page.intro}</p>
          {/* Empty in the theme too; only its arrow shows. */}
          <div className="swiper blog-slider">
            <div className="swiper-wrapper" />
            <div className="blog-pagination" />
            <div className="blog-button-prev"
              style={{ background: "url('/wp-content/themes/velle/images/recipes/arrow-right.svg') no-repeat center center/cover" }} />
            <div className="blog-button-next" />
          </div>
          <FilteredList items={items} loadMore groups={[{ param: "blog-mark", dataAttr: "data-blog_mark", options: blog.filters }]} />
        </div>
      </main>
    </>
  );
}
