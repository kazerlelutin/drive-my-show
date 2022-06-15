import Media from "./medias.interface";
import Columnist from './columnist.interface';


enum state {
  draft = 'draft',
  publish = 'publish',
  read = 'read'
}
export default interface Chronicle {
  id: number;
  title: string;
  content: string;
  link: string;
  columnistId: number;
  columnist: Columnist;
  reader: string;
  position: number;
  duration: number;
  updatedAt: Date;
  state: state;
  medias: Array<Media>;
}
