import Koa from 'koa';
import Router from 'koa-router';
import Logger from 'koa-logger';
import BodyParser from 'koa-bodyparser';
import Cors from '@koa/cors';
import routeRegister from './app/routes';
import passport from 'koa-passport';
import dotenv from 'dotenv';
import { authStrategyRegister } from './app/auth';

dotenv.config();

const app = new Koa();
const router = new Router();
const logger = new Logger();
const bodyParser = new BodyParser();

app.use(logger);
app.use(bodyParser);
app.use(Cors());
app.use(passport.initialize());

authStrategyRegister(passport);
routeRegister(router, passport);

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000);
