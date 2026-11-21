import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";

export default async function ContentHome() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") redirect("/admin/login");
  const sections = [
    ["Projects", "projects", "Create and publish portfolio work"],
    ["Resources", "resources", "Write guides and published articles"],
    ["Team", "team", "Manage team profiles and display order"],
    ["FAQs", "faqs", "Manage questions and categories"]
  ];
  return <main className="min-h-screen bg-paper"><header className="border-b border-line bg-white"><div className="wrap flex h-20 items-center justify-between"><Link className="font-bold" href="/admin">← Dashboard</Link><span>Content</span></div></header><section className="wrap py-10"><h1 className="mb-7 font-display text-4xl font-bold">Manage content</h1><div className="grid gap-4 md:grid-cols-2">{sections.map(([title, slug, description]) => <Link className="card" href={`/admin/content/${slug}`} key={slug}><h2 className="font-display text-2xl font-bold">{title}</h2><p>{description}</p></Link>)}</div></section></main>;
}
