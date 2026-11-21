import { connectToDatabase } from "@/lib/db";
import Resource from "@/models/Resource";

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const routes = ["", "/about", "/team", "/solutions", "/products", "/pricing", "/resources", "/faq", "/contact"];
  const entries = routes.map(route => ({ url: `${baseUrl}${route}`, changeFrequency: "monthly", priority: route === "" ? 1 : 0.7 }));
  try {
    await connectToDatabase();
    const resources = await Resource.find({ published: true }).select("slug updatedAt").lean();
    resources.forEach(resource => entries.push({ url: `${baseUrl}/resources/${resource.slug}`, lastModified: resource.updatedAt }));
  } catch {
    // Database availability must not prevent the remaining public routes from being listed.
  }
  return entries;
}
