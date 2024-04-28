import { NextRequest, NextResponse } from "next/server";
import { utapi } from "@/server/uploadthing";
import { getSession } from "@/lib";
import { logError } from "@/utils/logger";
import {
  createReadStream,
  createWriteStream,
  promises as fsPromises,
} from "fs";
import { pipeline } from "stream";
import { promisify } from "util";
import { join } from "path";
import { getMimeType } from "@/utils";

export async function GET(req: NextRequest) {
  const fileName = req.nextUrl.searchParams.get("fileName");
  const storageDir = "D:\\smart-files\\tester\\";

  if (!fileName) {
    return new NextResponse("File not found", { status: 404 });
  }

  const filePath = join(storageDir, fileName);

  try {
    await fsPromises.access(filePath);
    const fileStream = createReadStream(filePath);

    // Determine the MIME type based on the file extension
    const mimeType = getMimeType(fileName);

    // Convert the stream to a buffer
    const chunks = [];
    for await (const chunk of fileStream) {
      chunks.push(chunk);
    }
    const fileBuffer = Buffer.concat(chunks);

    // Return the buffer with the correct MIME type
    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        // "Content-Type": "application/octet-stream",
        "Content-Type": mimeType,
        "Content-Disposition": `attachment; filename="${fileName}"`,
      },
    });
  } catch (error) {
    console.error("File not found");
    return new NextResponse("File not found", { status: 404 });
  }
}

// function getMimeType(fileName: string): string {
//   const extension = fileName.split(".").pop();
//   switch (extension) {
//     case "jpg":
//     case "jpeg":
//       return "image/jpeg";
//     case "png":
//       return "image/png";
//     case "gif":
//       return "image/gif";
//     case "webp":
//       return "image/webp";
//     // Add more cases as needed
//     default:
//       return "application/octet-stream"; // Fallback MIME type
//   }
// }
