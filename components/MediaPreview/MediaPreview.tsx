/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import ReactPlayer from "react-player";
import FullscreenModale from "../FullscreenModale/FullscreenModale";
import classes from "./MediaPreview.module.css";
import useTranslate from "../../hooks/useTranslate";
import useLazyFetch from "../../hooks/useLazyFetch";
import { useEffect } from "react";
import { toast } from "react-toastify";
import Media from "../../interfaces/medias.interface";

interface props {
  readonly media: Media | "clear";
  readonly token: string;
  readonly onClose: Function;
}
export default function MediaPreview({ media, token, onClose }: props) {
  const t = useTranslate(),
    { data, loading, api } = useLazyFetch("/broadcast");

  function handleClick() {
    api({ token, media });
  }

  useEffect(() => {
    if (data) {
      toast.success(t("Media sended to slider !"));
      onClose();
    }
  }, [data]);

  return (
    <FullscreenModale>
      <div className={classes.container}>
        {media === "clear" ? (
          <div className={classes.message}>{t("Clear slider ?")}</div>
        ) : (
          <div className={classes.media}>
            {media.type === "image" && (
              <img
                className={classes.image}
                src={media.link}
                alt={media.title}
              />
            )}
            {media.type === "video" && (
              <ReactPlayer
                url={media.link}
                controls={false}
                volume={0}
                loop={true}
                playing={true}
                width={"100%"}
                height={175}
              />
            )}
          </div>
        )}
        <div className={classes.buttons}>
          <button onClick={() => onClose()}>{t("Close")}</button>
          <button disabled={loading} onClick={handleClick}>
            {loading ? "..." : t("Broadcast")}
          </button>
        </div>
      </div>
    </FullscreenModale>
  );
}
