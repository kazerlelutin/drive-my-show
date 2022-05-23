/* eslint-disable react-hooks/exhaustive-deps */
import classes from "./CounterColumnists.module.css";
import useFetch from "../../hooks/useFetch";
import useTranslate from "../../hooks/useTranslate";
import { useEffect } from "react";

interface props {
  readonly token: string;
  readonly dataShow?: any;
}

export default function CounterColumnists({ token, dataShow }: props) {
  const { loading, data, refetch } = useFetch("/getColoumnistsCounters", {
      token,
    }),
    t = useTranslate();

  useEffect(() => {
    if (dataShow) refetch();
  }, [dataShow]);

  return (
    <div className={classes.container}>
      {loading ? (
        <div className={classes.loading}>...</div>
      ) : (
        data && (
          <div className={classes.content}>
            <div className={classes.chronicle}>
              {`${data.total} ${t("Chronicle")}${data.total > 1 ? "s" : ""}`}
            </div>
            <div className={classes.counters}>
              {data.columnists.map((columnist: any) => (
                <div key={columnist.id} className={classes.counter}>
                  {columnist.name}
                  <span
                    className={classes.count}
                  >{`(${columnist._count.chronicles})`}</span>
                </div>
              ))}
            </div>
          </div>
        )
      )}
    </div>
  );
}
