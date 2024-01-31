import { createLogger, format, transports } from "winston";
import moment from "moment-timezone";

// Define a custom format
const myFormat = format.printf(({ level, message, label }) => {
  const timestamp = moment()
    .tz("Africa/Dar_es_Salaam")
    .format("YYYY-MMM-DD HH:mm:ss");
  return `${timestamp} [${label}] ${level}: ${message}`;
});

// Create a logger for each type of error

/**
 * Configuration Logger
 * Logs errors related to misconfigurations in your application. For example, missing environment variables, incorrect settings, or issues with configuration files.
 */
const configurationErrorLogger = createLogger({
  level: "error",
  format: format.combine(
    format.label({ label: "Configuration" }),
    format.timestamp(),
    myFormat,
  ),
  transports: [
    new transports.File({ filename: "./logs/configuration_error.log" }),
  ],
});

/**
 * Integration Logger
 * Logs errors related to third-party integrations. For example, issues with external APIs, payment gateways, or other external services that your application relies on.
 */
const integrationErrorLogger = createLogger({
  level: "error",
  format: format.combine(
    format.label({ label: "Integration" }),
    format.timestamp(),
    myFormat,
  ),
  transports: [
    new transports.File({ filename: "./logs/integration_error.log" }),
  ],
});

/**
 * File Upload Logger
 * Logs errors that occur during file uploads. For example upload failures.
 */
const fileUploadErrorLogger = createLogger({
  level: "error",
  format: format.combine(
    format.label({ label: "FileUpload" }),
    format.timestamp(),
    myFormat,
  ),
  transports: [
    new transports.File({ filename: "./logs/fileUpload_error.log" }),
  ],
});

/**
 * Security Logger
 * Logs errors related to security vulnerabilities. For example, access control violations, injection attempts, or cross-site scripting (XSS) issues.
 */
const securityErrorLogger = createLogger({
  level: "error",
  format: format.combine(
    format.label({ label: "Security" }),
    format.timestamp(),
    myFormat,
  ),
  transports: [new transports.File({ filename: "./logs/security_error.log" })],
});

/**
 * Operation Logger
 * Logs errors related to the core operations of your application. For example, database errors, validation errors, or network errors.
 */
const operationErrorLogger = createLogger({
  level: "error",
  format: format.combine(
    format.label({ label: "Operation" }),
    format.timestamp(),
    myFormat,
  ),
  transports: [new transports.File({ filename: "./logs/operation_error.log" })],
});

export {
  configurationErrorLogger,
  integrationErrorLogger,
  fileUploadErrorLogger,
  securityErrorLogger,
  operationErrorLogger,
};
