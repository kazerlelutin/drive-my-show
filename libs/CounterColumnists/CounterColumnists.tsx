import classes from "./CounterColumnists.module.css";
import useFetch from "../../hooks/useFetch";
import useTranslate from "../../hooks/useTranslate";

interface props {
  readonly token: string;
}

export default function CounterColumnists({ token }: props) {
  const { loading, data } = useFetch("/getColoumnistsCounters", { token }),
    t = useTranslate();

  console.log(data);
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
