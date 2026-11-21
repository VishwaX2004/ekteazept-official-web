import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-session";
import { connectToDatabase } from "@/lib/db";
import Project from "@/models/Project";
import Resource from "@/models/Resource";
import TeamMember from "@/models/TeamMember";
import Faq from "@/models/Faq";

const models = { projects: Project, resources: Resource, team: TeamMember, faqs: Faq };

function allowedFields(model, body) {
  const fields = {
    projects: ["title","slug","summary","description","imageUrl","technologies","contributors","liveUrl","repositoryUrl","featured","published","sortOrder"],
    resources: ["title","slug","excerpt","body","coverImageUrl","published","publishedAt"],
    team: ["name","role","bio","imageUrl","socialLinks","published","sortOrder"],
    faqs: ["question","answer","category","published","sortOrder"]
  }[model];
  return Object.fromEntries(Object.entries(body).filter(([key]) => fields.includes(key)));
}

export async function GET(request, { params }) {
  if (!await requireAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const Model = models[params.model];
  if (!Model) return NextResponse.json({ error: "Not found" }, { status: 404 });
  await connectToDatabase();
  const items = await Model.find({}).sort({ sortOrder: 1, createdAt: -1 }).lean();
  return NextResponse.json({ items: JSON.parse(JSON.stringify(items)) });
}

export async function POST(request, { params }) {
  if (!await requireAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const Model = models[params.model];
  if (!Model) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const body = await request.json();
  await connectToDatabase();
  try {
    const item = await Model.create(allowedFields(params.model, body));
    return NextResponse.json({ item: JSON.parse(JSON.stringify(item)) }, { status: 201 });
  } catch (error) {
    if (error?.code === 11000) return NextResponse.json({ error: "That slug is already in use." }, { status: 409 });
    return NextResponse.json({ error: "Invalid content" }, { status: 400 });
  }
}
