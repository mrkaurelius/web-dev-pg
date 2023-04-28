import { pino } from "pino";
import { IRequest } from "./json-rpc";

export const PORT = 8081;

// const LOG_LEVEL = "trace";
// const LOG_LEVEL = "debug";
const LOG_LEVEL = "info";

export const logger = pino({
  level: LOG_LEVEL,
});
