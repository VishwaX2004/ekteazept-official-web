import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { connectToDatabase } from "@/lib/db";
import Enquiry from "@/models/Enquiry";

export default async function Enquiries({ searchParams }) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") redirect("/admin/login");
  await connectToDatabase();
  const status = ["new", "in_progress", "closed"].includes(searchParams.status) ? searchParams.status : null;
  const items = await Enquiry.find(status ? { status } : {}).sort({ createdAt: -1 }).limit(100).lean();
  return <main className="min-h-screen bg-paper"><header className="border-b border-line bg-white"><div className="wrap flex h-20 items-center justify-between"><Link className="font-bold" href="/admin">← Dashboard</Link><span>Enquiries</span></div></header><section className="wrap py-10"><h1 className="mb-6 font-display text-4xl font-bold">Enquiries</h1><nav className="mb-6 flex gap-2">{["", "new", "in_progress", "closed"].map(s => <Link className="button light" href={s ? `/admin/enquiries?status=${s}` : "/admin/enquiries"} key={s || "all"}>{s || "All"}</Link>)}</nav><div className="grid gap-3">{items.length ? items.map(item => <article className="card" key={item._id.toString()}><div className="flex justify-between gap-4"><div><h2 className="font-bold">{item.name}</h2><p>{item.email}{item.company ? ` · ${item.company}` : ""}</p></div><span className="rounded-full bg-[#EAF2FF] px-3 py-1 text-xs font-bold text-brand">{item.status}</span></div><p className="mt-3">{item.message}</p></article>) : <p className="text-muted">No enquiries match this view.</p>}</div></section></main>;
}
