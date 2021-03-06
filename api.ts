import { Router } from './deps.ts';
import * as planets from './models/planets.ts';
import * as launches from './models/launches.ts';

const router = new Router();

router.get("/", (ctx) => {
  ctx.response.body = "NASA - Mission Control API";
});

router.get('/planets', (ctx) => {
  ctx.response.body = planets.getAllPlanets();
});

router.get('/launches', (ctx) => {
  ctx.response.body = launches.getAll()
});

router.get('/launches/:id', (ctx) => {
  if (ctx.params?.id) {
    ctx.response.body = launches.getById(Number(ctx.params.id));
  } else {
    ctx.throw(404, "Launch Doe Not Exist");
  }
});

router.post('/launches', async (ctx) => {
  const body = await ctx.request.body();

  launches.addOne(body.value);

  ctx.response.body = { success: true };
  ctx.response.status = 201;
});

router.delete('/launches/:id', async (ctx) => {
  if (ctx.params?.id) {
    ctx.response.body = { success: launches.removeOne(Number(ctx.params.id)) };
  } else {
    ctx.throw(404, "Launch Doe Not Exist");
  }
});

export default router;