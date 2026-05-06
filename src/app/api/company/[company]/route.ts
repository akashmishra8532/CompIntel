import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ company: string }> }
) {
  try {
    const { company } = await params;
    const companyName = company.toLowerCase().trim();

    const salaries = await prisma.salary.findMany({
      where: { company: companyName },
      orderBy: { total_compensation: "desc" },
    });

    if (salaries.length === 0) {
      return NextResponse.json({ error: "Company not found" }, { status: 404 });
    }

    // Compute Median
    const sortedComps = [...salaries].sort((a, b) => a.total_compensation - b.total_compensation);
    const mid = Math.floor(sortedComps.length / 2);
    const medianCompensation =
      sortedComps.length % 2 !== 0
        ? sortedComps[mid].total_compensation
        : (sortedComps[mid - 1].total_compensation + sortedComps[mid].total_compensation) / 2;

    // Level Distribution
    const levelDistribution = salaries.reduce((acc: Record<string, number>, curr) => {
      acc[curr.level] = (acc[curr.level] || 0) + 1;
      return acc;
    }, {});

    return NextResponse.json({
      company: companyName,
      medianCompensation,
      levelDistribution,
      salaries,
    });
  } catch (error) {
    console.error("Error fetching company:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
