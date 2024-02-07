import { NextRequest, NextResponse } from "next/server";
import { utapi } from "@/server/uploadthing";
import { verifyAuth } from "@/lib/auth";

// Add new image
export async function POST(req: NextRequest) {
  try {
    let token = req.cookies.get("token")?.value;
    const authUser = token && (await verifyAuth(token).catch((ex) => {}));

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

    const image = body.get("imageFile");

    const response = await utapi.uploadFiles(image);

    return NextResponse.json(response, { status: 200 });
  } catch (ex) {
    // TODO: Log the console.error();

    return NextResponse.json(
      { error: "An error occurred while processing your request" },
      { status: 500 },
    );
  }
}

// update image
export async function PUT(req: NextRequest) {
  try {
    let token = req.cookies.get("token")?.value;
    const authUser = token && (await verifyAuth(token).catch((ex) => {}));

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

    const image = body.get("imageFile");
    const key = body.get("key");

    if (!key)
      return NextResponse.json(
        { error: "No image data key found in the request." },
        { status: 400 },
      );

    const success = await utapi.deleteFiles(key.toString());

    if (!success)
      return NextResponse.json(
        { error: "Failed to delete the image. Please try again later." },
        { status: 500 },
      );

    const response = await utapi.uploadFiles(image);

    return NextResponse.json(response, { status: 201 });
  } catch (ex) {
    // TODO: Log the console.error();

    return NextResponse.json(
      {
        error:
          "An error occurred while processing your request. Please try again later.",
      },
      { status: 500 },
    );
  }
}
