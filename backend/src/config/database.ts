// import dotenv from "dotenv";
// import fs from "fs";
// import path from "path";

// dotenv.config();

// //use sequelize 
// import { Sequelize } from 'sequelize-typescript';

// export const db = new Sequelize({
//   database: process.env.DB_NAME ?? "mysb",
//   dialect: 'mssql',
//   username: process.env.DB_USER ?? "sa",
//   password: process.env.DB_PASS ?? "sa",
//   port: parseInt(process.env.DB_PORT ?? "1433"),
//   models: ['../models'], // or [Player, Team],
// });
 
// async function testConnection() {
//   try {
//     await db.authenticate();
//     console.log("Connection has been established successfully.");
//   } catch (error) {
//     console.error("Unable to connect to the database:", error);
//   }
// }
// testConnection();
 
// //export database
// export default db;

/*
import * as db from "mssql";

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  server: process.env.DB_HOST,
  port: process.env.DB_PORT,
  options: {
    encrypt: false,
    trustServerCertificate: false,
  },
};

const connectionString = `Server=${config.server},${config.port};Database=${config.database};User Id=${config.user};Password=${config.password};Encrypt=false`;

export const database = new db.ConnectionPool(connectionString)
  .addListener("error", (err) => {
    console.error("Database connection error:", err);
  })
  .addListener("connect", () => {
    console.log("Connected to database");
  })
  .addListener("close", () => {
    console.log("Database connection closed");
  })
  .addListener("end", () => {
    console.log("Database connection ended");
  })
  .addListener("disconnect", () => {
    console.log("Database connection disconnected");
  }) 
*/
