import { Options } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { User } from './user/User';
import { Product } from './product/Product';
import { Ingredient } from './ingredient/Ingredient';
import { Category } from './category/Category';
import { Provider } from './provider/Provider';
import { Order } from './order/Order';
import { OrderItem } from './orderitem/OrderItem';
import { Promotion } from './promotion/Promotion';

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
