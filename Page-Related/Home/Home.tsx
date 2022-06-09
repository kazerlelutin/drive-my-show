
import CreateShowForm from "../../components/CreateShowForm/CreateShowForm";
import LastShowes from "../../components/LastShowes/LastShowes";
import classes from "./Home.module.css";

export default function Home() {
  return (
      <div className={classes.container}>
        <div className={classes.home}>
          <CreateShowForm />
        </div>
        <LastShowes />
      </div>
  );
}
