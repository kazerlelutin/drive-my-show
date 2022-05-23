/* eslint-disable react-hooks/exhaustive-deps */
import FullscreenModale from "../FullscreenModale/FullscreenModale";
import classes from "./MediaCreator.module.css";
import { useState, useEffect, SyntheticEvent, BaseSyntheticEvent } from "react";
import SubmitButton from "../SubmitButton/SubmitButton";
import useLazyFetch from "../../hooks/useLazyFetch";
import { toast } from "react-toastify";
import useTranslate from "../../hooks/useTranslate";

interface props {
  readonly token: string;
  readonly chronicleId: number;
  readonly onClose: Function;
  readonly setMedias: Function;
}

export default function MediaCreator({
  token,
  chronicleId,
  onClose,
  setMedias,
}: props) {
  const mediaTypes = ["image", "video"],
    t = useTranslate(),
    [currentType, setCurrentType] = useState<string>("video"),
    [title, setTitle] = useState<string>(""),
    [dataImg, setData] = useState<string>(""),
    [link, setLink] = useState<string>(""),
    { loading, data, api } = useLazyFetch("/createMedia");

  async function getBase64(file: File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    const myFile: any = await new Promise((resolve, reject) => {
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
    const cleanBase = myFile.split(",");
    setData(cleanBase[1]);
  }

  //TODO connect Bucket for save data
  async function handleDragOver(e: BaseSyntheticEvent) {
    e.preventDefault();
    const nameArray = e.target.files[0].name.split(".");
    if (title === "") {
      setTitle(nameArray[0]);
    }
    getBase64(e.target.files[0]);
  }

  function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    api({
      title,
      type: currentType,
      token,
      data: dataImg,
      link,
      chronicleId,
    });
  }

  useEffect(() => {
    if (data) {
      toast.success(t("Media created !"));
      setMedias(data);
      onClose();
    }
  }, [data]);

  return (
    <FullscreenModale>
      <form
        className={classes.container}
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <fieldset className={classes.fieldset}>
          <label htmlFor="">{t("name")}</label>
          <input
            type="text"
            placeholder={t("name")}
            name="name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </fieldset>
        {/* currentType === "image" && (
          <fieldset className={classes.fieldset}>
            <label htmlFor="">{t("file")}</label>
            <input type="file" onChange={handleDragOver} />
            <div className={classes.or}>{t("or")}</div>
          </fieldset>
        ) */}
        <fieldset className={classes.fieldset}>
          <label htmlFor="">{t("link")}</label>
          <input
            type="text"
            placeholder={t("link")}
            name="link"
            id="link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
        </fieldset>
        <div className={classes.types}>
          {mediaTypes.map((mediaType) => (
            <div
              className={classes.type}
              key={mediaType}
              onClick={() => setCurrentType(mediaType)}
              data-current={mediaType === currentType}
            >
              {t(mediaType)}
            </div>
          ))}
        </div>
        <div className={classes.buttons}>
          <button className="Cancel" onClick={() => onClose()}>
            {t("Cancel")}
          </button>

          <SubmitButton txt={t("Add")} isLoading={loading} />
        </div>
      </form>
    </FullscreenModale>
  );
}
