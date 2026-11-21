import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { plans } from "@/lib/content";
export const metadata = { title: "Pricing" };
export default function Pricing() { return <><Header /><main><PageHero eyebrow="Website services" title="A clear starting point for your next stage." description="Choose a direction, then we will scope the right solution around your goals. Final pricing is confirmed in a written quote." /><section className="section"><div className="wrap plan-grid">{plans.map((p, i) => <article className="card" key={p}><div className="icon">0{i + 1}</div><h3>{p}</h3><p>{["A polished portfolio or personal website.","A focused site for one product or offer.","A complete online store experience.","A tailored platform for complex requirements."][i]}</p><Link className="button light" href={`/contact?plan=${p.toLowerCase().replaceAll(" ", "-")}`}>Discuss {p} ↗</Link></article>)}</div></section><section className="section white"><div className="wrap section-head"><span className="eyebrow">A note on pricing</span><h2>No invented fixed prices.</h2><p>Scope, content, integrations, hosting, domains, and third-party provider charges can vary. We will explain the options clearly before work begins.</p></div></section></main><Footer /></>; }
