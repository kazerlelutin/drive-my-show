import _ from "lodash";
import useFetch from "../../hooks/useFetch";
import useTranslate from "../../hooks/useTranslate";
import Chronicle from "../../interfaces/chronicle.interface";
import Error from "../../interfaces/error.interface";
import ChronicleCard from "../ChronicleCard/ChronicleCard";
import UpAndDownChronicles from "../UpAndDownChronicles/UpAndDownChronicles";
import classes from "./Chronicles.module.css";
import ChroniclesTranslate from "./Chronicles.translate";
import MediasForCard from '../MediasForCard/MediasForCard';

interface props {
  readonly token: string;
}

interface Fetch {
  readonly loading: boolean;
  readonly error: Error;
  readonly refetch: Function;
  readonly data: Array<Chronicle>;
}

export default function Chronicles({ token }:props) {
  const t = useTranslate(ChroniclesTranslate),
    {
      loading,
      error,
      refetch,
      data = [],
    }: Fetch = useFetch("/getChronicles", { token });

  return (
    <div className={classes.container}>
      <div className={classes.counter}>
        {loading
          ? "..."
          : `${data.length} ${t("Chronicle")}${data.length > 1 ? "s" : ""}`}
      </div>
      {loading ? (
        <div className={classes.loading}></div>
      ) : (
        data.map((chronicle) => (
          <ChronicleCard
            key={chronicle.id}
            chronicle={chronicle}
            refetch={refetch}
            UpAndDownChronicles={
              <UpAndDownChronicles chronicle={chronicle} token={token} onChange={refetch} lastPosition={_.last(data).position}/>
            }
            MediasForCard={
              <MediasForCard chronicle={chronicle} token={token}/>
            }
          />
        ))
      )}
    </div>
  );
}
