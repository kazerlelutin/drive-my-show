import { LS_AUTH_TWITCH } from "./constants";

export default function getTwitchAuthToken():string {
  return localStorage.getItem(LS_AUTH_TWITCH);
}
