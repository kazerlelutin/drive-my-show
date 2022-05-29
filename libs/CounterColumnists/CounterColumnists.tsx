/* eslint-disable react-hooks/exhaustive-deps */
import classes from "./CounterColumnists.module.css";
import useFetch from "../../hooks/useFetch";
import useTranslate from "../../hooks/useTranslate";
import { useEffect } from "react";
import ColumnistSelector from "../ColumnistSelector/ColumnistSelector";
import ColumnistFilter from '../ColumnistFilter/ColumnistFilter';
import _ from "lodash";

interface props {
  readonly token: string;
  readonly dataShow?: any;
  readonly setFilters: Function;
  readonly filters: any;
}

export default function CounterColumnists({
  token,
  dataShow,
  setFilters,
  filters,
}: props) {
  const { loading, data, refetch } = useFetch("/getColoumnistsCounters", {
      token,
    }),
    t = useTranslate();

  useEffect(() => {
    if (dataShow && !data) refetch();
  }, [dataShow]);

  useEffect(() => {
    if (data) {
      setFilters({
        ...filters,
        columnists: data.columnists.map((o:any) => ({
          label: `${o.name} (${o._count?.chronicles})`,
          value: o,
        }))})
    }
  }, [data]);

  function handleChange(selected:any) {
    setFilters({
      ...filters,
      columnists: _.uniqBy(selected,'label').map((o:any) => ({
        label: `${o.value.name} (${o.value._count?.chronicles})`,
        value: o.value,
      }))})
  }
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
              {filters && filters.columnists && (
                <ColumnistFilter
                  onChange={handleChange}
                  value={filters.columnists}
                />
              )}
            </div>
          </div>
        )
      )}
    </div>
  );
}
