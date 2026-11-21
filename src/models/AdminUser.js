import mongoose from "mongoose";
const schema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true, maxlength: 160 },
  passwordHash: { type: String, required: true, select: false },
  role: { type: String, enum: ["admin"], default: "admin", required: true }
}, { timestamps: true });
export default mongoose.models.AdminUser || mongoose.model("AdminUser", schema);
