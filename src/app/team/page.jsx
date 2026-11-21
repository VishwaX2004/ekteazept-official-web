import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { team } from "@/lib/content";
export const metadata = { title: "Our Team" };
export default function Team() { return <><Header /><main><section className="pagehero"><div className="wrap"><div className="crumb"><Link href="/">Home</Link> / Company / Team</div><span className="eyebrow">The people behind EKTAZECT</span><h1>Meet our team.</h1><p>Get to know the people building and shaping EKTAZECT. Explore each person’s role, skills, and profile highlights.</p></div></section><section className="section"><div className="wrap teamgrid">{team.map(m => <article className="member" key={m.name}><img className="member-photo" src={m.image} alt={`Portrait of ${m.name}`} /><h3>{m.name}</h3><p className="role">{m.role}</p><div className="member-tags">{m.skills.map(skill => <span key={skill}>{skill}</span>)}</div><p>{m.bio}</p><a className="profile-link" href={m.href} target="_blank" rel="noreferrer">View LinkedIn profile ↗</a></article>)}</div></section></main><Footer /></>; }
