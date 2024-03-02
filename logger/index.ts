import { createLogger, format, transports } from "winston";
import moment from "moment-timezone";

// Define a custom format
const myFormat = format.printf(({ name, cause, message, digest, stack }) => {
  const timestamp = moment()
    .tz("Africa/Dar_es_Salaam")
    .format("YYYY-MMM-DD HH:mm:ss");
  return `${timestamp} [${name}] [${cause}] [${message}] ${digest} ${stack}`;
});

const createLogFile = createLogger({
  level: "error",
  format: format.combine(
    format.label({ label: "error" }),
    format.timestamp(),
    myFormat,
  ),
  transports: [new transports.File({ filename: "./logs/errors.log" })],
});

export { createLogFile };
