/* eslint-disable react-hooks/exhaustive-deps */
import classes from "./TwitchMessages.module.css";
import { useEffect, useState } from "react";
import tmi from "tmi.js";
import { v4 as uuidv4 } from "uuid";

interface props {
  readonly token: string;
  readonly channel: string;
}
export default function TwitchMessages({ token, channel }: props) {
  const [client, setClient] = useState<any>(),
    [messages, setMessages] = useState<
      Array<{ username: string; message: string; id: string }>
    >([]);

  useEffect(() => {
    connect()
    return ()=>{
        if(client) client.disconnect();
    }
  }, [channel, token]);

  useEffect(() => {
    connect()
    return ()=>{
        if(client) client.disconnect();
    }
  }, []);

  async function connect() {
    if (channel && token) {
      setClient(
        await new tmi.Client({
          identity: {
            username: "dms",
            password: "oauth:" + token,
          },
          channels: [channel],
        })
      );

      if (client) {
        await client.connect();
        client.on(
          "message",
          (_channel: string, tags: any, message: string, self: boolean) => {
            // Ignore echoed messages.
            console.log(message);
            if (self) return;
            const id = uuidv4();
            setMessages([
              ...messages.filter((o) => o.id !== id),
              { username: tags.username, message, id },
            ]);

            console.log(messages);
          }
        );
      }
    }
  }

  return (
    <div className={classes.container}>
      <div className={classes.messages}>
        {messages.map((msg) => (
          <div key={msg.id}>
            <span className="d">{msg.username}</span>
            <span className="d">{msg.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
