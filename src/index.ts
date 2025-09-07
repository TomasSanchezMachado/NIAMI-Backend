import { MikroORM, RequestContext } from '@mikro-orm/core';
import express from 'express';
import mikroOrmConfig from './mikro-orm.config';
import productRoutes from './routes/product.routes';
import ingredientRoutes from './routes/ingredient.routes';
import userRoutes from './routes/user.routes';
import promotionRoutes from './routes/promotion.routes';
import providerRoutes from './routes/provider.routes';
import authRoutes from './routes/auth.routes';

const main = async () => {

  const app = express();
  app.use(express.json());

  const orm = await MikroORM.init(mikroOrmConfig);


  // Middleware para manejar RequestContext
  app.use((req, res, next) => {
    RequestContext.create(orm.em, next);
  });

  // Rutas de autenticación (debe ir después del RequestContext)
  app.use('/auth', authRoutes);

  app.use('/products', productRoutes);

  app.use('/ingredients', ingredientRoutes);

  app.use('/users', userRoutes);

  app.use('/promotions', promotionRoutes);

  app.use('/providers', providerRoutes);

  app.listen(3000, () => console.log('Server running on port 3000'));
};

main().catch(console.error);
