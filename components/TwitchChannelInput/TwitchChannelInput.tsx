import classes from "./TwitchChannelInput.module.css";
import { useState, useEffect } from "react";
import getTwitchChannel from "../../utils/getTwitchChannel";
import useTranslate from "../../hooks/useTranslate";
import setTwitchChannel from "../../utils/setTwitchChannel";

interface props {
  readonly channel: string;
  readonly setChannel: Function;
}
export default function TwitchChannelInput({ channel, setChannel }: props) {
  const [isInput, setIsInput] = useState<boolean>(!channel),
    [value, setValue] = useState<string>(channel),
    t = useTranslate();

  useEffect(() => {
    const channelName = getTwitchChannel();
    if (channelName) {
      setChannel(getTwitchChannel());
      setChannel(channelName);
      setIsInput(false);
    }
  }, [setChannel]);

  useEffect(() => {}, [channel]);

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    if (isInput) {
      if (value) {
        setChannel(value);
        setTwitchChannel(value);
      }

      setIsInput(false);
    } else {
      setIsInput(true);
    }
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
      <button type="submit">{t(isInput ? "edit" : "submit")}</button>
    </form>
  );
}
