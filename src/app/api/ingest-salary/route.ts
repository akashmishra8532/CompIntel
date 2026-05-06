import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Basic validation
    if (!body.company || !body.role || !body.level || !body.location || body.base_salary === undefined || body.experience_years === undefined) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Normalize inputs
    const company = body.company.toLowerCase().trim();
    const role = body.role.trim();
    const level = body.level.trim();
    const location = body.location.trim();
    const base_salary = Number(body.base_salary);
    const bonus = Number(body.bonus) || 0;
    const stock = Number(body.stock) || 0;
    const experience_years = Number(body.experience_years);
    
    // Compute total
    const total_compensation = base_salary + bonus + stock;
    
    // Simple confidence score logic based on completeness
    let confidence_score = 70; // Base score
    if (bonus > 0) confidence_score += 15;
    if (stock > 0) confidence_score += 15;

    // Check for exact duplicates to prevent spam
    const existingSalary = await prisma.salary.findFirst({
      where: {
        company,
        role,
        level,
        location,
        experience_years,
        base_salary,
        bonus,
        stock,
      },
    });

    if (existingSalary) {
      return NextResponse.json({ error: "Duplicate entry found. This exact compensation has already been recorded." }, { status: 409 });
    }

    const salary = await prisma.salary.create({
      data: {
        company,
        role,
        level,
        location,
        experience_years,
        base_salary,
        bonus,
        stock,
        total_compensation,
        confidence_score,
      },
    });

    return NextResponse.json(salary, { status: 201 });
  } catch (error) {
    console.error("Error ingesting salary:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
