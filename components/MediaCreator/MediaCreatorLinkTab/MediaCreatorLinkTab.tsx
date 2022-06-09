import { SyntheticEvent, useState } from "react";
import useTranslate from "../../../hooks/useTranslate";
import classes from "./MediaCreatorLinkTab.module.css";
import queryString from "query-string";
import axios from "axios";
import SubmitButton from "../../_UI/SubmitButton/SubmitButton";
import MediaCreatorLinkTabTranslate from "./MediaCreatorLinkTag.translate";
import { mediaScrap } from "../../../interfaces/mediaList";

interface props {
  readonly token: string;
  readonly onClose: Function;
  readonly setTab: Function;
  readonly setMedias: Function;
  readonly setMediasForSelect: Function;
  readonly medias: Array<mediaScrap>;
}

export default function MediaCreatorLinkTab({
  token,
  onClose,
  setTab,
  setMedias,
  setMediasForSelect,
  medias,
}: props) {
  const t = useTranslate(MediaCreatorLinkTabTranslate),
    [link, setLink] = useState<string>(""),
    [isLoading, setIsLoading] = useState<boolean>(false);

  async function getVideoYoutube(url: string) {
    const params = url.split("?");
    let videoLink: string;
    if (params.length > 1) {
      const { t, v } = queryString.parse(params[1]);
      videoLink = `https://www.youtube.com/watch?v=${v}&t=${t || 0}`;
    } else if (url.match(/(youtu.be)/)) {
      const splitLink = url.split("/");
      videoLink =
        "https://www.youtube.com/watch?v=" + splitLink[splitLink.length - 1];
    }

    const { data } = await axios.post("/api/scrapVideoYoutube", {
      token,
      link: videoLink,
    });
    return data;
  }

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    //test if img
    setIsLoading(true);
    const isVideoYoutube = link.match(/(youtu|youtube)/);

    if (isVideoYoutube) {
      const data = await getVideoYoutube(link);
      setMedias([...medias, data]);
      onClose();
      return;
    }

    const testImg = new Promise((resolve) => {
        const img = new Image();
        img.src = link;
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
      }),
      isImg = await testImg;

    if (isImg) {
      const linkArray = link.split("://"),
        domainArray = linkArray[1].split("/");
      setMedias([
        ...medias,
        {
          link,
          source: domainArray[0],
          type: "image",
        },
      ]);
      onClose();
      return;
    }

    const { data } = await axios.post("/api/scrapMedias", { token, link }),
      newMedias = [...data.imgs],
      videos = [];

    if (data.cover) {
      newMedias.push(data.cover);
    }

    for (const video of data.videos) {
      const url: string = video.src.match(/http/)
        ? video.src
        : `https:${video.src}`;
      if (url.match(/youtu/)) {
        videos.push(await getVideoYoutube(url.replace("embed/", "watch?v=")));
      } else {
        videos.push(video);
      }
    }
    newMedias.push(...videos);
    setMediasForSelect(newMedias);
    setIsLoading(false);
    setTab("gallery");
  }

  return (
    <form
      className={classes.container}
      onSubmit={handleSubmit}
      encType="multipart/form-data"
    >
      {isLoading ? (
        <div className={classes.loading}>{t("Search contents...")}</div>
      ) : (
        <fieldset className={classes.fieldset}>
          <label htmlFor="link">{t("Add media or page link")}</label>
          <input
            type="text"
            placeholder={t("link")}
            name="link"
            id="link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
          <div className={classes.subtitle}>
            {t("MediaCreatorLinkTabSubtitle")}
          </div>
        </fieldset>
      )}
      <div className={classes.buttons}>
        <button className="Cancel" onClick={() => onClose()}>
          {t("Cancel")}
        </button>
        <SubmitButton txt={t("Add")} isLoading={isLoading} />
      </div>
    </form>
  );
}
