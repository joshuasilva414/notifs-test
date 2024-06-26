"use client";

import { useState } from "react";
import useWebSocket, { useEventSource, ReadyState } from "react-use-websocket";

const notifsURL = "http://localhost:3001/notifs";

export default function MessageView() {
  const [messages, setMessages] = useState<string[]>([]);
  const { readyState } = useWebSocket(notifsURL, {
    onOpen: () => {
      console.log("Connection opened");
    },
    onMessage: (event) => {
      console.log(event.data);
      setMessages((prev) => [...prev, event.data]);
    },
    retryOnError: true,
  });

  const statusMap = {
    [ReadyState.CONNECTING]: "Connecting...",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing...",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  };

  return (
    <div>
      <h1>{statusMap[readyState]}</h1>
      {messages.map((message, index) => (
        <div key={index}>{message}</div>
      ))}
    </div>
  );
}
