/* eslint-disable react-hooks/exhaustive-deps */
import classes from "./LayoutConductorManager.module.css";
import { ReactChild, useEffect } from 'react';
import useTranslate from "../../hooks/useTranslate";
import LayoutConductorManagerTranslate from "./LayoutConductorManager.translate";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Error from "../../interfaces/error.interface";

interface props {
  readonly loading: boolean;
  readonly error: Error;
  readonly children: ReactChild;
}
export default function LayoutConductorManager({
  error,
  loading,
  children,
}: props) {
  const t = useTranslate(LayoutConductorManagerTranslate),
  router = useRouter();

  useEffect(() => {
    if (error && error.response.status === 404) {
      setTimeout(() => toast.error(t("Conductor not exist.")), 1000);
      router.push("/");
    }
  }, [error]);

  return (
    <div className={classes.container}>
      {loading ? (
        <div className={classes.loading}>{t("Loading...")}</div>
      ) : (
        <div className={classes.page}>{children}</div>
      )}
    </div>
  );
}
