/* eslint-disable @next/next/no-img-element */
import Media from "../../../../interfaces/medias.interface";
import classes from "./SliderImage.module.css";

interface props {
  readonly media: Media;
}
export default function SliderImage({ media }: props) {
  return (
    <div className={classes.container}>
      {media.link && (
        <div className={classes.blurContainer}>
          <img src={media.link} className={classes.blur} alt={media.title} />
        </div>
      )}
      {media.link && (
        <div
          style={{ backgroundImage: `url(${media.link})` }}
          className={classes.image}
        />
      )}
    </div>
  );
}
