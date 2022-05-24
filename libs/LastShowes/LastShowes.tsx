/* eslint-disable react-hooks/exhaustive-deps */
import classes from "./LastShowes.module.css";
import getLastShowesInLocalStorage from "../../utils/getLastShowesInLocalStorage";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useTranslate from "../../hooks/useTranslate";
import Link from "next/link";

export default function LastShowes() {
  const [showes, setShowes] = useState([]),
    t = useTranslate(),
    handleFetch = () =>
      new Promise(async (resolve) => {
        const { data } = await axios.post(
          "/api/getLastShowes",
          getLastShowesInLocalStorage()
        );
        setShowes(data);
        resolve(true);
      });

  useEffect(() => {
    if(getLastShowesInLocalStorage().length > 0){
      toast.promise(handleFetch, {
        pending: t("Search for recent conductors..."),
      });
    }

  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.title}>{t("Recent conductors")}</div>
      {showes &&
        showes.map((show) => (
          <Link href={`/${show.type}/${show.token}`} key={show.token}>
            {show.title}
          </Link>
        ))}
    </div>
  );
}
