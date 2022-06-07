import { useState } from "react";
import KofiButton from "../../KofiButton/KofiButton";
import Logo from "../../Logo/Logo";
import MenuHeader from "../../MenuHeader/MenuHeader";
import classes from "./HeaderMobile.module.css";

export default function HeaderMobile() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className={classes.container}>
      <div className={classes.hamburger} onClick={() => setIsOpen(!isOpen)}>
        {Array(1, 2, 3)
          .fill(1, 3)
          .map((bar: number) => (
            <div className={classes.bar} key={bar} />
          ))}
      </div>
      <div className={classes.menu} data-isopen={isOpen}>
        <div onClick={() => setIsOpen(false)}>
          <Logo />
        </div>

        <div className={classes.links}>
          <MenuHeader onClick={() => setIsOpen(false)} />
        </div>
      </div>
      <KofiButton />
    </header>
  );
}
