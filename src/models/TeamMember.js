import mongoose from "mongoose";
const schema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 120 },
  role: { type: String, trim: true, maxlength: 120 },
  bio: { type: String, trim: true, maxlength: 2000 },
  imageUrl: { type: String, trim: true, maxlength: 500 },
  socialLinks: { linkedin: String, github: String, website: String },
  published: { type: Boolean, default: true },
  sortOrder: { type: Number, default: 0 }
}, { timestamps: true });
export default mongoose.models.TeamMember || mongoose.model("TeamMember", schema);
