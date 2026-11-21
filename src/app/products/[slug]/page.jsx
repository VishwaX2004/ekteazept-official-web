import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { products } from "@/lib/content";
export function generateStaticParams() { return products.map(p => ({ slug: p.slug })); }
export async function generateMetadata({ params }) { const product = products.find(p => p.slug === params.slug); return product ? { title: `Ektazept ${product.name}` } : {}; }
export default function Product({ params }) { const product = products.find(p => p.slug === params.slug); if (!product) notFound(); return <><Header /><main><PageHero eyebrow={`Ektazept ${product.name}`} title={`${product.name}, made clearer.`} description={product.summary} /><section className="section white"><div className="wrap split"><div><h2>A focused idea, thoughtfully explored.</h2><p>This product concept is part of Ektazept’s connected ecosystem. We are shaping the experience around real needs, useful workflows, and a calm interface.</p><Link className="button" href="/contact">Discuss this product ↗</Link></div><div className="visual-card"><div className="icon">{product.short}</div><h3>{product.name}</h3><p className="muted">A clear place for the work that matters.</p></div></div></section></main><Footer /></>; }
