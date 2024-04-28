"use server";

import fs from "fs";
import {
  createReadStream,
  createWriteStream,
  promises as fsPromises,
} from "fs";
import { pipeline } from "stream";
import { promisify } from "util";
import { join } from "path";

const pipe = promisify(pipeline);

// export async function uploadFile(formData: FormData) {
//   const file = formData.get("file") as File;

//   // Convert the ReadableStream from the Fetch API to a Node.js stream
//   const nodeStream = file.stream() as unknown as NodeJS.ReadableStream;

//   const filePath = "D:\\smart-files\\tester\\" + file.name;
//   const fileStream = createWriteStream(filePath);

//   // Use the 'pipeline' method to pipe the streams, which handles backpressure and errors
//   await pipe(nodeStream, fileStream);

//   console.log("File has been written to the storage");
// }

// export async function getFile(fileName: string) {
//   // Define the path to the persistent storage directory
//   const storageDir = "D:\\smart-files\\tester\\";

//   // Create the full path to the file
//   const filePath = join(storageDir, fileName);

//   console.log("path-", filePath);

//   try {
//     // Check if the file exists
//     await fsPromises.access(filePath);

//     // Create a read stream for the file
//     const fileStream = createReadStream(filePath);

//     return fileStream;
//   } catch (error) {
//     console.log("File not found");
//   }
// }

export async function uploadFile(formData: FormData) {
  const file = formData.get("file") as File;

  // Convert the ReadableStream from the Fetch API to a Node.js stream
  const nodeStream = file.stream() as unknown as NodeJS.ReadableStream;

  const storageDir = "D:\\smart-files\\tester";
  const filePath = join(storageDir, file.name);

  // Ensure the directory exists
  try {
    await fsPromises.mkdir(storageDir, { recursive: true });

    // Use the 'pipeline' method to pipe the streams, which handles backpressure and errors
    const fileStream = createWriteStream(filePath);
    await pipe(nodeStream, fileStream);

    console.log("File has been written to the storage");
  } catch (err) {
    console.error("Error during file upload:", err);
    throw err; // Or handle the error as needed
  }
}

export async function getFile(fileName: string) {
  const storageDir = "D:\\smart-files\\tester\\";
  const filePath = join(storageDir, fileName);

  try {
    await fsPromises.access(filePath);
    const fileStream = createReadStream(filePath);

    // Convert the stream to a buffer
    const chunks = [];
    for await (const chunk of fileStream) {
      chunks.push(chunk);
    }
    const fileBuffer = Buffer.concat(chunks);

    // Return the buffer with the correct MIME type
    return new Response(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/octet-stream",
        "Content-Disposition": `attachment; filename="${fileName}"`,
      },
    });
  } catch (error) {
    console.error("File not found");
    return new Response("File not found", { status: 404 });
  }
}
