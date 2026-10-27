// Восстановлено из _next/static/chunks/pages/blackandwhite-a93dfd7170a53b6c.js (модуль 4150).
import Head from "next/head";
import dynamic from "next/dynamic";

// Весь интерфейс страницы рендерится только в браузере. Его код (модуль 8595 в чанках
// 989, 18, 595 и стили из css/e90d23cc9aa38783.css) в Web Archive отсутствует; путь импорта условный.
const BlackAndWhite = dynamic(() => import("../../components/BlackAndWhite"), { ssr: false });

const TITLE = "Velle Black & White - Уникальный гайд по кофейням и барам Москвы.";
const DESCRIPTION =
  "Velle Black & White — уникальный гайд по кофейням, барам и прогулочным местам Москвы. " +
  "Узнайте, где можно попробовать авторские коктейли и кофе на растительном молоке " +
  "и насладиться ими во время прогулок по столице.";

export default function BlackAndWhitePage() {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
      </Head>
      <BlackAndWhite />
    </>
  );
}
