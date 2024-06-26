import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { createClient } from "redis";
import { createNodeWebSocket } from "@hono/node-ws";

const app = new Hono();

const { upgradeWebSocket, injectWebSocket } = createNodeWebSocket({ app });

const redisURL = process.env.REDIS_URL;
const redisClient = createClient({ url: redisURL });
await redisClient.connect();
redisClient.on("close", () => {
  console.log("Redis connection closed");
});
console.log("Redis connection opened");

app.get(
  "/notifs",
  upgradeWebSocket(() => {
    return {
      onOpen: async (e, ws) => {
        console.log("Connection opened");
        redisClient.subscribe("app:notifs", (message) => {
          ws.send(message);
          console.log(message);
        });
      },
    };
  }),
);
const port = 3001;
console.log(`Server is running on port ${port}`);

const server = serve({
  fetch: app.fetch,
  port,
});

injectWebSocket(server);
