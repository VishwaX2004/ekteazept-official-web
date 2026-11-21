import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { products } from "@/lib/content";
export function generateStaticParams() { return products.map(p => ({ slug: p.slug })); }
export async function generateMetadata({ params }) { const product = products.find(p => p.slug === params.slug); return product ? { title: `Ektazept ${product.name}` } : {}; }
export default function Product({ params }) { const product = products.find(p => p.slug === params.slug); if (!product) notFound(); return <><Header /><main><PageHero eyebrow={`Ektazept ${product.name}`} title={`${product.name}, made clearer.`} description={product.summary} /><section className="py-16 md:py-24 lg:py-32 bg-white"><div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center"><div><h2>A focused idea, thoughtfully explored.</h2><p>This product concept is part of Ektazept&apos;s connected ecosystem. We are shaping the experience around real needs, useful workflows, and a calm interface.</p><Link className="inline-block px-6 py-3 bg-brand text-white rounded-lg font-semibold hover:bg-navy transition-colors" href="/contact">Discuss this product ↗</Link></div><div className="bg-gradient-to-br from-lav to-cyan rounded-lg p-8 text-center space-y-4 border border-line"><div className="text-2xl md:text-3xl font-bold text-brand mb-4">{product.short}</div><h3>{product.name}</h3><p className="text-muted">A clear place for the work that matters.</p></div></div></section></main><Footer /></>; }
