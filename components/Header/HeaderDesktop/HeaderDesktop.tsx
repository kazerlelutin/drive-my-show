import classes from "./HeaderDesktop.module.css";
import MenuHeader from "../../MenuHeader/MenuHeader";
import Logo from "../../../UI/Logo/Logo";
import KofiButton from "../../../UI/KofiButton/KofiButton";

export default function HeaderDesktop() {
  return (
    <header className={classes.container}>
      <Logo />
      <MenuHeader />
      <KofiButton />
    </header>
  );
}
