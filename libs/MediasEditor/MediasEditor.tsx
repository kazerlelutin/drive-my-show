import classes from './MediasEditor.module.css';
import Chronicle from '../../interfaces/chronicle.interface';
import { useState } from 'react';
import Media from '../../interfaces/medias.interface';
import MediaCreator from '../MediaCreator/MediaCreator';
import useTranslate from '../../hooks/useTranslate';
import MediaModaleToDelete from '../MediaModaleToDelete/MediaModaleToDelete';
import ReactPlayer from 'react-player';

interface props {
  readonly chronicle?: Chronicle;
  readonly token: string;
  readonly medias: Array<any>;
  readonly sendMedias: Function;
}

export default function MediasEditor({ token, sendMedias, medias }: props) {
  const t = useTranslate(),
    [isOpen, setIsOpen] = useState<boolean>(false),
    [isOpenToDelete, setIsOpenToDelete] = useState<Media | undefined>(
      undefined
    );

    console.log(medias)

  return (
    <div className={classes.container}>
      {isOpen && (
        <MediaCreator
          setMedias={sendMedias}
          medias={medias}
          token={token}
          onClose={() => setIsOpen(false)}
        />
      )}
      {isOpenToDelete && (
        <MediaModaleToDelete
          setMedias={sendMedias}
          medias={medias}
          media={isOpenToDelete}
          onClose={() => setIsOpenToDelete(undefined)}
        />
      )}
      <div className={classes.title}>Medias: </div>
      <div className={classes.medias}>
        {medias.map((media) => (
          <div className={classes.media} key={media.id}>
            {media.type === 'image' && (
              <img className={classes.img} src={media.link} />
            )}
            {media.type === 'video' && (
              <ReactPlayer
                url={media.link}
                width={'100%'}
                height="80px"
                controls
              />
            )}
            <div
              className={classes.delete}
              onClick={() => setIsOpenToDelete(media)}
            >
              {t('Delete')}
            </div>
          </div>
        ))}
        <div className={classes.empty} onClick={() => setIsOpen(true)}>
          <div className={classes.cross} />
        </div>
      </div>
    </div>
  );
}
