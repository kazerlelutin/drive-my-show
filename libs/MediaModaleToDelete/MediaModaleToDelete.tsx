/* eslint-disable react-hooks/exhaustive-deps */
import Media from "../../interfaces/medias.interface";
import FullscreenModale from "../FullscreenModale/FullscreenModale";
import classes from "./MediaModaleToDelete.module.css";
import useTranslate from "../../hooks/useTranslate";
import SubmitButton from "../SubmitButton/SubmitButton";
import useLazyFetch from "../../hooks/useLazyFetch";
import { useEffect } from "react";

interface props {
  readonly media: Media;
  readonly medias: Array<Media>;
  readonly onClose: Function;
  readonly setMedias: Function;
}

export default function MediaModaleToDelete({
  media,
  onClose,
  medias,
  setMedias,
}: props) {
  const t = useTranslate(),
    { loading, data, api } = useLazyFetch("/deleteMedia");

  function handleClick() {
    setMedias(medias.filter((o) => o.link !== media.link));
    onClose();
  }

  useEffect(() => {
    if (data) {
      setMedias(data);
      onClose();
    }
  }, [data]);

  return (
    <FullscreenModale>
      <div className={classes.container}>
        {t("Are you sure to delete")} {media.title}
        {"?"}
        <div className={classes.buttons}>
          <button className="cancel" onClick={() => onClose()}>
            {t("Cancel")}
          </button>
          <div onClick={handleClick}>
            <SubmitButton isLoading={loading} txt={"Delete"} />
          </div>
        </div>
      </div>
    </FullscreenModale>
  );
}
