import classes from "./ColumnistToDelete.module.css";
import useFetch from "../../hooks/useFetch";
import useTranslate from "../../hooks/useTranslate";
import { useState } from "react";
import Columnist from "../../interfaces/columnist.interface";
import ColumnistToDeleteModale from "./ColumnistToDeleteModale/ColumnistToDeleteModale";

interface props {
  readonly token: string;
}

export default function ColumnistToDelete({ token }: props) {
  const { loading, data, refetch } = useFetch("/getColoumnistesForDelete", {
      token,
    }),
    t = useTranslate(),
    [isDelete, setIsDelete] = useState<Columnist | undefined>(undefined);

  return (
    <div className={classes.container}>
      <div className={classes.title}>{t("Columnists")}</div>
      {isDelete && (
        <ColumnistToDeleteModale
          token={token}
          refetch={refetch}
          columnist={isDelete}
          onClose={() => setIsDelete(undefined)}
        />
      )}
      {loading ? (
        <div className={classes.loading}>...</div>
      ) : (
        data && (
          <div className={classes.counters}>
            {data
              .sort((a, b) => b._count.chronicles - a._count.chronicles)
              .map((columnist: any) => (
                <div
                  key={columnist.id}
                  className={classes.counter}
                  title={`${columnist._count.chronicles} ${t("chronicle")}${
                    columnist._count.chronicles > 1 ? "s" : ""
                  }`}
                >
                  <div className={classes.columnist}>
                    {columnist.name}
                    <span
                      className={classes.count}
                    >{` (${columnist._count.chronicles})`}</span>
                  </div>
                  <div
                    className={classes.del}
                    onClick={() => setIsDelete(columnist)}
                  >
                    {t("Delete")}
                  </div>
                </div>
              ))}
          </div>
        )
      )}
    </div>
  );
}
