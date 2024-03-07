import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import Queue from "./Queue/Queue";
dotenv.config();

const globalQueue = new Queue(10);

const app: Express = express();

app.set('view engine', 'ejs');

app.use(express.json())

const port = process.env.PORT || 3000;

let ejs = require('ejs');
app.get("/", (req: Request, res: Response) => {


  res.render("home", {queue: globalQueue});
});

app.get("/queue", (req: Request, res: Response) => {

  let body = req.body;

  globalQueue.enqueue(body.queueInput);
});

app.post("/queue", (req: Request, res: Response) => {
  let body = req.body;

  globalQueue.enqueue(body.queueInput);

  const numberOfItems = globalQueue.length();
  const capacity = globalQueue.getCapacity();

  const msg = "Queue has " + numberOfItems + " from " + capacity;

  res.send(msg);
});

app.post("/dequeue", (req: Request, res: Response) => {
  const dequeuedItem = globalQueue.dequeue();

  const msg = "Received: " + dequeuedItem;

  res.send(msg);
});

app.get("/peek", (req: Request, res: Response) => {
  const param = req.query;
  // const indexNumber : Number = param.indexNumber;
  // const peekedItem = globalQueue.peek(param.indexNumber);

  const msg = "Received: ";

  res.send(msg);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
