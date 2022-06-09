/* eslint-disable react-hooks/exhaustive-deps */
import classes from "./DeleteShowButton.module.css";
import { useState, useEffect } from "react";
import FullscreenModale from "../FullscreenModale/FullscreenModale";
import useTranslate from "../../hooks/useTranslate";
import useLazyFetch from "../../hooks/useLazyFetch";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

interface props {
  readonly token: string;
}
export default function DeleteShowButton({ token }: props) {
  const { data, loading, api } = useLazyFetch("/deleteShow"),
    router = useRouter(),
    [isOpen, setIsOpen] = useState(false),
    t = useTranslate();

  function handleDelete() {
    api({ token });
  }

  useEffect(() => {
    if (data) {
      toast.success(t("Conductor deleted"));
      router.push("/");
    }
  }, [data]);
  return (
    <>
      {isOpen && (
        <FullscreenModale>
          <div className={classes.modale}>
            <div className={classes.title}>
              {t("Are you sure you want to delete this conductor ?")}
            </div>
            <div className={classes.buttons}>
              <button disabled={loading} onClick={() => setIsOpen(false)}>
                {t("Cancel")}
              </button>
              <button
                disabled={loading}
                className="danger"
                onClick={handleDelete}
              >
                {t("delete")}
              </button>
            </div>
          </div>
        </FullscreenModale>
      )}
      <button className="danger" onClick={() => setIsOpen(true)}>
        {t("delete")}
      </button>
    </>
  );
}
