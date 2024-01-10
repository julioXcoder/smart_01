import prisma from "@/prisma/db";
import { NextResponse, type NextRequest } from "next/server";
import z from "zod";

const schema = z.object({
  name: z.string(),
  location: z.string(),
});

type Body = z.infer<typeof schema>;

export async function POST(request: NextRequest) {
  try {
    const body: Body = await request.json();

    const validate = schema.safeParse(body);

    if (!validate.success)
      return NextResponse.json({ error: validate.error }, { status: 400 });

    const { name, location } = body;

    const newCampus = await prisma.campus.create({
      data: {
        name,
        location,
      },
    });

    return NextResponse.json({ data: newCampus }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred while processing your request" },
      { status: 500 }
    );
  }
}
