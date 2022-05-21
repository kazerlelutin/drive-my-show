/* eslint-disable react-hooks/exhaustive-deps */
import classes from "./Slider.module.css";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import SliderImage from "./SliderImage/SliderImage";
import Media from "../../interfaces/medias.interface";
import SliderVideo from './SliderVideo/SliderVideo';

interface props {
  readonly token: string;
}

export default function Slider({ token }: props) {
  const [media, setMedia] = useState<Media|undefined>(undefined);

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_URL_LIVE);

    socket.on("connect", () => {
      socket.on(`slider-${token}`, (msg) => {

        setMedia(msg);
      });
    });
  }, []);

  return <div className={classes.container}>
      {media && media.type === 'image' && <SliderImage media={media}/>}
      {media && media.type === 'video' && <SliderVideo media={media}/>}
  </div>;
}
