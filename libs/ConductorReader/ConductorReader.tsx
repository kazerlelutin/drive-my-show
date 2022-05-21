import classes from "./ConductorReader.module.css";
import useFetch from "../../hooks/useFetch";
import LayoutConductorManager from "../LayoutConductorManager/LayoutConductorManager";
import Chronicle from "../../interfaces/chronicle.interface";
import ReactMarkdown from "react-markdown";
import MediasForConductor from "../MediasForConductor/MediasForConductor";

interface props {
  token: string;
}

export default function ConductorReader({ token }: props) {
  const { loading, error, data, refetch } = useFetch("/getConductor", {
    token: token,
  });

  return (
    <LayoutConductorManager error={error} loading={loading}>
      {data && (
        <div className={classes.page}>
          <h1 className={classes.title}>{data.title}</h1>
          {data.chronicles.map((chronicle: Chronicle) => (
            <div className={classes.chronicle} key={chronicle.id}>
              {chronicle.link.match("/http/") ? (
                <a href={chronicle.link} target="_blank" rel="noreferrer">
                  <h2 className={classes.chronicleTitle}>{`#${chronicle.position} ${
                    chronicle.title
                  }`}</h2>
                </a>
              ) : (
                <h2 className={classes.chronicleTitle}>{`#${chronicle.position} ${
                  chronicle.title
                }`}</h2>
              )}
              <div className={classes.columnist}>
                {chronicle.columnist.name} {chronicle.duration > 0 && <span className={classes.duration}>{chronicle.duration}</span>}
              </div>
              <ReactMarkdown>{chronicle.content}</ReactMarkdown>
              <MediasForConductor chronicle={chronicle} token={token}/>
            </div>
          ))}
        </div>
      )}
    </LayoutConductorManager>
  );
}
