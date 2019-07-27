import Koa from 'koa';
import Router from 'koa-router';
import Logger from 'koa-logger';
import Cors from 'kcors';
import BodyParser from 'koa-bodyparser';
import routes from './routes/blog';
// import errorHandling from './middleware/errorHandling';

const app = new Koa();
const router = Router();

app.use(BodyParser());
app.use(Logger());
app.use(Cors());
// app.use(errorHandling);

// API Route
app.use(routes).use(router.allowedMethods());

export default app;

