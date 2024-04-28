import express, { Request, Response, Express } from "express";

const app: Express = express();

app.get("/", (res: Response, req: Request) => {
  res.send("Hello World!");
});

app.listen(3002, () => {
  console.log("Example app listening on port 3002!");
});
