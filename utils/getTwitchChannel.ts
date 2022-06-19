import { LS_CHANNEL_TWITCH } from "./constants";

export default function getTwitchChannel(): string {
  return localStorage.getItem(LS_CHANNEL_TWITCH);
}