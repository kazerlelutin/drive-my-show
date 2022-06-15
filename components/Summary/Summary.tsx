import classes from './Summary.module.css';
import Chronicle from '../../interfaces/chronicle.interface';
import Link from 'next/link';
import { useState } from 'react';
import useTranslate from '../../hooks/useTranslate';
import useFetch from '../../hooks/useFetch';

interface props {
  readonly token: string;
}
export default function Summary({ token }: props) {
  const
  t = useTranslate(),
    { data: chronicles, loading } = useFetch('/getSummary', { token }),
    [isOpen, setIsOpen] = useState(false),
    [search, setSearch] = useState('');

  function filterChronicles(chronicle: Chronicle) {
    if (chronicle.title.toLowerCase().includes(search)) {
      return true;
    }
    if (chronicle.columnist.name.toLowerCase().includes(search)) {
      return true;
    }
    return false;
  }

  return (
    <div className={classes.container} data-isopen={isOpen}>
      <div className={classes.summary}>
        <div className={classes.chroniclesContainer}>
          <div className={classes.chronicles}>
            {loading && <p>{'...'}</p>}
            {chronicles &&
              chronicles
                .filter(filterChronicles)
                .map((chronicle: Chronicle) => (
                  <div className={classes.menuElement} key={chronicle.id}>
                    <Link href={`#` + chronicle.id}>{`#${chronicle.position} ${
                      chronicle.title
                    } (${
                      chronicle.columnist
                        ?  chronicle.columnist.name
                        : t(chronicle.state)
                    })`}</Link>
                  </div>
                ))}
          </div>
        </div>
        <div className={classes.search}>
          <input
            type="text"
            placeholder={t('Search...')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="crossInput" onClick={() => setSearch('')} />
        </div>
      </div>
      <div className={classes.close} onClick={() => setIsOpen(!isOpen)}>
        <div className={classes.chevron} data-isopen={isOpen} />
      </div>
    </div>
  );
}
