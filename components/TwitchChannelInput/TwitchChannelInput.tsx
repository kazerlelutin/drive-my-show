/* eslint-disable react-hooks/exhaustive-deps */
import classes from "./TwitchChannelInput.module.css";
import { useState, useEffect } from "react";
import getTwitchChannel from "../../utils/getTwitchChannel";
import useTranslate from "../../hooks/useTranslate";
import setTwitchChannel from "../../utils/setTwitchChannel";

interface props {
  readonly channel: string;
  readonly setChannel: Function;
  readonly setChannelReady: Function
}
export default function TwitchChannelInput({ channel, setChannel,setChannelReady }: props) {
  const [isInput, setIsInput] = useState<boolean>(!channel),
    [value, setValue] = useState<string>(channel),
    t = useTranslate();

  useEffect(() => {
    const channelName = getTwitchChannel();
    if (channelName) {
      setChannel(channelName);
      setValue(channelName);
      setIsInput(false);
      setChannelReady(true);
    }
  }, []);

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    setChannelReady(false);
    if (isInput) {
      if (value) {
        setChannel(value);
        setTwitchChannel(value);
      }
      setIsInput(false);
    } else {
      setIsInput(true);
    }
    setTimeout(()=>setChannelReady(true),100);
  }
  return (
    <form className={classes.container} onSubmit={handleSubmit}>
      {isInput ? (
        <input
          onChange={(e) => setValue(e.target.value)}
          value={value}
          placeholder={t("Twitch channel")}
        />
      ) : (
        <div className={classes.channel}>{channel}</div>
      )}
      <button type="submit">{t(isInput ? "submit":"edit" )}</button>
    </form>
  );
}
