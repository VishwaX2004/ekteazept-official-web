import mongoose from "mongoose";
const schema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 160 },
  slug: { type: String, required: true, unique: true, trim: true, lowercase: true, maxlength: 160 },
  excerpt: { type: String, trim: true, maxlength: 500 },
  body: { type: String, trim: true, maxlength: 50000 },
  coverImageUrl: { type: String, trim: true, maxlength: 500 },
  published: { type: Boolean, default: false },
  publishedAt: { type: Date }
}, { timestamps: true });
export default mongoose.models.Resource || mongoose.model("Resource", schema);
