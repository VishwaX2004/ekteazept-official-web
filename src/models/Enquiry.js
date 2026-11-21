import mongoose from "mongoose";

const enquirySchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 100 },
  email: { type: String, required: true, trim: true, lowercase: true, maxlength: 160 },
  company: { type: String, trim: true, maxlength: 120 },
  type: { type: String, enum: ["general", "website", "product", "pricing"], required: true },
  selectedPlan: { type: String, trim: true, maxlength: 40 },
  message: { type: String, required: true, trim: true, maxlength: 3000 },
  status: { type: String, enum: ["new", "in_progress", "closed"], default: "new" },
  internalNotes: { type: String, trim: true, maxlength: 5000 }
}, { timestamps: true });

export default mongoose.models.Enquiry || mongoose.model("Enquiry", enquirySchema);
