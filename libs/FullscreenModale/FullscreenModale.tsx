import classes from "./FullscreenModale.module.css";
import { ReactChild } from "react";

interface props {
  children: ReactChild;
}
export default function FullscreenModale({ children }: props) {
  return (
    <div className={classes.container}>
      <div className={classes.modale}>{children}</div>
    </div>
  );
}
