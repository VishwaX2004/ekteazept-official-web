import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { products } from "@/lib/content";
export const metadata = { title: "Products" };
export default function Products() { return <><Header /><main><PageHero eyebrow="Our products" title="One ecosystem. Connected work." description="EKTAZEPT products help teams organize work, understand activity, protect information, connect systems, and manage access." /><section className="py-16 md:py-24 lg:py-32"><div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">{products.map(p => <article className="bg-paper border border-line rounded-lg p-6 md:p-8 hover:shadow-lg transition-shadow" key={p.slug}><div className="text-2xl md:text-3xl font-bold text-brand mb-4">{p.short}</div><h3>EKTAZEPT {p.name}</h3><p>{p.summary}</p><Link className="text-brand font-semibold hover:underline transition-colors" href={`/products/${p.slug}`}>Explore {p.name} →</Link></article>)}</div></section></main><Footer /></>; }
