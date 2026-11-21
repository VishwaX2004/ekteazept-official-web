const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

async function main() {
  const email = process.argv[2];
  const password = process.argv[3];
  if (!email || !password || password.length < 12) throw new Error("Usage: npm run create-admin -- <email> <password (12+ chars)>");
  await mongoose.connect(process.env.MONGODB_URI, { dbName: process.env.MONGODB_DB_NAME || "ektazept" });
  const schema = new mongoose.Schema({ email: { type: String, unique: true, lowercase: true, trim: true }, passwordHash: String, role: { type: String, default: "admin" } }, { timestamps: true });
  const Admin = mongoose.models.AdminUser || mongoose.model("AdminUser", schema);
  const passwordHash = await bcrypt.hash(password, 12);
  await Admin.updateOne({ email: email.toLowerCase().trim() }, { $set: { passwordHash, role: "admin" } }, { upsert: true });
  console.log("Administrator is ready.");
  await mongoose.disconnect();
}
main().catch((error) => { console.error(error.message); process.exit(1); });
