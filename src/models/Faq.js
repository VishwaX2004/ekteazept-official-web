import mongoose from "mongoose";
const schema = new mongoose.Schema({
  question: { type: String, required: true, trim: true, maxlength: 300 },
  answer: { type: String, required: true, trim: true, maxlength: 3000 },
  category: { type: String, trim: true, maxlength: 80 },
  published: { type: Boolean, default: true },
  sortOrder: { type: Number, default: 0 }
}, { timestamps: true });
export default mongoose.models.Faq || mongoose.model("Faq", schema);
