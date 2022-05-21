import Media from "./medias.interface";
import Columnist from './columnist.interface';

export default interface Chronicle {
  id: number;
  title: string;
  content: string;
  link: string;
  columnist: Columnist;
  reader: string;
  position: number;
  duration: number;
  updatedAt: Date;
  medias: Array<Media>;
}
