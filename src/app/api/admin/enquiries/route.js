import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-session";
import { connectToDatabase } from "@/lib/db";
import Enquiry from "@/models/Enquiry";

export async function GET(request) {
  if (!await requireAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectToDatabase();
  const url = new URL(request.url);
  const status = url.searchParams.get("status");
  const page = Math.max(1, Number(url.searchParams.get("page") || 1));
  const limit = 25;
  const filter = ["new", "in_progress", "closed"].includes(status) ? { status } : {};
  const [items, total] = await Promise.all([
    Enquiry.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).lean(),
    Enquiry.countDocuments(filter)
  ]);
  return NextResponse.json({ items: JSON.parse(JSON.stringify(items)), total, page, pages: Math.ceil(total / limit) });
}
