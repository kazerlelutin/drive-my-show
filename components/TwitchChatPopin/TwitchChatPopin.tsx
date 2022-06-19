/* eslint-disable react-hooks/exhaustive-deps */
import TwitchConnectButton from "../TwitchConnectButton/TwitchConnectButton";
import Tablet from "../_UI/Tablet/Tablet";
import classes from "./TwitchChatPopin.module.css";
import getTwitchAuthToken from "../../utils/getTwitchAuthToken";
import useLazyFetch from "../../hooks/useLazyFetch";
import setTwitchAuthToken from "../../utils/setTwitchAuthToken";
import { useEffect } from "react";
import TwitchChat from "../TwitchChat/TwitchChat";

interface props {
  readonly setCurrent: Function;
  readonly current: string;
}

export default function TwitchChatPopin({ setCurrent, current }: props) {
  const { data, loading, error, api } = useLazyFetch("/twitch/validate");

  useEffect(() => {
    api({ token: getTwitchAuthToken() });
  }, []);

  useEffect(() => {
    if (error) {
      setTwitchAuthToken("");
    }
  }, [error]);

  return (
    <Tablet
      img="/twitch.webp"
      setCurrent={setCurrent}
      current={current}
      name={"twitchChat"}
    >
      <div className={classes.container}>
        {!data ? <TwitchConnectButton /> :<TwitchChat token={getTwitchAuthToken()}/>}
        </div>
    </Tablet>
  );
}
