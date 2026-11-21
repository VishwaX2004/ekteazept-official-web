import { z } from "zod";
import { connectToDatabase } from "@/lib/db";
import Enquiry from "@/models/Enquiry";
const schema = z.object({ name:z.string().trim().min(2).max(100), email:z.string().email().max(160), company:z.string().trim().max(120).optional().or(z.literal("")), type:z.enum(["general","website","product","pricing"]), selectedPlan:z.string().max(40).optional().or(z.literal("")), message:z.string().trim().min(10).max(3000), website:z.string().max(0).optional().or(z.literal("")) });
export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Please submit valid form data." }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) return Response.json({ error: "Please check the form fields and try again." }, { status: 400 });
  if (!process.env.MONGODB_URI) return Response.json({ error: "Enquiries are not configured yet. Please try again later." }, { status: 503 });

  try {
    await connectToDatabase();
    await Enquiry.create(parsed.data);
    return Response.json({ message: "Your enquiry has been received." }, { status: 201 });
  } catch {
    return Response.json({ error: "We could not save your enquiry. Please try again later." }, { status: 503 });
  }
}
