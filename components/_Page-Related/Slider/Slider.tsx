/* eslint-disable react-hooks/exhaustive-deps */
import classes from "./Slider.module.css";
import { useEffect, useState, useContext } from "react";
import SliderImage from "./SliderImage/SliderImage";
import Media from "../../../interfaces/medias.interface";
import SliderVideo from "./SliderVideo/SliderVideo";
import { UiContext } from "../../../store/ui.store";

interface props {
  readonly token: string;
}

export default function Slider({ token }: props) {
  const { socket } = useContext(UiContext),
    [media, setMedia] = useState<Media | undefined>(undefined);

  useEffect(() => {
    socket.on("connect", () => {
      socket.on(`slider-${token}`, (msg: any) => {
        setMedia(msg);
      });
    });
  }, []);

  return (
    <div className={classes.container}>
      {media && media.type === "image" && <SliderImage media={media} />}
      {media && media.type === "video" && <SliderVideo media={media} />}
    </div>
  );
}
