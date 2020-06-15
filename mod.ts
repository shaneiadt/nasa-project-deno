import { Application } from "https://deno.land/x/oak@v4.0.0/mod.ts";

const app = new Application();
const port: number = 3333;

app.use((ctx) => {
  ctx.response.body = 'Hello From Oak';
});

console.log('running on port ', port);
await app.listen({ port });