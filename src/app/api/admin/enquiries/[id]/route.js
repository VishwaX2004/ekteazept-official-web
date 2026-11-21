import mongoose from "mongoose";
import { z } from "zod";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-session";
import { connectToDatabase } from "@/lib/db";
import Enquiry from "@/models/Enquiry";

export async function PATCH(request, { params }) {
  if (!await requireAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!mongoose.isValidObjectId(params.id)) return NextResponse.json({ error: "Invalid enquiry" }, { status: 400 });
  const parsed = z.object({ status: z.enum(["new", "in_progress", "closed"]).optional(), internalNotes: z.string().max(5000).optional() }).safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: "Invalid update" }, { status: 400 });
  await connectToDatabase();
  const enquiry = await Enquiry.findByIdAndUpdate(params.id, { $set: parsed.data }, { new: true }).lean();
  if (!enquiry) return NextResponse.json({ error: "Enquiry not found" }, { status: 404 });
  return NextResponse.json({ enquiry: JSON.parse(JSON.stringify(enquiry)) });
}

export async function DELETE(request, { params }) {
  if (!await requireAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!mongoose.isValidObjectId(params.id)) return NextResponse.json({ error: "Invalid enquiry" }, { status: 400 });
  await connectToDatabase();
  await Enquiry.findByIdAndDelete(params.id);
  return NextResponse.json({ success: true });
}
