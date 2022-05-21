/* eslint-disable react-hooks/exhaustive-deps */
import classes from './MenuHeader.module.css';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import MenuHeaderData from './MenuHeader.data';
import Link from 'next/link';
import useTranslate from '../../hooks/useTranslate';
import MenuHeaderTranslate from './MenuHeader.translate';

export default function MenuHeader() {
  const { pathname, query } = useRouter(),
    t = useTranslate(MenuHeaderTranslate),
    [menu, setMenu] = useState<Array<{ link: string; label: string }>>();
  function switchMenu() {
    if (query?.type === 'admin') {
      setMenu(MenuHeaderData.admin);
    } else if (query?.type === 'editor') {
      setMenu(MenuHeaderData.editor);
    } else if (query?.type === 'reader') {
      setMenu(MenuHeaderData.home);
    } else {
      setMenu(MenuHeaderData.home);
    }
  }

  useEffect(() => {
    switchMenu();
  }, [pathname]);

  return (
    <div className={classes.container}>
      {menu &&
        menu.map((item) => (
          <div key={item.label} className={classes.link}>
            <Link href={`${item.link}${query.token ? query.token : ''}`}>
              {t(item.label)}
            </Link>
          </div>
        ))}
    </div>
  );
}
