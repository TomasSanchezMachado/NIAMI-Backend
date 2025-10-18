import { MikroORM, RequestContext } from '@mikro-orm/core';
import express from 'express';
import cors from 'cors';
import mikroOrmConfig from './mikro-orm.config';
import productRoutes from './routes/product.routes';
import ingredientRoutes from './routes/ingredient.routes';
import userRoutes from './routes/user.routes';
import promotionRoutes from './routes/promotion.routes';
import providerRoutes from './routes/provider.routes';
import authRoutes from './routes/auth.routes';
import OrderRoutes from './routes/order.routes';
import OrderItemsRoutes from './routes/order-items.routes';
import categoryRoutes from './routes/category.routes';
import mailRoutes from './routes/mail.routes';

const main = async () => {

  const app = express();
  app.use(express.json());

  const orm = await MikroORM.init(mikroOrmConfig);

  // Cors debe ir antes de las rutas
  app.use(cors({
    origin: 'http://localhost:5173', // origen de tu front
    methods: ['GET','POST','PUT','DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  }));
  
  // Middleware para manejar RequestContext
  app.use((req, res, next) => {
    RequestContext.create(orm.em, next);
  });

  // Rutas de autenticación (debe ir después del RequestContext)
  const apiRouter = express.Router();

  apiRouter.use('/auth', authRoutes);
  apiRouter.use('/products', productRoutes);
  apiRouter.use('/ingredients', ingredientRoutes);
  apiRouter.use('/users', userRoutes);
  apiRouter.use('/promotions', promotionRoutes);
  apiRouter.use('/providers', providerRoutes);
  apiRouter.use('/orders', OrderRoutes);
  apiRouter.use('/order-items', OrderItemsRoutes);
  apiRouter.use('/categories', categoryRoutes);
  apiRouter.use('/mail', mailRoutes);

  app.use('/api', apiRouter);

  app.listen(3000, () => console.log('Server running on port 3000'));
};

main().catch(console.error);
