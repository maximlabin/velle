// The theme's numbered pagination; pages are switched with a query parameter instead of /page/N/.
const Arrow = ({ d, color }: { d: string; color: string }) => (
  <svg width="8" height="23" viewBox="0 0 14 23" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d={d} stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function Pagination({ page, pages, href }: { page: number; pages: number; href: (p: number) => string }) {
  if (pages < 2) return null;
  const first = page <= 1, last = page >= pages;
  return (
    <div className="d-flex align-items-center justify-content-center">
      <div className="swiper-pagination mainPagination">
        <a className={`prev-arrow${first ? " arrow-disabled" : ""}`} href={first ? undefined : href(page - 1)}>
          <Arrow d="M11.55 20.6499L2.40002 11.4999L11.55 2.34991" color={first ? "#898989" : "#008425"} />
        </a>
        <div className="numbers-wrapper">
          {Array.from({ length: pages }, (_, i) => i + 1).map((n) =>
            n === page ? (
              <a key={n} className="pagination-number pagination-number__active">{n}</a>
            ) : (
              <a key={n} href={href(n)} className="pagination-number">{n}</a>
            ),
          )}
        </div>
        <a className={`next-arrow${last ? " arrow-disabled" : ""}`} href={last ? undefined : href(page + 1)}>
          <Arrow d="M2.44998 2.3501L11.6 11.5001L2.44997 20.6501" color={last ? "#898989" : "#008425"} />
        </a>
      </div>
    </div>
  );
}
