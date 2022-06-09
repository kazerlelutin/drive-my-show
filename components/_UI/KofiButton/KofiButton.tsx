import Image from "next/image";
import classes from "./KofiButton.module.css";
import useTranslate from "../../../hooks/useTranslate";

export default function KofiButton() {
  const t = useTranslate();
  return (
    <a
      className={classes.coffe}
      href="https://ko-fi.com/kazerlelutin"
      target="_blank"
      rel="noreferrer"
    >
      <div className={classes.buy}>{t("Buy me a coffee")}</div>
      <Image src="/kofi_logo.svg" width={30} height={20} alt="kofi logo" />
    </a>
  );
}
