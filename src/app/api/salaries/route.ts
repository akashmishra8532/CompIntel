import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const company = searchParams.get("company");
    const role = searchParams.get("role");
    const level = searchParams.get("level");
    const location = searchParams.get("location");
    const sortBy = searchParams.get("sortBy") || "total_compensation";
    const order = searchParams.get("order") || "desc";

    const filter: any = {};
    if (company) filter.company = { contains: company.toLowerCase().trim() };
    if (role) filter.role = { contains: role };
    if (level) filter.level = level;
    if (location) filter.location = { contains: location };

    const salaries = await prisma.salary.findMany({
      where: filter,
      orderBy: {
        [sortBy]: order,
      },
    });

    return NextResponse.json(salaries);
  } catch (error) {
    console.error("Error fetching salaries:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
