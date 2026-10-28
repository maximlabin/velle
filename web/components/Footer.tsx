// Site footer: five blocks (brand, navigation, contacts, social networks, addresses) and a bottom bar.
// Styles are in app/site.css (.site-footer); the theme's own footer rules target other classes.
const IMAGES = "/wp-content/themes/velle/images";

const MENU = [
  { href: "/", title: "Главная" },
  { href: "/products/", title: "Продукты Velle" },
  { href: "/recipes/", title: "Рецепты" },
  { href: "/blog/", title: "Блог Velle" },
  { href: "/where/", title: "Где купить" },
  { href: "/about-company/", title: "О компании" },
  { href: "/sustainability/", title: "Устойчивое развитие" },
  { href: "/contacts/", title: "Контакты" },
];

const PHONES = [
  { label: "Горячая линия", tel: "+78002001900", text: "8 (800) 200-19-00" },
  { label: "Офис", tel: "+78122440700", text: "8 (812) 244-07-00" },
];

const EMAIL = "info@velle.ru";

const SOCIALS = [
  { icon: "telegram.svg", href: "https://t.me/vellekolepno", text: "@vellekolepno" },
  { icon: "vk.svg", href: "https://vk.com/myvelle", text: "@myvelle" },
  { icon: "blog.svg", href: "https://zen.yandex.ru/id/61cc1ecd6a88387bc25af8ad", text: "Velleколепно вкусно" },
  { icon: "youtube.svg", href: "https://www.youtube.com/channel/UCY1-b3PDiR691Eky_y8TdBg", text: "YouTube" },
];

const ADDRESSES = [
  { city: "Москва", text: "127434, ул. Прянишникова, д.19А, стр. 1, помещ. III 3-го этажа, ком. 75" },
  { city: "Санкт-Петербург", text: "194362, п. Парголово, ул. Железнодорожная, дом №11, корпус 2, литера А, помещ. 20-H комн.1" },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__blocks">
          <section className="site-footer__block site-footer__brand">
            <a href="/" aria-label="Velle — на главную">
              <img src={`${IMAGES}/logo_footer.svg`} alt="Velle" className="site-footer__logo" />
            </a>
            <p className="site-footer__tagline">Растительная альтернатива молочным продуктам</p>
            {/* Opens the feedback popup (components/ThemeScripts.tsx listens for #feedback). */}
            <a href="#" id="feedback" className="site-footer__button">Обратная связь</a>
          </section>

          {/* Not a <nav>: the theme hides every nav (its breadcrumbs) on phones with !important. */}
          <div className="site-footer__block" role="navigation" aria-label="Разделы сайта">
            <h2 className="site-footer__title">Навигация</h2>
            <ul className="site-footer__list site-footer__menu">
              {MENU.map((m) => (
                <li key={m.href}><a href={m.href}>{m.title}</a></li>
              ))}
            </ul>
          </div>

          <section className="site-footer__block">
            <h2 className="site-footer__title">Контакты</h2>
            {PHONES.map((p) => (
              <div className="site-footer__phone" key={p.tel}>
                <span>{p.label}</span>
                <a href={`tel:${p.tel}`}>{p.text}</a>
              </div>
            ))}
            <ul className="site-footer__list site-footer__socials">
              <li>
                <a href={`mailto:${EMAIL}`}>
                  <img src={`${IMAGES}/mail.svg`} alt="" width={22} height={22} />
                  {EMAIL}
                </a>
              </li>
            </ul>
          </section>

          <section className="site-footer__block">
            <h2 className="site-footer__title">Мы в соцсетях</h2>
            <ul className="site-footer__list site-footer__socials">
              {SOCIALS.map((s) => (
                <li key={s.icon}>
                  <a href={s.href} target="_blank" rel="noopener">
                    <img src={`${IMAGES}/${s.icon}`} alt="" width={22} height={22} />
                    {s.text}
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <section className="site-footer__block">
            <h2 className="site-footer__title">Адреса</h2>
            {ADDRESSES.map((a) => (
              <address className="site-footer__address" key={a.city}>
                <span>{a.city}</span>
                {a.text}
              </address>
            ))}
          </section>
        </div>

        <div className="site-footer__bottom">
          <p>© 2022 Velle. Все права защищены.</p>
          <a href="/politics.pdf" download>Пользовательское соглашение</a>
        </div>
      </div>
    </footer>
  );
}
