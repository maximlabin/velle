# Black & White: исходный код, восстановленный из бандла Next.js

Восстановлено из `site/_next/static/chunks` (копия velle.ru из Web Archive) и двух чанков
страниц `/blackandwhite/black` и `/blackandwhite/white`, найденных в архиве отдельно.
Карт исходников (source maps) в сборке нет, поэтому имена переменных и компонентов
придуманы заново, а структура и логика соответствуют бандлу.

## Что здесь

| Файл | Откуда |
|---|---|
| `pages/_app.jsx` | `pages/_app-b3b0c5fb774eaee8.js`, модуль 3631 |
| `pages/blackandwhite/index.jsx` | `pages/blackandwhite-a93dfd7170a53b6c.js`, модуль 4150 |
| `pages/blackandwhite/black.jsx` | `pages/blackandwhite/black-21e5975516d10724.js`, модуль 5053 |
| `pages/blackandwhite/white.jsx` | `pages/blackandwhite/white-dceae20ab39a43d8.js`, модуль 8423 |
| `formatted/` | Все чанки приложения, разложенные по модулям webpack и отформатированные (включая код библиотек) |

## Чего нет

Страницы — только обёртки: `<Head>` с заголовком и описанием плюс компонент,
подключённый через `next/dynamic` с `ssr: false`. Сам интерфейс лежит в чанках,
которые браузер подгружает на лету, и краулер Web Archive их не сохранил:

- JS: `static/chunks/{18,194,329,595,651,681,741,788,989}.<hash>.js`
- CSS: `static/css/{7e1bc29088ec2e4e,e90d23cc9aa38783,dadb624abce2a6d5}.css`
- спрайт иконок `/sprite.svg` и `/_next/bd727ff9e3a66fac228593d85ed91392.svg`

Точные имена файлов — в `site/_next/static/chunks/webpack-9550d60ce86f8957.js`.
Их можно скачать с самого velle.ru, когда он доступен; лучший вариант — исходный
репозиторий у разработчика.

## Стек

Точно (по строкам версий в бандле):
- Next.js 12.3.4 (Pages Router, статический экспорт `next export`)
- React / React DOM 18.3.1

По коду модулей (версии не определить):
- React Query (`react-query` v3 или `@tanstack/react-query` v4: API совпадает)
- react-toastify
- react-inlinesvg (классовый компонент, ветка 2.x)
- prop-types (строка `SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED` — его служебная константа, а не утечка)

## Замечания по коду

- `_app` при каждой загрузке пишет `getConfig()` из `next/config` в консоль браузера —
  похоже на забытую отладку.
- Запасной спрайт рендерит импорт SVG как компонент, хотя лоадер отдаёт строку с URL.
