import { createPool } from "mysql2/promise.js";
import config from "../config.js";
import "dotenv/config";

let pool;

export const connect = () => {
  if (!pool) {
    pool = createPool(config);
  }
  return pool;
};
