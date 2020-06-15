import { Application, send } from "https://deno.land/x/oak@v4.0.0/mod.ts";

const app = new Application();
const port: number = 3333;

app.use(async (ctx, next) => {
  await next();
  const time = ctx.response.headers.get('X-Response-Time');
  console.log(`${ctx.request.method} ${ctx.request.url}: ${time}`);
});

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const delta = Date.now() - start;

  ctx.response.headers.set('X-Response-Time', `${delta}ms`);
});

app.use(async (ctx) => {
  const filePath = ctx.request.url.pathname;
  const fileWhiteList = [
    '/index.html',
    '/javascripts/script.js',
    '/images/favicon.png',
    '/stylesheets/style.css'
  ];

  if(fileWhiteList.includes(filePath)){
    await send(ctx, filePath, {
      root: `${Deno.cwd()}/public`,
    });
  }
});

if (import.meta.main) {
  console.log(`Server running on: http://localhost:${port}`);
  await app.listen({ port });
}