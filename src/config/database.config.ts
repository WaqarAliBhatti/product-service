import * as dotenv from "dotenv";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

dotenv.config();
const dbConfig = {
  host: process.env.TYPE_ORM_DATABASE_HOST,
  port: process.env.TYPE_ORM_DATABASE_PORT,
  username: process.env.TYPE_ORM_DATABASE_USERNAME,
  password: process.env.TYPE_ORM_DATABASE_PASSWORD,
  name: process.env.TYPE_ORM_DATABASE_NAME,
};

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: "postgres",
  host: dbConfig.host,
  port: +dbConfig.port,
  username: dbConfig.username,
  password: dbConfig.password,
  database: dbConfig.name,
  entities: [],
  synchronize: false,

  // logging: true,   
}