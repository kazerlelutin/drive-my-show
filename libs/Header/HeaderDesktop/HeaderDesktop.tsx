import classes from "./HeaderDesktop.module.css";
import MenuHeader from "../../MenuHeader/MenuHeader";
import Logo from "../../Logo/Logo";
import KofiButton from "../../KofiButton/KofiButton";

export default function HeaderDesktop() {
  return (
    <header className={classes.container}>
      <Logo />
      <MenuHeader />
      <KofiButton />
    </header>
  );
}
