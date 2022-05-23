import '../styles/globals.css';
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { UiContext } from '../store/ui.store';
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);
import io from 'socket.io-client';
const socket = io(process.env.NEXT_PUBLIC_URL_LIVE)

function MyApp({ Component, pageProps }) {
  return <UiContext.Provider value={{socket}} >
    <Component {...pageProps} />
  </UiContext.Provider>
}

export default MyApp
