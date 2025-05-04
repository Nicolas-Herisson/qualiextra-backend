import User from "./user.ts";
import Role from "./role.ts";

User.belongsTo(Role, { as: "role", foreignKey: "role_id" });
Role.hasMany(User, { as: "users", foreignKey: "role_id" });

export {
  User,
  Role
};
