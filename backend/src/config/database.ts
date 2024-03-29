/* eslint-disable no-console */

import { DataSource, DataSourceOptions } from 'typeorm';
import { getErrorMessage } from '../helpers';

function getSSLConfig(env: string) {
  const configs: { [key: string]: boolean | { [key: string]: boolean } } = {
    production: { rejectUnauthorized: true },
    local: false,
    deploy: { rejectUnauthorized: false }
  };
  if (!configs[env] === undefined) {
    throw new Error('Set network in your .env file');
  }
  return configs[env];
}

const options: DataSourceOptions = {
  // type: 'mariadb',
  type: 'postgres',
  host: process.env.SQL_HOST,
  port: Number(process.env.SQL_PORT),

  username: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  database: process.env.SQL_DB,

  entities: ['dist/entities/**/*.{ts,js}'],
  migrations: ['dist/migrations/**/*.{ts,js}'],
  subscribers: ['src/subscriber/**/*.ts'],

  ssl: getSSLConfig(process.env.SERVER_MODE ?? ''),
  synchronize: true,
  logging: ['query', 'error']
};

const dataSource = new DataSource(options);

const connectDB = async () => {
  try {
    await dataSource.initialize();
  } catch (err) {
    const message = getErrorMessage(err);
    console.error(message);
    process.exit(1);
  }
};

export default connectDB;
