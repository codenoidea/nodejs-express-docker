require('dotenv').config();

export default {
  DB_USERNAME: process.env.DB_USERNAME || "postgres",
  DB_PASSWORD: process.env.DB_PASSWORD || "postgres1234",
  DB_DATABASE: "express",
  DB_HOST: process.env.DB_HOST || "127.0.0.1",
}