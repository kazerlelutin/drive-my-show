/* eslint-disable @next/next/no-img-element */
import classes from "./MediasForConductor.module.css";
import Chronicle from "../../interfaces/chronicle.interface";
import { useState } from "react";
import Media from "../../interfaces/medias.interface";
import useTranslate from "../../hooks/useTranslate";
import MediaPreview from "../MediaPreview/MediaPreview";
import ReactPlayer from "react-player";

interface props {
  readonly chronicle: Chronicle;
  readonly token: string;
  readonly disableErase?: boolean;
}

export default function MediasForConductor({
  chronicle,
  token,
  disableErase,
}: props) {
  const t = useTranslate(),
    [isOpen, setIsOpen] = useState<Media | "clear">(undefined);

  return (
    <div className={classes.container}>
      {isOpen && (
        <MediaPreview
          media={isOpen}
          token={token}
          onClose={() => setIsOpen(undefined)}
        />
      )}
      <div className={classes.medias}>
        {chronicle.medias.map((media) => (
          <div
            className={classes.media}
            key={media.id}
            onClick={() => setIsOpen(media)}
          >
            {media.type === "image" && (
              <img className={classes.img} src={media.link} alt={media.title} />
            )}
            {media.type === "video" && media.preview && (
              <img
                className={classes.img}
                src={media.preview}
                alt={media.title}
              />
            )}
            {media.type === "video" && !media.preview && (
              <ReactPlayer
                url={media.link}
                width={"100%"}
                height="120px"
                controls
              />
            )}
            <div className={classes.type}>{media.title}</div>
          </div>
        ))}
        {chronicle.medias.length > 0 && !disableErase && (
          <div className={classes.media} onClick={() => setIsOpen("clear")}>
            <div className={classes.mediaTitle}>{t("Clear slider")}</div>
            <div className={classes.type}>{t("special command")}</div>
          </div>
        )}
      </div>
    </div>
  );
}
