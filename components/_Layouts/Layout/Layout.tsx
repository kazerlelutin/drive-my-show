/* eslint-disable react-hooks/exhaustive-deps */
import Head from "next/head";
import { ReactChild, useEffect } from "react";
import classes from "./Layout.module.css";
import useTranslate from "../../../hooks/useTranslate";
import layoutTranslate from "./layout.translate";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dayjs from "dayjs";
import fr from "dayjs/locale/fr";
import en from "dayjs/locale/en";
import { useRouter } from "next/router";
import _ from "lodash";
import setLastShowesInLocalStorage from "../../../utils/setLastShowesInLocalStorage";
import Header from "../../Header/Header";

interface props {
  readonly children: ReactChild;
  readonly title?: string;
}

export default function Layout({ children, title }: props) {
  const t = useTranslate(layoutTranslate),
    { locale, query } = useRouter(),
    availableLocale = { fr, en };

  useEffect(() => {
    dayjs.locale(availableLocale[locale]);
  }, [locale]);

  useEffect(() => {
    if (query && query.type && query.token) {
      setLastShowesInLocalStorage(query);
    }
  }, [query]);

  return (
    <div className={classes.container}>
      <Head>
        <title>{title ? `${title} | ` : ""}{"Drive My Show"}</title>
        <meta
          name="description"
          content={t("Manage the conductor of your show.")}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={classes.mainContainer}>{children}</main>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}
