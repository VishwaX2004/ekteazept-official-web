import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { products } from "@/lib/content";
export const metadata = { title: "Products" };
export default function Products() { return <><Header /><main><PageHero eyebrow="Our products" title="One ecosystem. Connected work." description="EKTAZEPT products help teams organize work, understand activity, protect information, connect systems, and manage access." /><section className="section"><div className="wrap cards">{products.map(p => <article className="card" key={p.slug}><div className="icon">{p.short}</div><h3>EKTAZEPT {p.name}</h3><p>{p.summary}</p><Link className="text-link" href={`/products/${p.slug}`}>Explore {p.name} →</Link></article>)}</div></section></main><Footer /></>; }
