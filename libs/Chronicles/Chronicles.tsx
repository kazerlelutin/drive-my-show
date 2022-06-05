import _ from "lodash";
import useFetch from "../../hooks/useFetch";
import useTranslate from "../../hooks/useTranslate";
import Chronicle from "../../interfaces/chronicle.interface";
import Error from "../../interfaces/error.interface";
import ChronicleCard from "../ChronicleCard/ChronicleCard";
import UpAndDownChronicles from "../UpAndDownChronicles/UpAndDownChronicles";
import classes from "./Chronicles.module.css";
import ChroniclesTranslate from "./Chronicles.translate";
import MediasForCard from "../MediasForCard/MediasForCard";
import { ReactElement, useState } from "react";
import CounterColumnists from "../CounterColumnists/CounterColumnists";
import MediasForConductor from "../MediasForConductor/MediasForConductor";

interface props {
  readonly token: string;
}

interface Fetch {
  readonly loading: boolean;
  readonly error: Error;
  readonly refetch: Function;
  readonly data: Array<Chronicle>;
}

export default function Chronicles({ token }: props) {
  const t = useTranslate(ChroniclesTranslate),
    [filters, setFilters] = useState({}),
    {
      loading,
      refetch,
      data = [],
    }: Fetch = useFetch("/getChronicles", { token });

  return (
    <div className={classes.container}>
      <div className={classes.counter}>
        <CounterColumnists
          token={token}
          dataShow={data}
          setFilters={setFilters}
          filters={filters}
        />
      </div>
      {loading ? (
        <div className={classes.loading}></div>
      ) : (
        data
          .filter((o) => !!_.get(filters, "columnists", []).find((col) => col.value.id === o.columnistId))
          .map((chronicle) => (
            <ChronicleCard
              key={chronicle.id}
              chronicle={chronicle}
              refetch={refetch}
              UpAndDownChronicles={
                <UpAndDownChronicles
                  chronicle={chronicle}
                  token={token}
                  onChange={refetch}
                  lastPosition={_.last(data).position}
                />
              }
              MediasForCard={
                <MediasForConductor chronicle={chronicle} token={token} disableErase />
              }
            />
          ))
      )}
    </div>
  );
}
