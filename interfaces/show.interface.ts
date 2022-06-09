import Chronicle from "./chronicle.interface";
import Columnist from "./columnist.interface";
export default interface Show {
  title: string;
  id: number;
  trigger: Date;
  admin: string;
  editor: string;
  reader: string;
  chronicles: Array<Chronicle>;
  columnist: Array<Columnist>;
  _count: {
    chronicles: number
  }
}
