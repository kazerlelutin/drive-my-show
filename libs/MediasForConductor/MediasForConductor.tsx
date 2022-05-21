import classes from "./MediasForConductor.module.css";
import Chronicle from "../../interfaces/chronicle.interface";
import { useState } from "react";
import Media from "../../interfaces/medias.interface";
import MediaCreator from "../MediaCreator/MediaCreator";
import useTranslate from "../../hooks/useTranslate";
import MediaModaleToDelete from "../MediaModaleToDelete/MediaModaleToDelete";
import MediaPreview from '../MediaPreview/MediaPreview';

interface props {
  readonly chronicle: Chronicle;
  readonly token: string;
}

export default function MediasForConductor({ chronicle, token }: props) {
  const t = useTranslate(),
    [isOpen, setIsOpen] = useState<Media|'clear'>(undefined);

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
          <div className={classes.media}  key={media.id} onClick={() => setIsOpen(media)}>
            <div className={classes.mediaTitle}>{media.title}</div>
            <div className={classes.type}>{media.type}</div>
          </div>
        ))}
        {chronicle.medias.length > 0 && <div className={classes.media} onClick={() => setIsOpen('clear')}>
            <div className={classes.mediaTitle}>{t('Clear slider')}</div>
            <div className={classes.type}>{t('special command')}</div>
          </div> }
      </div>
    </div>
  );
}
