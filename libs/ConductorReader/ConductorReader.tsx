/* eslint-disable react-hooks/exhaustive-deps */
import classes from "./ConductorReader.module.css";
import useFetch from "../../hooks/useFetch";
import LayoutConductorManager from "../LayoutConductorManager/LayoutConductorManager";
import Chronicle from '../../interfaces/chronicle.interface';
import ReactMarkdown from "react-markdown";
import MediasForConductor from "../MediasForConductor/MediasForConductor";
import { useEffect, useState } from 'react';
import { io } from "socket.io-client";
import { toast } from "react-toastify";
import useTranslate from '../../hooks/useTranslate';
import Link from "next/link";
import MediasForCard from "../MediasForCard/MediasForCard";

interface props {
  readonly token: string;
  readonly type: string;
}

export default function ConductorReader({ token, type }: props) {
  const { loading, error, data, refetch } = useFetch("/getConductor", {
    token: token,
  }),
  t = useTranslate(),
  [refresh,setRefresh] = useState<string>('')

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_URL_LIVE);
    socket.on("connect", () => {
      socket.on(`conductor-${type}-${token}`, (msg) => {
        setRefresh('refresh')
        toast.info(t('Update detected, reload the page.'), {
          toastId: refresh
        });
        setTimeout(()=>{
          setRefresh('')
        },5000)
      });
    });
  }, []);

  return (
    <LayoutConductorManager error={error} loading={loading}>
      {data && (
        <div className={classes.page}>
          <h1 className={classes.title}>{data.title}</h1>
          {data.chronicles.map((chronicle: Chronicle) => (
            <div className={classes.chronicle} key={chronicle.id} id={`${chronicle.id}`}>
              {chronicle.link.match("/http/") ? (
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
          <div className={classes.menu}>
          {data.chronicles.map((chronicle: Chronicle) => (
            <div className={classes.menuElement} key={chronicle.id}>
              <Link href={`#` + chronicle.id}>{`#${chronicle.position} ${chronicle.title}`}</Link>
            </div>
          ))}
          </div>
        </div>
      )}
    </LayoutConductorManager>
  );
}
