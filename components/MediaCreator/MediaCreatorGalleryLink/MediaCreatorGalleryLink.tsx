/* eslint-disable @next/next/no-img-element */
import { mediaScrap } from '../../../interfaces/mediaList';
import classes from './MediaCreatorGalleryLink.module.css';
import { useState } from 'react';
import ReactPlayer from 'react-player';
import useTranslate from '../../../hooks/useTranslate';
import SubmitButton from '../../_UI/SubmitButton/SubmitButton';
import getMediasLimit from '../../../utils/getMediasLimit';
import { toast } from 'react-toastify';

interface props {
  readonly onClose: Function;
  readonly setMedias: Function;
  readonly medias: Array<mediaScrap>;
  readonly mediasForSelect: Array<mediaScrap>;
}

export default function MediaCreatorGalleryLink({
  medias,
  onClose,
  setMedias,
  mediasForSelect,
}: props) {
  const t = useTranslate(),
    [selected, setSelected] = useState<Array<mediaScrap>>([]);

  function selectItem(item: mediaScrap) {
    const isSelect = selected.find((o) => o.link === item.link);
    if (isSelect) {
      setSelected(selected.filter((o) => o.link !== item.link));
    } else if (selected.length + medias.length + 1 >= getMediasLimit()) {
      return toast.warning(t("You can't create more media."));
    } else {
      setSelected([...selected, item]);
    }
  }

  function handleSubmit() {
    setMedias([
      ...medias,
      ...selected.map((o, index) => ({
        ...o,
        title: o.title || `#${o.type}-${index + 1}`,
        position: index,
      })),
    ]);
    onClose();
  }
  return (
    <div className={classes.container}>
      <div className={classes.mediasContainer}>
        <div className={classes.medias}>
          {mediasForSelect.map((media) => (
            <div
              className={classes.media}
              key={media.link}
              onClick={() => selectItem(media)}
            >
              <div className={classes.checkbox}>
                <div
                  className="checkbox"
                  data-checked={!!selected.find((o) => o.link === media.link)}
                />
              </div>
              {media.type === 'image' && (
                <img
                  className={classes.img}
                  src={media.link}
                  alt={media.title}
                />
              )}
              {media.type === 'video' && media.preview && (
                <img
                  className={classes.img}
                  src={media.preview}
                  alt={media.title}
                />
              )}
              {media.type === 'video' && !media.preview && (
                <ReactPlayer
                  url={media.link}
                  width={'100%'}
                  height="120px"
                  controls
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className={classes.buttons}>
        <button onClick={() => onClose()} type="reset">cancel</button>
        <button
          onClick={() =>
            setSelected(selected.length === medias.length ? [] : medias)
          }
        >
          {t(selected.length === medias.length ? 'Unselect all' : 'Select all')}
        </button>
        <span onClick={handleSubmit}>
          <SubmitButton
            txt={`${t('Submit')} (${selected.length})`}
            isLoading={false}
          />
        </span>
      </div>
    </div>
  );
}
