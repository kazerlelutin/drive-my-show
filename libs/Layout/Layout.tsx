/* eslint-disable react-hooks/exhaustive-deps */
import Head from "next/head";
import { ReactChild, useEffect } from "react";
import classes from "./Layout.module.css";
import useTranslate from "../../hooks/useTranslate";
import layoutTranslate from "./layout.translate";
import Image from "next/image";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dayjs from "dayjs";
import fr from "dayjs/locale/fr";
import en from "dayjs/locale/en";
import { useRouter } from "next/router";
import Link from "next/link";
import _ from "lodash";
import MenuHeader from "../MenuHeader/MenuHeader";
import setLastShowesInLocalStorage from "../../utils/setLastShowesInLocalStorage";
interface props {
  readonly children: ReactChild;
  readonly title?: string;
}

export default function Layout({ children, title }: props) {
  const t = useTranslate(layoutTranslate),
    { locale,query } = useRouter(),
    availableLocale = { fr, en };

  useEffect(() => {
    dayjs.locale(availableLocale[locale]);
  }, [locale]);

  useEffect(() => {
    if(query && query.type && query.token){
      setLastShowesInLocalStorage(query);
    }
  }, [query]);

  return (
    <div className={classes.container}>
      <Head>
        <title>{title ? `${title} | ` : ""}Drive My Show</title>
        <meta
          name="description"
          content={t("Manage the conductor of your show.")}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={classes.header}>
        <div className={classes.logo}>
          <Link href="/" passHref>
            <a>
              <Image src="/dms_logo.svg" width={25} height={25} alt="Logo" />
            </a>
          </Link>
        </div>
        <MenuHeader />
        <a
          className={classes.coffe}
          href="https://ko-fi.com/kazerlelutin"
          target="_blank"
          rel="noreferrer"
        >
          <div className={classes.buy}>Buy me a coffee</div>
          <Image src="/kofi_logo.svg" width={30} height={20} alt="kofi logo" />
        </a>
      </header>
      <main className={classes.main}>{children}</main>
      <footer className={classes.footer}>
        Powerd By me - Mentions légales - Cookies ?
      </footer>
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
