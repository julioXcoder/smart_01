import {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
} from "@prisma/client/runtime/library";
import { operationErrorLogger } from "@/logger";

const logOperationError = (error: unknown) => {
  if (error instanceof PrismaClientKnownRequestError) {
    // PrismaClientKnownRequestError is thrown for known request errors
    operationErrorLogger.error({
      message: error.message,
      errorCode: error.code, // the Prisma error code
      errorType: "PrismaClientKnownRequestError",
      stack: error.stack,
    });
  } else if (error instanceof PrismaClientUnknownRequestError) {
    // PrismaClientUnknownRequestError is thrown for unknown request errors
    operationErrorLogger.error({
      message: error.message,
      errorType: "PrismaClientUnknownRequestError",
      stack: error.stack,
    });
  } else if (error instanceof Error) {
    // handle other types of errors
    operationErrorLogger.error({
      message: error.message,
      errorType: error.constructor.name,
      stack: error.stack,
    });
  } else {
    operationErrorLogger.error(String(error));
  }
};

export { logOperationError };
