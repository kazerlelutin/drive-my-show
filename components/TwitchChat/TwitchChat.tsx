import classes from "./TwitchChat.module.css";
import TwitchChannelInput from "../TwitchChannelInput/TwitchChannelInput";
import { useState } from "react";
import TwitchMessages from "../TwitchMessages/TwitchMessages";

interface props {
  readonly token: string;
}
export default function TwitchChat({ token }: props) {
  const [channel, setChannel] = useState<string>("");

  return (
    <div className={classes.container}>
      <TwitchChannelInput channel={channel} setChannel={setChannel} />
        <div className={classes.chat}>
          <TwitchMessages channel={channel} token={token} />
        </div>
      <input />
    </div>
  );
}
