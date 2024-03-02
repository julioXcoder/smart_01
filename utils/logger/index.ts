import {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
} from "@prisma/client/runtime/library";
import { createLogFile } from "@/logger";

const logError = (error: Error & { digest?: string }) => {
  const name = error.name;
  const cause = error.cause;
  const message = error.message;
  const digest = error.digest;
  const stack = error.stack;

  createLogFile.error({
    name,
    cause,
    message,
    digest,
    stack,
  });
};

export { logError };
