import Image from "next/image";
import Link from "next/link";
import classes from "./Logo.module.css";
import useTranslate from "../../hooks/useTranslate";
import { LogoTranslate } from "./Logo.translate";

export default function Logo() {
  const t = useTranslate(LogoTranslate);
  return (
    <div className={classes.logo}>
      <Link href="/" passHref>
        <a title={t("Return to homepage")}>
          <Image src="/dms_logo.svg" width={25} height={25} alt="Logo" />
        </a>
      </Link>
    </div>
  );
}
