// Восстановлено из _next/static/chunks/pages/_app-b3b0c5fb774eaee8.js (webpack-модуль 3631).
// Имена переменных и компонентов придуманы заново: в минифицированном бандле их нет.
import { useState } from "react";
import getConfig from "next/config";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import InlineSVG from "react-inlinesvg";
import { ToastContainer } from "react-toastify";
import Sprite from "../public/sprite.svg";

// В бандле здесь 5 пустых модулей (92, 933, 993, 7332, 8770): это глобальные импорты CSS,
// их стили собраны в _next/static/css/a475a72fdff32d64.css. Какие именно файлы — неизвестно;
// судя по содержимому CSS, среди них стили react-toastify и шрифты (@font-face).
import "react-toastify/dist/ReactToastify.css";

// Отладочный вывод runtime-конфига в консоль каждого посетителя (так в оригинале).
console.log(getConfig());

// Запасной вариант, если /sprite.svg не загрузился. Лоадер SVG в этой сборке отдаёт
// URL-строку (/_next/bd727ff9e3a66fac228593d85ed91392.svg), поэтому <Sprite /> рендерится
// как элемент с этим URL вместо имени тега — похоже на ошибку в исходнике.
const SpriteFallback = () => (
  <div style={{ display: "none" }}>
    <Sprite />
  </div>
);

export default function App({ Component, pageProps }) {
  const [queryClient] = useState(
    () => new QueryClient({ defaultOptions: { queries: { staleTime: 60_000 } } }),
  );
  const [spriteFailed, setSpriteFailed] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Component {...pageProps} />
        {spriteFailed ? (
          <SpriteFallback />
        ) : (
          <InlineSVG
            src="/sprite.svg"
            style={{ display: "none" }}
            onError={(error) => {
              setSpriteFailed(true);
              console.error(error);
            }}
          />
        )}
        <ToastContainer />
      </Hydrate>
    </QueryClientProvider>
  );
}
