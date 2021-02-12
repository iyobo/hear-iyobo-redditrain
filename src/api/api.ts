import {bootstrapControllers} from 'koa-ts-controllers';
import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import {UserController} from './controllers/UserController';

export async function launchAPI() {
  console.log('Launching Rest API...');

  const app = new Koa();
  const router = new Router();

  await bootstrapControllers(app, {
    router,
    basePath: '/api',
    controllers: [UserController], // It is recommended to add controllers classes directly to this array, but you can also add glob strings
    disableVersioning: true
  });

  app.use(bodyParser());
  app.use(router.routes());
  app.use(router.allowedMethods());

  // https://mikro-orm.io/docs/installation#request-context
  // app.use((ctx, next) => RequestContext.createAsync(orm.em, next));

  const port = process.env.PORT || 3000;
  app.listen(port);

  console.log(`API running on port ${port}!`)
}