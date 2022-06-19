import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function validate(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { token } = req.body;
    if (token) {
      try {
        await axios.get("https://id.twitch.tv/oauth2/validate", {
          headers: {
            authorization: "OAuth " + token,
          },
        });
        res.status(200).send("Token ok");
      } catch {
        res.status(401).send("Token expired");
      }
    } else {
      res.status(400).send("No token");
    }
  } else {
    res.status(405).send("Wrong method");
  }
}
