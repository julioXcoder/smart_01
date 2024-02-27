import {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
} from "@prisma/client/runtime/library";
import { operationErrorLogger } from "@/logger";

const logOperationError = (error: unknown, sourceApi: string) => {
  if (error instanceof Error) {
    const errorLog = {
      sourceApi, // add the API name to the log
      message: error.message,
      errorType: error.constructor.name,
      stack: error.stack,
    };

    if (error instanceof PrismaClientKnownRequestError) {
      // PrismaClientKnownRequestError is thrown for known request errors
      operationErrorLogger.error({
        ...errorLog,
        errorCode: error.code, // the Prisma error code
        errorType: "PrismaClientKnownRequestError",
      });
    } else if (error instanceof PrismaClientUnknownRequestError) {
      // PrismaClientUnknownRequestError is thrown for unknown request errors
      operationErrorLogger.error({
        ...errorLog,
        errorType: "PrismaClientUnknownRequestError",
      });
    } else {
      // handle other types of errors
      operationErrorLogger.error(errorLog);
    }
  } else {
    operationErrorLogger.error({
      sourceApi,
      message: String(error),
    });
  }
};

export { logOperationError };
