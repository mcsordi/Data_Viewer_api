import mysql2 from 'mysql2';
import { config } from 'dotenv';
config();

const connection = mysql2.createConnection({
  host: process.env.HOST_DATABASE,
  database: process.env.DATABASE_DATABASE,
  port: 21211,
  password: process.env.PASSWORD_DATABASE,
  user: process.env.USER_DATABASE,
});
export { connection };
