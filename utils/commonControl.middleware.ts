import { NextApiRequest, NextApiResponse } from "next";
import _ from "lodash";

export default function commonControl(
  req: NextApiRequest,
  res: NextApiResponse,
  availableProfiles: Array<"admin" | "editor" | "reader">
):string|void {
  if (req.method !== "POST") return res.status(405).send("Please, use POST");
  if (!_.get(req, "body.token"))
    return res.status(403).send("No token on body");
    
  const type = availableProfiles.find((profile) =>
    req.headers.referer.includes(profile)
  );

  if (!type) return res.status(403).send("Wrong profile");

  return type;
}
