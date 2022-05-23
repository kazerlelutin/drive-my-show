import { LS_LAST_SHOW } from "./constants";
import getLastShowesInLocalStorage from "./getLastShowesInLocalStorage";
import axios from "axios";

export default async function setLastShowesInLocalStorage({
  type,
  token,
}: any) {
  const ls = getLastShowesInLocalStorage(),
    existShow = ls.find((o) => o.token === token);

  if (!existShow) {
    try {
      const { data } = await axios.post("/api/getAdminShow", { type, token });
      localStorage.setItem(
        LS_LAST_SHOW,
        JSON.stringify([...ls, { type, token, title: data.title }])
      );
    } catch (e) {
      return e;
    }
  }
  //
}
