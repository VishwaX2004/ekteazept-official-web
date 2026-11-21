"use client";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);
  return <>
    <header className="navbar"><div className="wrap navrow"><Link className="brand" href="/"><img className="brand-logo" src="/assets/ektazect-logo-light.png" alt="EKTAZEPT" /></Link><button className="menu-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle navigation">Menu</button><nav className={`navlinks ${open ? "show" : ""}`}><Link href="/">Home</Link><Link href="/about">Company</Link><Link href="/products">Products</Link><Link href="/pricing">Pricing</Link></nav><Link className="button" href="/contact">Get started <span>↗</span></Link></div></header></>;
}
