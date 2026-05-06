import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({});

const mockData = [
  { company: "google", role: "Software Engineer", level: "L3", location: "Bangalore", experience_years: 0, base_salary: 1800000, bonus: 200000, stock: 1200000, confidence_score: 95 },
  { company: "google", role: "Software Engineer", level: "L4", location: "Bangalore", experience_years: 3, base_salary: 2800000, bonus: 300000, stock: 2500000, confidence_score: 90 },
  { company: "google", role: "Software Engineer", level: "L5", location: "Bangalore", experience_years: 6, base_salary: 4500000, bonus: 600000, stock: 4500000, confidence_score: 85 },
  { company: "amazon", role: "SDE", level: "SDE I", location: "Hyderabad", experience_years: 1, base_salary: 1600000, bonus: 300000, stock: 800000, confidence_score: 88 },
  { company: "amazon", role: "SDE", level: "SDE II", location: "Hyderabad", experience_years: 3, base_salary: 3000000, bonus: 500000, stock: 1500000, confidence_score: 92 },
  { company: "amazon", role: "SDE", level: "SDE III", location: "Bangalore", experience_years: 8, base_salary: 4800000, bonus: 800000, stock: 3500000, confidence_score: 89 },
  { company: "microsoft", role: "Software Engineer", level: "59", location: "Noida", experience_years: 0, base_salary: 1400000, bonus: 150000, stock: 600000, confidence_score: 90 },
  { company: "microsoft", role: "Software Engineer", level: "61", location: "Hyderabad", experience_years: 3, base_salary: 2200000, bonus: 250000, stock: 1200000, confidence_score: 91 },
  { company: "microsoft", role: "Software Engineer", level: "63", location: "Bangalore", experience_years: 6, base_salary: 3800000, bonus: 500000, stock: 2500000, confidence_score: 87 },
  { company: "meta", role: "Software Engineer", level: "E3", location: "Remote", experience_years: 1, base_salary: 2000000, bonus: 200000, stock: 1800000, confidence_score: 95 },
  { company: "meta", role: "Software Engineer", level: "E4", location: "Remote", experience_years: 4, base_salary: 3500000, bonus: 350000, stock: 3000000, confidence_score: 93 },
  { company: "atlassian", role: "Software Engineer", level: "P3", location: "Bangalore", experience_years: 2, base_salary: 2400000, bonus: 240000, stock: 1000000, confidence_score: 85 },
  { company: "atlassian", role: "Software Engineer", level: "P4", location: "Bangalore", experience_years: 5, base_salary: 4000000, bonus: 400000, stock: 2000000, confidence_score: 88 },
  { company: "uber", role: "Software Engineer", level: "L3", location: "Bangalore", experience_years: 1, base_salary: 2200000, bonus: 300000, stock: 1500000, confidence_score: 90 },
  { company: "uber", role: "Software Engineer", level: "L4", location: "Bangalore", experience_years: 4, base_salary: 3800000, bonus: 500000, stock: 3000000, confidence_score: 91 },
  { company: "google", role: "Product Manager", level: "L4", location: "Bangalore", experience_years: 4, base_salary: 3000000, bonus: 400000, stock: 2000000, confidence_score: 88 },
];

async function main() {
  console.log("Seeding database...");
  for (const item of mockData) {
    await prisma.salary.create({
      data: {
        ...item,
        total_compensation: item.base_salary + item.bonus + item.stock,
      },
    });
  }
  console.log("Database seeded successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
