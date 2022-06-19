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
  const [messages, setMessages] = useState<
    Array<{ username: string; message: string; id: string }>
  >([]);

  useEffect(() => {
    connect();
  }, [token, channel]);

  async function connect() {
    if (channel && token) {
      const client = new tmi.Client({
        identity: {
          username: "dms",
          password: "oauth:" + token,
        },
        channels: [channel],
      });

      await client.connect();
      client.on(
        "message",
        (_channel: string, tags: any, message: string, _self: boolean) => {
          const id = uuidv4();

          messages.splice(0,0,{ username: tags.username, message, id });
          setMessages(messages.slice(0,25));
        }
      );
    }
  }

  useEffect(()=>{

    const element = document.getElementById("messages");
    element.scrollTop = element.scrollHeight;

  },[messages])

  return (
    <div className={classes.container}>
      <div className={classes.messages} id="messages" >
        {messages.map((msg) => (
          <div key={msg.id} className={classes.message} id={msg.id}>
            <span className={classes.name}>{msg.username}</span>
            <span className={classes.msg}>{msg.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
