import { User, Role } from '../models/associations.ts';
import sequelize from '../database/database.ts';

await sequelize.dropAllSchemas({});

await sequelize.sync({force: true});

await sequelize.close();

console.log('Tables created successfully');
