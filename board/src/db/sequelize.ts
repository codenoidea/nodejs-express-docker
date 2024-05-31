import config from "../config";
import { Sequelize } from 'sequelize';
import { PostgresDialect } from '@sequelize/postgres';
import pg from 'pg'

console.log(`config`, config)
const sequelize = new Sequelize(
  config.DB_DATABASE,
  config.DB_USERNAME,
  config.DB_PASSWORD,
  {
    host: config.DB_HOST,
    dialect: 'postgres',
    port: 5432,
    dialectModule: pg,
    pool: {
      max: 100,
      min: 0,
      acquire: 10000,
      idle: 20000
    },
    logging: false
  }

);

export default sequelize;