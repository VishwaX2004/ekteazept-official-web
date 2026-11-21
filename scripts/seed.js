const mongoose = require("mongoose");
require("dotenv").config();

async function main() {
  await mongoose.connect(process.env.MONGODB_URI, { dbName: process.env.MONGODB_DB_NAME || "ektazept" });
  const teamSchema = new mongoose.Schema({ name: String, role: String, bio: String, imageUrl: String, socialLinks: Object, published: Boolean, sortOrder: Number }, { timestamps: true });
  const Team = mongoose.models.TeamMember || mongoose.model("TeamMember", teamSchema);
  const faqSchema = new mongoose.Schema({ question: String, answer: String, category: String, published: Boolean, sortOrder: Number }, { timestamps: true });
  const Faq = mongoose.models.Faq || mongoose.model("Faq", faqSchema);
  await Promise.all([
    Team.updateOne({ name: "Hasitha Sandakelum" }, { $set: { role: "Co-founder", imageUrl: "/assets/ektazept-hasitha.jpeg", published: true, sortOrder: 1 } }, { upsert: true }),
    Team.updateOne({ name: "Vishwa Pramuditha" }, { $set: { role: "Co-founder", imageUrl: "/assets/ektazept-vishwa.jpeg", published: true, sortOrder: 2 } }, { upsert: true }),
    Team.updateOne({ name: "Dasindu Dilvan" }, { $set: { role: "Co-founder", imageUrl: "/assets/ektazept-dasindu.jpeg", published: true, sortOrder: 3 } }, { upsert: true }),
    Team.updateOne({ name: "Amjad Hasan" }, { $set: { role: "Co-founder", imageUrl: "/assets/ektazept-amjad.jpeg", published: true, sortOrder: 4 } }, { upsert: true }),
    Faq.updateOne({ question: "What does Ektazept do?" }, { $setOnInsert: { answer: "We design and build websites, digital products, and connected experiences.", published: true } }, { upsert: true })
  ]);
  console.log("Approved seed content is ready.");
  await mongoose.disconnect();
}
main().catch((error) => { console.error(error.message); process.exit(1); });
