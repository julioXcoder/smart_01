import prisma from "@/prisma/db";
import { NextResponse, type NextRequest } from "next/server";
import z from "zod";

const LevelEnum = z.enum([
  "DIPLOMA",
  "CERTIFICATE",
  "BACHELOR",
  "MASTERS",
  "PHD",
]);

const TypeEnum = z.enum(["FULL_TIME", "PART_TIME"]);

const schema = z.object({
  code: z.string(),
  name: z.string(),
  level: LevelEnum,
  duration: z.number().max(5).min(1),
  type: TypeEnum,
  language: z.string(),
  departmentId: z.string(),
  tuitionFee: z.number(),
  applicationFee: z.number(),
  qualification: z.string(),
  applicationDeadline: z.string(),
});

type Body = z.infer<typeof schema>;

export async function POST(request: NextRequest) {
  try {
    const body: Body = await request.json();

    const validate = schema.safeParse(body);

    if (!validate.success)
      return NextResponse.json({ error: validate.error }, { status: 400 });

    const {
      name,
      code,
      level,
      applicationDeadline,
      applicationFee,
      language,
      duration,
      type,
      qualification,
      tuitionFee,
      departmentId,
    } = body;

    const department = await prisma.department.findUnique({
      where: {
        id: departmentId,
      },
    });

    if (!department)
      return NextResponse.json({ error: "Not Found!" }, { status: 404 });

    const newProgramme = await prisma.programme.create({
      data: {
        name,
        code,
        level,
        applicationDeadline,
        applicationFee,
        language,
        duration,
        type,
        qualification,
        tuitionFee,
        departmentId: department.id,
      },
    });

    return NextResponse.json({ data: newProgramme }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred while processing your request" },
      { status: 500 }
    );
  }
}
