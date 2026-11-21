import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-session";
import { connectToDatabase } from "@/lib/db";
import Project from "@/models/Project";
import Resource from "@/models/Resource";
import TeamMember from "@/models/TeamMember";
import Faq from "@/models/Faq";

const models = { projects: Project, resources: Resource, team: TeamMember, faqs: Faq };
const fields = {
  projects: ["title","slug","summary","description","imageUrl","technologies","contributors","liveUrl","repositoryUrl","featured","published","sortOrder"],
  resources: ["title","slug","excerpt","body","coverImageUrl","published","publishedAt"],
  team: ["name","role","bio","imageUrl","socialLinks","published","sortOrder"],
  faqs: ["question","answer","category","published","sortOrder"]
};

export async function PATCH(request, { params }) {
  if (!await requireAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const Model = models[params.model];
  if (!Model || !mongoose.isValidObjectId(params.id)) return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  const body = await request.json();
  const update = Object.fromEntries(Object.entries(body).filter(([key]) => fields[params.model].includes(key)));
  await connectToDatabase();
  const item = await Model.findByIdAndUpdate(params.id, { $set: update }, { new: true, runValidators: true }).lean();
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ item: JSON.parse(JSON.stringify(item)) });
}

export async function DELETE(request, { params }) {
  if (!await requireAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const Model = models[params.model];
  if (!Model || !mongoose.isValidObjectId(params.id)) return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  await connectToDatabase();
  await Model.findByIdAndDelete(params.id);
  return NextResponse.json({ success: true });
}
