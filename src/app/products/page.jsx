import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { products } from "@/lib/content";
export const metadata = { title: "Products" };
export default function Products() { return <><Header /><main><PageHero eyebrow="Our products" title="One ecosystem. Connected work." description="EKTAZEPT products help teams organize work, understand activity, protect information, connect systems, and manage access." /><section className="py-24 md:py-32"><div className="max-w-6xl mx-auto px-6 md:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{products.map(p => <article className="bg-white border border-line rounded-2xl p-8 md:p-10 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 flex flex-col" key={p.slug}><div className="w-14 h-14 rounded-2xl bg-lav text-brand flex items-center justify-center font-display font-bold text-xl mb-5">{p.short}</div><h3 className="font-display font-bold text-xl text-ink mb-3 mt-0">EKTAZEPT {p.name}</h3><p className="text-muted text-sm leading-relaxed mb-6 flex-1">{p.summary}</p><Link className="mt-auto inline-flex items-center gap-1 text-sm font-bold text-brand hover:text-cyan transition-colors" href={`/products/${p.slug}`}>Explore {p.name} →</Link></article>)}</div></section></main><Footer /></>; }
