import Chronicle from "./chronicle.interface";
import Media from "./medias.interface";

export default interface Columnist {
  id: number;
  name: string;
  chronicles: Array<Chronicle>;
  showId: number 
}
