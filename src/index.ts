import { MikroORM, RequestContext } from '@mikro-orm/core';
import express from 'express';
import mikroOrmConfig from './mikro-orm.config';
import productRoutes from './routes/product.routes';

const main = async () => {
  const app = express();
  app.use(express.json());

  const orm = await MikroORM.init(mikroOrmConfig);

  // Middleware para manejar RequestContext
  app.use((req, res, next) => {
    RequestContext.create(orm.em, next);
  });

  app.use('/products', productRoutes);

  app.listen(3000, () => console.log('Server running on port 3000'));
};

main().catch(console.error);
