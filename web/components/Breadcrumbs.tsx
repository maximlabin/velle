// Breadcrumbs and the "Назад" link, same markup as the theme's templates.
const Chevron = () => (
  <svg width="4" height="8" viewBox="0 0 4 8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 1L3 4L1 7" stroke="#3D3D3D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Home = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g opacity="0.6" clipPath="url(#clip0_300_1497)">
      <path d="M3 5C3 4.44772 3.44772 4 4 4H11C11.5523 4 12 4.44772 12 5V11C12 11.5523 11.5523 12 11 12H10.75C10.1977 12 9.75 11.5523 9.75 11V9C9.75 8.44772 9.30228 8 8.75 8H7.75C7.19772 8 6.75 8.44772 6.75 9V11C6.75 11.5523 6.30228 12 5.75 12H4C3.44772 12 3 11.5523 3 11V5Z" fill="#3D3D3D" />
      <path d="M6.8682 0.514968C7.23604 0.215145 7.76396 0.215145 8.1318 0.514967L12.6834 4.22487C13.4125 4.81921 12.9923 6 12.0516 6H2.94844C2.00772 6 1.58746 4.81921 2.31664 4.22487L6.8682 0.514968Z" fill="#3D3D3D" />
    </g>
    <defs>
      <clipPath id="clip0_300_1497"><rect width="14" height="14" fill="white" /></clipPath>
    </defs>
  </svg>
);

export type Crumb = { title: string; href?: string };

export default function Breadcrumbs({ trail, back }: { trail: Crumb[]; back: string }) {
  return (
    <>
      <nav>
        <div className="navItem">
          <Home />
          <a href="/">Главная</a>
          <Chevron />
        </div>
        {trail.map((c, i) =>
          i < trail.length - 1 && c.href ? (
            <div className="navItem" key={i}>
              <a href={c.href}>{c.title}</a>
              <Chevron />
            </div>
          ) : (
            <div className="navItem" key={i}>
              <p>{c.title}</p>
            </div>
          ),
        )}
      </nav>
      <a className="back nav-back" href={back}>
        <Chevron />
        Назад
      </a>
    </>
  );
}
