/* eslint-disable react-hooks/exhaustive-deps */
import classes from './CounterColumnists.module.css';
import useFetch from '../../hooks/useFetch';
import useTranslate from '../../hooks/useTranslate';
import { useEffect, useState } from 'react';
import ColumnistFilter from '../ColumnistFilter/ColumnistFilter';
import _ from 'lodash';

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
  const { loading, data, refetch } = useFetch('/getColoumnistsCounters', {
      token,
    }),
    [isInit, setInit] = useState(JSON.stringify(dataShow)),
    t = useTranslate();

  useEffect(() => {
    if (isInit !== JSON.stringify(dataShow)) {
      setInit(JSON.stringify(dataShow));
      refetch();
    }
  }, [dataShow]);

  useEffect(() => {
    if (data) {
      const columnists = data.columnists.map((o: any) => ({
          label: `${o.name} (${o._count?.chronicles})`,
          value: o,
        })),
        draft = true;
      setFilters({
        ...filters,
        columnists,
        draft,
      });
    }
  }, [data]);

  function handleChangeColumnist(selected: any) {
    setFilters({
      ...filters,
      columnists: _.uniqBy(selected, 'label').map((o: any) => ({
        label: `${o.value.name} (${o.value._count?.chronicles})`,
        value: o.value,
      })),
    });
  }

  function handleChangeState(selected: any) {
    setFilters({
      ...filters,
      draft: !filters.draft,
    });
  }

  return (
    <div className={classes.container}>
      {loading ? (
        <div className={classes.loading}>...</div>
      ) : (
        data && (
          <div className={classes.content}>
            <div className={classes.counters}>
              {`${data.total}  ${t('Chronicle')}${
                data.total > 1 ? 's' : ''
              } / ${process.env.NEXT_PUBLIC_CHRONICLE_LIMIT}`}
            </div>
            <div className={classes.columnists}>
              {filters && filters.columnists && (
                <ColumnistFilter
                  onChange={handleChangeColumnist}
                  value={filters.columnists}
                />
              )}
            </div>
            <div className={classes.draft}>
              <input
                type="checkbox"
                id="draft"
                onClick={handleChangeState}
                defaultChecked={filters.draft}
              />
              <label htmlFor="draft"> {t('draft')}</label>
            </div>
          </div>
        )
      )}
    </div>
  );
}
