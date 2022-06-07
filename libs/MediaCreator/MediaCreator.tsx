/* eslint-disable react-hooks/exhaustive-deps */
import FullscreenModale from "../FullscreenModale/FullscreenModale";
import classes from "./MediaCreator.module.css";
import { useState } from "react";
import MediaCreatorLinkTab from "./MediaCreatorLinkTab/MediaCreatorLinkTab";
import MediaCreatorGalleryLink from "./MediaCreatorGalleryLink/MediaCreatorGalleryLink";
import { mediaScrap } from "../../interfaces/mediaList";

interface props {
  readonly token: string;
  readonly onClose: Function;
  readonly setMedias: Function;
  readonly medias: Array<mediaScrap>;
}

export default function MediaCreator({
  token,
  onClose,
  setMedias,
  medias,
}: props) {
  const [tab, setTab] = useState<string>("link"),
    [mediasForSelect, setMediasForSelect] = useState<Array<mediaScrap>>([]);

  return (
    <FullscreenModale>
      <div className={classes.container} data-tab={tab}>
        {tab === "link" && (
          <MediaCreatorLinkTab
            setMediasForSelect={setMediasForSelect}
            setMedias={setMedias}
            medias={medias}
            token={token}
            onClose={onClose}
            setTab={setTab}
          />
        )}
        {tab === "gallery" && (
          <MediaCreatorGalleryLink
            onClose={onClose}
            mediasForSelect={mediasForSelect}
            medias={medias}
            setMedias={setMedias}
          />
        )}
      </div>
    </FullscreenModale>
  );
}
