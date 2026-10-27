// Восстановлено из _next/static/chunks/pages/blackandwhite/black-21e5975516d10724.js (модуль 5053).
import Head from "next/head";
import dynamic from "next/dynamic";

// Интерфейс страницы — модуль 2655 в чанках 989, 194, 788, 681 (стили css/dadb624abce2a6d5.css);
// в Web Archive отсутствует, путь импорта условный.
const Black = dynamic(() => import("../../components/Black"), { ssr: false });

const TITLE = "Velle Black — Уникальный гайд по Москве с коктейлями на растительном молоке.";
const DESCRIPTION =
  "Velle Black — гайд по местам и прогулочным маршрутам Москвы, где можно попробовать " +
  "авторские коктейли на растительном молоке Velle Barista. Откройте новые вкусы " +
  "и насладитесь напитками во время прогулок по столице.";

export default function BlackPage() {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
      </Head>
      <Black />
    </>
  );
}
