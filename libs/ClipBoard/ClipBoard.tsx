import { useRef, useState } from "react";
import classes from "./ClipBoard.module.css";
import useTranslate from '../../hooks/useTranslate';
import ClipBoardTranslate from './ClipBoard.translate';

interface props {
  readonly txt: string;
  readonly typeTxt: "text" | "input";
  readonly label?: string;
}
export default function ClipBoard({ txt, typeTxt, label = null }: props) {
  const 
    t = useTranslate(ClipBoardTranslate),
    refInput = useRef(null),
    [msg, setMsg] = useState(null);

  function handleClick() {
    refInput.current.type = "text";
    refInput.current.select();
    try {
      navigator.clipboard.writeText(txt);
      setMsg(t("Copy in clipboard"));
    } catch (err) {
      setMsg(t("Oops, impossible to copy"));
    }

    refInput.current.type = "hidden";

    window.getSelection().removeAllRanges();
    setTimeout(() => setMsg(null), 2000);
  }

  return (
    <div className={classes.container} data-copy={!!msg}>
      {label && <label className={classes.label}>{label}</label>}
      {typeTxt === "input" && (
        <input className={classes.input} value={msg || txt} readOnly />
      )}
      {(typeTxt === "text" || !typeTxt) && (
        <span className={classes.txt}>{msg || txt}</span>
      )}
      <div
        onClick={handleClick}
        title={t("Copier dans le presse papier")}
        className={classes.memo}
      />
      <input type="hidden" ref={refInput} value={txt} readOnly />
    </div>
  );
}
