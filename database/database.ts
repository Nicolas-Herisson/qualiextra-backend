import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const db = new Sequelize(process.env.DB_URL!, {
  dialect: "postgres",
  logging: false,
  define: {
    timestamps: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  },
})

try {
    await db.authenticate();
    console.log("Database connection has been established successfully.");
} catch (error) {
    console.error("Failed to initialize database:", error);
}
export default db;
