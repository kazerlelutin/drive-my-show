import { LS_CHANNEL_TWITCH } from "./constants";

export default function setTwitchChannel(channelName: string) {
  localStorage.setItem(LS_CHANNEL_TWITCH, channelName);
}
