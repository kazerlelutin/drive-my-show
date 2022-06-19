import { LS_AUTH_TWITCH } from "./constants";

export default function setTwitchAuthToken(token: string) {
  localStorage.setItem(LS_AUTH_TWITCH, token);
}
