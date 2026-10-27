// Восстановлено из _next/static/chunks/pages/blackandwhite/white-dceae20ab39a43d8.js (модуль 8423).
import Head from "next/head";
import dynamic from "next/dynamic";

// Интерфейс страницы — модуль 8147 в чанках 989, 194, 788, 329 (стили css/7e1bc29088ec2e4e.css);
// в Web Archive отсутствует, путь импорта условный.
const White = dynamic(() => import("../../components/White"), { ssr: false });

const TITLE =
  "Velle White — Уникальный гайд по кофейням Москвы с напитками на растительном молоке.";
const DESCRIPTION =
  "Velle White — гайд по кофейням Москвы, где можно попробовать напитки на растительном молоке. " +
  "Откройте заведения с авторскими латте, капучино и другими кофейными сочетаниями, " +
  "и насладитесь ими во время прогулок по столице.";

export default function WhitePage() {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
      </Head>
      <White />
    </>
  );
}
