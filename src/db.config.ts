import "dotenv/config";
import mysql from "mysql2/promise";
import { PrismaClient } from "./generated/prisma/client.js";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

export const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  port: parseInt(process.env.DB_PORT || "3306"),
  database: process.env.DB_NAME || "umc_week5",
  password: process.env.DB_PASSWORD || "password",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const adapter = new PrismaMariaDb({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "password",
  database: process.env.DB_NAME || "umc_week5",
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
  connectionLimit: 10,
});

export const prisma = new PrismaClient({
  adapter,
  log: ["query", "info", "warn", "error"],
});