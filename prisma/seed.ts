import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  const existing = await prisma.user.findFirst();
  if (existing) {
    console.log("Admin user already exists:", existing.username);
    return;
  }

  const password = await bcrypt.hash("admin123", 10);
  const admin = await prisma.user.create({
    data: {
      username: "yusuf.firmansyah_",
      email: "admin@firstmate.app",
      password,
      name: "Admin",
    },
  });

  console.log("Admin user created!");
  console.log("  Email:    admin@firstmate.app");
  console.log("  Password: admin123");
  console.log("  (Change the password after first login)");
  console.log("  ID:", admin.id);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
