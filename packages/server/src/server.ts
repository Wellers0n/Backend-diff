import koa, { Request, Response } from "koa";
import route from "koa-router";
import logger from "koa-logger";
import json from "koa-json";
import bodyparser from "koa-bodyparser";
import cors from "kcors";
import dotenv from "dotenv-safe";
const graphqlHTTP = require("koa-graphql");
import schema from "./schema";
// import mongoose from 'mongoose';
import { getUser } from "./auth";
// import database from './database';
import multer from "koa-multer";

// init router and koa
const app = new koa();
const router = new route();
//init doenv
dotenv.load();

// middlewares
app.use(logger());
app.use(cors());
app.use(json());
app.use(bodyparser());
app.use(router.routes());
app.use(router.allowedMethods());

const graphqlSettingsPerReq = async (req: Request, ctx: Response) => {
  const { user } = await getUser(req.header.authorization);

  // const dataloaders = Object.keys(loaders).reduce(
  //   (acc, loaderKey) => ({
  //     ...acc,
  //     [loaderKey]: loaders[loaderKey].getLoader(),
  //   }),
  //   {},
  // );

  return {
    graphiql: true,
    schema,
    rootValue: {
      request: ctx.req
    },
    context: {
      user,
      req
      // dataloaders,
    }
  };
};

const graphqlServer = graphqlHTTP(graphqlSettingsPerReq);

const storage = multer.memoryStorage();
const limits = {
  // Increasing max upload size to 30 mb, since busboy default is only 1 mb
  fieldSize: 30 * 1024 * 1024
};

router.all("/graphql", multer({ storage, limits }).any(), graphqlServer);

// app.listen(process.env.PORT || 5000, () => {
//     return console.log(`SERVER ON: http://localhost:${process.env.PORT || 5000}/graphql`)
// })

export default app;
