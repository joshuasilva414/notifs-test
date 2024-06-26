#!/usr/bin/env node
import amqp from "amqplib/callback_api.js";

amqp.connect("amqp://localhost", (err0, conn) => {
  if (err0) {
    throw err0;
  }

  conn.createChannel((err1, ch) => {
    if (err1) {
      throw err1;
    }

    const queue = "notifs";
    const msg = "Ding!";

    ch.assertQueue(queue, { durable: true });
    ch.sendToQueue(queue, Buffer.from(msg), { persistent: true });

    console.log(" [x] Sent %s", msg);
  });
});
