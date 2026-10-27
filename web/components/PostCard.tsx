// Card used in recipe and blog lists. The theme nested "Смотреть рецепт" links inside the card link;
// browsers split nested <a>, so the inner ones are spans with the same classes.
export type CardData = { href: string; image: string | null; badges?: string[]; date?: string; title: string; text: string; cta: string };

export default function PostCard({ card, wrap = true }: { card: CardData; wrap?: boolean }) {
  const inner = (
    <a className="post-card-wrapper" href={card.href}>
      <div className="post-card">
        <div className="card-image-wrapper">
          <img src={card.image ?? undefined} className="card-image" alt="" />
        </div>
        {card.badges && (
          <div className="bottom">
            {card.badges.map((b, i) => <div className="bottomItem" key={i}>{b}</div>)}
          </div>
        )}
        <div className="card-text">
          {card.date && <p className="date">{card.date}</p>}
          <h3>{card.title}</h3>
          <p className="text">{card.text}</p>
          <span className="card-link">{card.cta}</span>
        </div>
      </div>
    </a>
  );
  return wrap ? <div className="post-card-wrap" style={{ display: "block" }}>{inner}</div> : inner;
}
