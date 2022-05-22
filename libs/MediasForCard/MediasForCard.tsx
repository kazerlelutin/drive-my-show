import classes from "./MediasForCard.module.css";
import Chronicle from "../../interfaces/chronicle.interface";
import { useState } from "react";
import Media from "../../interfaces/medias.interface";
import MediaCreator from "../MediaCreator/MediaCreator";
import useTranslate from "../../hooks/useTranslate";
import MediaModaleToDelete from "../MediaModaleToDelete/MediaModaleToDelete";
import MediasTitleForBroadcast from "./MediasTitleForBroadcast";

interface props {
  readonly chronicle: Chronicle;
  readonly token: string;
}

export default function MediasForCard({ chronicle, token }: props) {
  const t = useTranslate(),
    [medias, setMedias] = useState<Array<Media>>(chronicle.medias),
    [isOpen, setIsOpen] = useState<boolean>(false),
    [isOpenToDelete, setIsOpenToDelete] = useState<Media|undefined>(undefined);

  return (
    <div className={classes.container}>
      {isOpen && (
        <MediaCreator
          setMedias={setMedias}
          token={token}
          chronicleId={chronicle.id}
          onClose={() => setIsOpen(false)}
        />
      )}
      {isOpenToDelete && (
        <MediaModaleToDelete
          setMedias={setMedias}
          token={token}
          media={isOpenToDelete}
          chronicleId={chronicle.id}
          onClose={() => setIsOpenToDelete(undefined)}
        />
      )}
      <div className={classes.title}>Medias: </div>
      <div className={classes.medias}>
        {medias.map((media) => (
          <div className={classes.media}  key={media.id} >
            <div className={classes.mediaTitle}><MediasTitleForBroadcast media={media} token={token}/></div>
            <div className={classes.type}>{media.type}</div>
            <div className={classes.delete} onClick={()=>setIsOpenToDelete(media)}>{t('Delete')}</div>
          </div>
        ))}
        <div className={classes.empty} onClick={() => setIsOpen(true)}>
          <div className={classes.cross} />
        </div>
      </div>
    </div>
  );
}
