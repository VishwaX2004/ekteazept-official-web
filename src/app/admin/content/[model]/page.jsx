"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ContentList({ params }) {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("");
  useEffect(() => {
    fetch(`/api/admin/content/${params.model}`).then(r => r.json()).then(data => setItems(data.items || [])).catch(() => setStatus("Unable to load content."));
  }, [params.model]);
  async function remove(id) {
    if (!window.confirm("Delete this item?")) return;
    const response = await fetch(`/api/admin/content/${params.model}/${id}`, { method: "DELETE" });
    if (response.ok) setItems(items.filter(item => item._id !== id));
    else setStatus("Unable to delete the item.");
  }
  return <main className="min-h-screen bg-paper"><header className="border-b border-line bg-white"><div className="wrap flex h-20 items-center justify-between"><Link className="font-bold" href="/admin/content">← Content</Link><span className="capitalize">{params.model}</span></div></header><section className="wrap py-10"><h1 className="mb-6 font-display text-4xl font-bold capitalize">{params.model}</h1>{status && <p role="status" className="mb-4 text-sm">{status}</p>}<div className="grid gap-3">{items.map(item => <article className="card flex items-center justify-between gap-4" key={item._id}><div><h2 className="font-bold">{item.title || item.name || item.question || item.slug}</h2><p>{item.published ? "Published" : "Draft"}</p></div><button className="button light" onClick={() => remove(item._id)}>Delete</button></article>)}</div>{!items.length && <p className="text-muted">No content records yet.</p>}</section></main>;
}
