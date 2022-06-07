/* eslint-disable react-hooks/exhaustive-deps */
import classes from "./ConductorReader.module.css";
import useFetch from "../../hooks/useFetch";
import LayoutConductorManager from "../LayoutConductorManager/LayoutConductorManager";
import Chronicle from "../../interfaces/chronicle.interface";
import ReactMarkdown from "react-markdown";
import MediasForConductor from "../MediasForConductor/MediasForConductor";
import { useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import useTranslate from "../../hooks/useTranslate";
import { UiContext } from "../../store/ui.store";

interface props {
  readonly token: string;
  readonly type: string;
}

export default function ConductorReader({ token, type }: props) {
  const { socket } = useContext(UiContext),
    { loading, error, data } = useFetch("/getConductor", {
      token: token,
    }),
    t = useTranslate(),
    [refresh, setRefresh] = useState<string>("");

  useEffect(() => {
    socket.on("connect", () => {
      socket.on(`conductor-${type}-${token}`, () => {
        setRefresh("refresh");
        toast.info(t("Update detected, reload the page."), {
          toastId: refresh,
        });
        setTimeout(() => {
          setRefresh("");
        }, 5000);
      });
    });
  }, []);

  return (
    <LayoutConductorManager error={error} loading={loading} token={token}>
      {data && (
        <div className={classes.page}>
          <h1 className={classes.title}>{data.title}</h1>
          {data.chronicles.map((chronicle: Chronicle) => (
            <div
              className={classes.chronicle}
              key={chronicle.id}
              id={`${chronicle.id}`}
            >
              {chronicle.link.match(/http/) ? (
                <a href={chronicle.link} target="_blank" rel="noreferrer">
                  <h2
                    className={classes.chronicleTitle}
                  >{`#${chronicle.position} ${chronicle.title}`}</h2>
                </a>
              ) : (
                <h2
                  className={classes.chronicleTitle}
                >{`#${chronicle.position} ${chronicle.title}`}</h2>
              )}
              <div className={classes.columnist}>
                {chronicle.columnist.name}{" "}
                {chronicle.duration > 0 && (
                  <span className={classes.duration}>{chronicle.duration}</span>
                )}
              </div>
              <ReactMarkdown>{chronicle.content}</ReactMarkdown>
              <MediasForConductor chronicle={chronicle} token={token} />
            </div>
          ))}
        </div>
      )}
    </LayoutConductorManager>
  );
}
