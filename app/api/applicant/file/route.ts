import { NextRequest, NextResponse } from "next/server";
import { utapi } from "@/server/uploadthing";
import { getSession } from "@/lib";
import { logError } from "@/utils/logger";

// Add new File
export async function POST(req: NextRequest) {
  const authUser = await getSession();
  try {
    if (!authUser) {
      return NextResponse.json(
        { error: "User is not authenticated" },
        { status: 401 },
      );
    }

    if (authUser.role !== "APPLICANT") {
      return NextResponse.json(
        { error: "User does not have the necessary permissions" },
        { status: 403 },
      );
    }

    const body = await req.formData();

    const file = body.get("file");

    const response = await utapi.uploadFiles(file);

    return NextResponse.json(response, { status: 200 });
  } catch (ex) {
    if (ex instanceof Error) {
      logError(ex);
    }

    return NextResponse.json(
      { error: "An error occurred while processing your request" },
      { status: 500 },
    );
  }
}

// update File
export async function PUT(req: NextRequest) {
  const authUser = await getSession();
  try {
    if (!authUser) {
      return NextResponse.json(
        { error: "User is not authenticated" },
        { status: 401 },
      );
    }

    if (authUser.role !== "APPLICANT") {
      return NextResponse.json(
        { error: "User does not have the necessary permissions" },
        { status: 403 },
      );
    }

    const body = await req.formData();

    const file = body.get("file");
    const key = body.get("key");

    if (!key)
      return NextResponse.json(
        { error: "No file data key found in the request." },
        { status: 400 },
      );

    const success = await utapi.deleteFiles(key.toString());

    if (!success)
      return NextResponse.json(
        { error: "Failed to delete the file. Please try again later." },
        { status: 500 },
      );

    const response = await utapi.uploadFiles(file);

    return NextResponse.json(response, { status: 201 });
  } catch (ex) {
    if (ex instanceof Error) {
      logError(ex);
    }

    return NextResponse.json(
      {
        error:
          "An error occurred while processing your request. Please try again later.",
      },
      { status: 500 },
    );
  }
}

// delete image
export async function DELETE(req: NextRequest) {
  const authUser = await getSession();
  try {
    if (!authUser) {
      return NextResponse.json(
        { error: "User is not authenticated" },
        { status: 401 },
      );
    }

    if (authUser.role !== "APPLICANT") {
      return NextResponse.json(
        { error: "User does not have the necessary permissions" },
        { status: 403 },
      );
    }

    const body = await req.formData();

    const key = body.get("key");

    if (!key)
      return NextResponse.json(
        { error: "No image data key found in the request." },
        { status: 400 },
      );

    const success = await utapi.deleteFiles(key.toString());

    return NextResponse.json(success, { status: 201 });
  } catch (ex) {
    if (ex instanceof Error) {
      logError(ex);
    }

    return NextResponse.json(
      {
        error:
          "An error occurred while processing your request. Please try again later.",
      },
      { status: 500 },
    );
  }
}
