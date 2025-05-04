import sequelize from "../database/database.ts";
import { DataTypes, Model } from "sequelize";

export default class User extends Model {};

User.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    autoIncrement: false,
    allowNull: false,
    unique: true,
    defaultValue: DataTypes.UUIDV4
  },
  firstname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  is_verified: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  verification_token: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  sequelize,
  tableName: "users",
});

