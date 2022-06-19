import { LS_LAST_SHOW } from "./constants";
import getLastShowesInLocalStorage from "./getLastShowesInLocalStorage";

export default function setCurrentShowInLocalStorage(token:string) {
  const ls = getLastShowesInLocalStorage(),
    indexCurrent = ls.findIndex((o) => o.token === token);
  if (indexCurrent >= 0) {
    ls.forEach((o,index)=> {
      if(indexCurrent === index){
        o.current = true;
      }else {
        delete o.current
      }
    })
    localStorage.setItem(LS_LAST_SHOW,JSON.stringify(ls));
  }
}
