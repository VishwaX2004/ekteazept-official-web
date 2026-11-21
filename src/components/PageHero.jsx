export default function PageHero({ eyebrow, title, description }) {
  return <section className="pagehero"><div className="wrap"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1>{description && <p>{description}</p>}</div></section>;
}
