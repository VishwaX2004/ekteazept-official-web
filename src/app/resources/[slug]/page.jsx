import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { connectToDatabase } from "@/lib/db";
import Resource from "@/models/Resource";

export default async function ResourceDetail({ params }) {
  let resource = null;
  try {
    await connectToDatabase();
    resource = await Resource.findOne({ slug: params.slug, published: true }).lean();
  } catch {
    resource = null;
  }
  if (!resource) notFound();
  return <><Header /><main><article className="pagehero"><div className="wrap max-w-3xl"><span className="eyebrow">Resource</span><h1>{resource.title}</h1>{resource.excerpt && <p>{resource.excerpt}</p>}</div></article><section className="section white"><div className="wrap max-w-3xl whitespace-pre-wrap leading-relaxed">{resource.body}</div></section></main><Footer /></>;
}
