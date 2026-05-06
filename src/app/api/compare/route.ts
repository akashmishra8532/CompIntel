import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id1 = searchParams.get("id1");
    const id2 = searchParams.get("id2");

    if (!id1 || !id2) {
      return NextResponse.json({ error: "id1 and id2 are required" }, { status: 400 });
    }

    const salary1 = await prisma.salary.findUnique({ where: { id: id1 } });
    const salary2 = await prisma.salary.findUnique({ where: { id: id2 } });

    if (!salary1 || !salary2) {
      return NextResponse.json({ error: "One or both salaries not found" }, { status: 404 });
    }

    const comparison = {
      salary1,
      salary2,
      differences: {
        base: Math.abs(salary1.base_salary - salary2.base_salary),
        bonus: Math.abs(salary1.bonus - salary2.bonus),
        stock: Math.abs(salary1.stock - salary2.stock),
        total: Math.abs(salary1.total_compensation - salary2.total_compensation),
        level: salary1.level !== salary2.level ? "Different" : "Same",
      },
    };

    return NextResponse.json(comparison);
  } catch (error) {
    console.error("Error comparing salaries:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
