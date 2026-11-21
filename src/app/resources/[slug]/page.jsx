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
  return <><Header /><main><article className="py-12 md:py-20 bg-gradient-to-b from-paper to-white"><div className="max-w-3xl mx-auto px-4 md:px-6"><span className="inline-block text-sm font-bold tracking-widest text-brand uppercase mb-4">Resource</span><h1>{resource.title}</h1>{resource.excerpt && <p>{resource.excerpt}</p>}</div></article><section className="py-16 md:py-24 lg:py-32 bg-white"><div className="max-w-3xl mx-auto px-4 md:px-6 whitespace-pre-wrap leading-relaxed">{resource.body}</div></section></main><Footer /></>;
}
