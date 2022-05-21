/* eslint-disable react-hooks/exhaustive-deps */
import Media from "../../interfaces/medias.interface";
import FullscreenModale from "../FullscreenModale/FullscreenModale";
import classes from "./MediaModaleToDelete.module.css";
import useTranslate from "../../hooks/useTranslate";
import SubmitButton from "../SubmitButton/SubmitButton";
import useLazyFetch from "../../hooks/useLazyFetch";
import { useEffect } from "react";

interface props {
  readonly chronicleId: number;
  readonly media: Media;
  readonly token: string;
  readonly medias: Array<Media>;
  readonly onClose: Function;
  readonly setMedias: Function;
}

export default function MediaModaleToDelete({
  chronicleId,
  media,
  token,
  onClose,
  setMedias,
}) {
  const t = useTranslate(),
    { loading, data, fetch } = useLazyFetch("/deleteMedia");

  function handleClick() {
    fetch({
      chronicleId,
      id: media.id,
      token,
    });
  }
  useEffect(() => {
    if (data) {
      setMedias(data);
      onClose();
    }
  }, [data]);

  //TODO setMedias = media filter
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
