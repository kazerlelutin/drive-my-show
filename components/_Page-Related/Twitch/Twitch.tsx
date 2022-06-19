/* eslint-disable react-hooks/exhaustive-deps */
import classes from "./Twitch.module.css";
import { useRouter } from "next/router";
import useTranslate from "../../../hooks/useTranslate";
import { useEffect } from "react";
import setTwitchAuthToken from "../../../utils/setTwitchAuthToken";
import getLastShowesInLocalStorage from "../../../utils/getLastShowesInLocalStorage";

export default function Twitch() {
  const { asPath, push,locale } = useRouter(),
    t = useTranslate();

  useEffect(() => {
    getToken();
  }, []);

  async function getToken() {
    const extractToken = asPath
      .replace("/twitch#access_token=", "")
      .split("&")[0];
    setTwitchAuthToken(extractToken);
    const lastShow = getLastShowesInLocalStorage().find((o) => !!o.current);
    if (lastShow) push(`/${locale}/${lastShow.type}/${lastShow.token}`);
  }

  return <div className={classes.container}>{t("Loading")}</div>;
}
