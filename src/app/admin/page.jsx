import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { connectToDatabase } from "@/lib/db";
import Enquiry from "@/models/Enquiry";
import Project from "@/models/Project";
import Resource from "@/models/Resource";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") redirect("/admin/login");
  await connectToDatabase();
  const [total, newTotal, projects, resources] = await Promise.all([
    Enquiry.countDocuments(), Enquiry.countDocuments({ status: "new" }),
    Project.countDocuments({ published: true }), Resource.countDocuments({ published: true })
  ]);
  return <main className="min-h-screen bg-paper"><header className="border-b border-line bg-white"><div className="wrap flex h-20 items-center justify-between"><Link className="font-display text-xl font-bold" href="/admin">Ektazept admin</Link><Link href="/api/auth/signout" className="text-sm font-bold text-brand">Sign out</Link></div></header><section className="wrap py-12"><h1 className="mb-8 font-display text-4xl font-bold">Dashboard</h1><div className="grid gap-4 md:grid-cols-4">{[[total,"Total enquiries"],[newTotal,"New enquiries"],[projects,"Published projects"],[resources,"Published resources"]].map(([value,label]) => <div className="card" key={label}><strong className="font-display text-4xl">{value}</strong><p>{label}</p></div>)}</div><div className="mt-8 flex gap-3"><Link className="button" href="/admin/enquiries">Manage enquiries →</Link><Link className="button light" href="/admin/content">Manage content →</Link></div></section></main>;
}
