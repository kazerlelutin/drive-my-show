/* eslint-disable react-hooks/exhaustive-deps */
import FullscreenModale from "../../FullscreenModale/FullscreenModale";
import classes from "./ColumnistToDeleteModale.module.css";
import useLazyFetch from "../../../hooks/useLazyFetch";
import useTranslate from "../../../hooks/useTranslate";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function ColumnistToDeleteModale({
  token,
  columnist,
  onClose,
  refetch,
}) {
  const { loading, data, api } = useLazyFetch("deleteColumnist"),
    t = useTranslate();

  function handleClick() {
    api({ token, columnist });
  }

  useEffect(() => {
    if (data) {
      toast.success(t("Columnist deleted !"));
      onClose();
      refetch();
    }
  }, [data]);

  return (
    <FullscreenModale>
      <div className={classes.container}>
        <p>
          {t("Delete")} {columnist.name} {"?"}
        </p>
        <p>
          {t(
            "All attached chronicles will be deleted. You can assign the chronicles before deleting the columnist."
          )}
        </p>
        <div className={classes.buttons}>
          <button
            disabled={loading}
            className="cancel"
            onClick={() => onClose()}
          >
            {t("Cancel")}
          </button>
          <button disabled={loading} onClick={handleClick}>
            {t("Delete")}
          </button>
        </div>
      </div>
    </FullscreenModale>
  );
}
