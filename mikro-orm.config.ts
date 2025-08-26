import { Options } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { User } from './src/entities/User';
import { Product } from './src/entities/Product';
import { Ingredient } from './src/entities/Ingredient';
import { Category } from './src/entities/Category';
import { Provider } from './src/entities/Provider';
import { Order } from './src/entities/Order';
import { OrderItem } from './src/entities/OrderItem';
import { Supplier } from './src/entities/Supplier';
import { Promotion } from './src/entities/Promotion';

import dotenv from 'dotenv';

dotenv.config(); // para usar variables de entorno desde .env
const config: Options<PostgreSqlDriver> = {
  driver: PostgreSqlDriver,
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  dbName: process.env.DB_NAME || 'niami',
  entities: [User, Product, Ingredient, Category, Provider, Promotion, Order, OrderItem, Supplier],
  migrations: {
    path: './src/migrations', // carpeta donde se guardarán las migraciones
    tableName: 'mikro_orm_migrations',

  },
  debug: true,
};

export default config;
