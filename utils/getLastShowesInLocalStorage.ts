import { ShowInLs } from "../interfaces/showInLs.interface";
import { LS_LAST_SHOW } from "./constants";

export default function getLastShowesInLocalStorage():Array<ShowInLs>{
    return JSON.parse(localStorage.getItem(LS_LAST_SHOW) ||`[]`)
}