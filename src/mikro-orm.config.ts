import { Options } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { User } from './entities/User';
import { Product } from './entities/Product';
import { Ingredient } from './entities/Ingredient';
import { Category } from './entities/Category';
import { Provider } from './entities/Provider';
import { Order } from './entities/Order';
import { OrderItem } from './entities/OrderItem';
import { Promotion } from './entities/Promotion';

import dotenv from 'dotenv';

dotenv.config(); // para usar variables de entorno desde .env
const config: Options<PostgreSqlDriver> = {
  driver: PostgreSqlDriver,
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  dbName: process.env.DB_NAME || 'niami',
  entities: [User, Product, Ingredient, Category, Provider, Promotion, Order, OrderItem],
  migrations: {
    path: './src/migrations', // carpeta donde se guardarán las migraciones
    tableName: 'mikro_orm_migrations',

  },
  debug: true,
};

export default config;
