import ReactPlayer from "react-player";
import Media from "../../../interfaces/medias.interface";
import classes from "./SliderVideo.module.css";

interface props {
  readonly media: Media;
}
export default function SliderVideo({ media }: props) {
  const regexProviders = new RegExp(
    /youtu|vimeo|facebook|twitter|dailymotion|twitch/
  );
  return media.link ? (
    <div className={classes.container}>
      <ReactPlayer
        url={media.link}
        controls={false}
        volume={1}
        loop={true}
        playing={true}
        width={window.innerWidth}
        height={media.link.match(regexProviders) ? window.innerHeight : "100%"}
        className={classes.image}
      />
    </div>
  ) : (
    <></>
  );
}