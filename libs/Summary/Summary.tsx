import classes from "./Summary.module.css";
import Chronicle from "../../interfaces/chronicle.interface";
import Link from "next/link";
import { useState } from "react";
import useTranslate from "../../hooks/useTranslate";

interface props {
  readonly chronicles: Array<Chronicle>;
}
export default function Summary({ chronicles = [] }: props) {
  const t = useTranslate(),
    [isOpen, setIsOpen] = useState(false),
    [search, setSearch] = useState("");

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
            {chronicles.filter(filterChronicles).map((chronicle: Chronicle) => (
              <div className={classes.menuElement} key={chronicle.id}>
                <Link
                  href={`#` + chronicle.id}
                >{`#${chronicle.position} ${chronicle.title} (${chronicle.columnist.name})`}</Link>
              </div>
            ))}
          </div>
        </div>
        <div className={classes.search}>
          <input
            type="text"
            placeholder={t("Search...")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="crossInput" onClick={() => setSearch("")} />
        </div>
      </div>
      <div className={classes.close} onClick={() => setIsOpen(!isOpen)}>
        <div className={classes.chevron} data-isopen={isOpen} />
      </div>
    </div>
  );
}
