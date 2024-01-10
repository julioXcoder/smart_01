import prisma from "@/prisma/db";
import { NextResponse, type NextRequest } from "next/server";
import z from "zod";

const schema = z.object({
  name: z.string(),
  collegeId: z.string(),
});

type Body = z.infer<typeof schema>;

export async function POST(request: NextRequest) {
  try {
    const body: Body = await request.json();

    const validate = schema.safeParse(body);

    if (!validate.success)
      return NextResponse.json({ error: validate.error }, { status: 400 });

    const { name, collegeId } = body;

    const college = await prisma.college.findUnique({
      where: {
        id: collegeId,
      },
    });

    if (!college)
      return NextResponse.json({ error: "Not Found!" }, { status: 404 });

    const newDepartment = await prisma.department.create({
      data: {
        name,
        collegeId: college.id,
      },
    });

    return NextResponse.json({ data: newDepartment }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred while processing your request" },
      { status: 500 }
    );
  }
}
