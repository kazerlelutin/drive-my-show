/* eslint-disable react-hooks/exhaustive-deps */
import FullscreenModale from "../FullscreenModale/FullscreenModale";
import classes from "./ChronicleDeleteModale.module.css";
import useTranslate from "../../hooks/useTranslate";
import pageTranslate from "../../translate/page.translate";
import useLazyFetch from "../../hooks/useLazyFetch";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from 'next/router';

interface props {
  readonly id: number;
  readonly title: string;
  readonly onClose: Function;
  readonly refetch: Function
}
export default function ChronicleDeleteModale({ id, title, onClose,refetch }: props) {
  const { loading, data, error, fetch } = useLazyFetch("/deleteChronicle"),
  {query}= useRouter(),
    t = useTranslate(pageTranslate);

  useEffect(() => {
    if (data) {
      toast.success("Chronicle deleted");
      onClose();
      refetch()
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <FullscreenModale>
      <div className={classes.container}>
        {t("Delete the chronicle")} {`"${title}"`}
        <div className={classes.buttons}>
          <button disabled={loading} onClick={() => onClose()} className="cancel">
            {t("Cancel")}
          </button>
          <button disabled={loading} onClick={() => fetch({ id,token: query.token })}>{t("Delete")}</button>
        </div>
      </div>
    </FullscreenModale>
  );
}
