import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import Share from "@/components/Share";
import ThemeStyles from "@/components/ThemeStyles";
import { blog, cssToStyle, post, toMetadata } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => blog.posts.map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: Props) {
  return toMetadata(post((await params).slug)?.meta);
}

export default async function PostPage({ params }: Props) {
  const p = post((await params).slug);
  if (!p) notFound();

  return (
    <>
      <ThemeStyles />
      <main className="mainBlogPost">
        <div className="intro-block" style={cssToStyle(p.introStyle)}>
          <div className="overlay">
            <Breadcrumbs trail={[{ title: "Блог", href: "/blog/" }, { title: p.title }]} back="/blog/" />
            <div className="intro-text">
              <p className="date">{p.date}</p>
              <h1>{p.title}</h1>
              <Share />
            </div>
          </div>
        </div>
        <div className="content-wrapper">
          <div className="content" dangerouslySetInnerHTML={{ __html: p.bodyHtml }} />
        </div>
      </main>
    </>
  );
}
