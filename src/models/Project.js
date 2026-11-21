import mongoose from "mongoose";
const schema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 160 },
  slug: { type: String, required: true, unique: true, trim: true, lowercase: true, maxlength: 160 },
  summary: { type: String, trim: true, maxlength: 500 },
  description: { type: String, trim: true, maxlength: 5000 },
  imageUrl: { type: String, trim: true, maxlength: 500 },
  technologies: [{ type: String, trim: true }],
  contributors: [{ type: String, trim: true }],
  liveUrl: { type: String, trim: true, maxlength: 500 },
  repositoryUrl: { type: String, trim: true, maxlength: 500 },
  featured: { type: Boolean, default: false },
  published: { type: Boolean, default: false },
  sortOrder: { type: Number, default: 0 }
}, { timestamps: true });
export default mongoose.models.Project || mongoose.model("Project", schema);
