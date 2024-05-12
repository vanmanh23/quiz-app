import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { router as categories } from './modules/categories.controler';

const app = new Hono().basePath('/api');

app.use("*", logger());
app.use(
  "*",
  cors({
    origin: [
      "http://localhost:3000",
      "https://quiz-app-server-chi.vercel.app"
    ],
    credentials: true,
  }),
);

app.route("/categories", categories);
app.get('/', (c) => {
  try{
    return c.text('Hello Hono!')
  }catch(err){
    console.log(err);
  } 
  return c.text('Hello Hono2!')
})

// const port = 3000
// console.log(`Server is running on port ${port}`)

serve(app, () => {
  console.log('Server is running on http://localhost:3000');
});
