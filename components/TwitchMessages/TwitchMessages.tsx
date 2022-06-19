/* eslint-disable react-hooks/exhaustive-deps */
import classes from "./TwitchMessages.module.css";
import { useEffect, useRef, useState } from "react";
import tmi from "tmi.js";
import { v4 as uuidv4 } from "uuid";
import { map } from "lodash";

interface props {
  readonly token: string;
  readonly channel: string;
}
export default function TwitchMessages({ token, channel }: props) {
  const ref = useRef(null),
    [messages, setMessages] = useState<
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
          let newMsg = message;
          const id = uuidv4(),
            emotes = tags.emotes ? Object.keys(tags.emotes) : [];

          emotes.forEach((o) => {
            tags.emotes[o].forEach((position: string) => {
              const splitPosition = position.split("-");
              const emoteWord = newMsg.slice(
                parseInt(splitPosition[0]),
                parseInt(splitPosition[1])
              );
              newMsg = newMsg.replace(emoteWord, " " + o + " ");
            });
          });

          const splitMsg = newMsg.split(" ");
          messages.splice(0, 0, {
            username: tags.username,
            message: splitMsg
              .map((word) => {
                if (word.match(/http|www/)) {
                  return "**link**";
                }

                const isEmote = emotes.find((o) => o.includes(word));
                if (isEmote) {
                  return `<img class="emoticon" src="http://static-cdn.jtvnw.net/emoticons/v1/${isEmote}/3.0">`;
                }

                return word;
              })
              .join(" "),
            id,
          });

          setMessages(messages.slice(0, 25));
        }
      );
    }
  }

  useEffect(() => {
    if (ref !== undefined) {
      ref.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className={classes.container}>
      <div className={classes.messages} ref={ref}>
        {messages.map((msg) => (
          <div key={msg.id} className={classes.message}>
            <div className={classes.name}>{msg.username}</div>
            <div
              className={classes.msg}
              dangerouslySetInnerHTML={{ __html: msg.message }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
