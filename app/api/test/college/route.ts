import prisma from "@/prisma/db";
import { NextResponse, type NextRequest } from "next/server";
import z from "zod";

const schema = z.object({
  name: z.string(),
  campusId: z.string(),
});

type Body = z.infer<typeof schema>;

export async function POST(request: NextRequest) {
  try {
    const body: Body = await request.json();

    const validate = schema.safeParse(body);

    if (!validate.success)
      return NextResponse.json({ error: validate.error }, { status: 400 });

    const { name, campusId } = body;

    const campus = await prisma.campus.findUnique({
      where: {
        id: campusId,
      },
    });

    if (!campus)
      return NextResponse.json({ error: "Not Found!" }, { status: 404 });

    const newCollege = await prisma.college.create({
      data: {
        name,
        campusId: campus.id,
      },
    });

    return NextResponse.json({ data: newCollege }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred while processing your request" },
      { status: 500 }
    );
  }
}
