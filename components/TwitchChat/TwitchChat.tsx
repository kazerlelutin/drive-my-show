import classes from "./TwitchChat.module.css";
import TwitchChannelInput from "../TwitchChannelInput/TwitchChannelInput";
import { useState } from "react";
import TwitchMessages from "../TwitchMessages/TwitchMessages";

interface props {
  readonly token: string;
}
export default function TwitchChat({ token }: props) {
  const 
    [channelReady, setChannelReady] = useState<boolean>(false),
    [channel, setChannel] = useState<string>("");

  return (
    <div className={classes.container}>
      <TwitchChannelInput channel={channel} setChannel={setChannel} setChannelReady={setChannelReady}/>
        <div className={classes.chat}>
        {channelReady && <TwitchMessages channel={channel} token={token} /> }
        </div>
      <input />
    </div>
  );
}
