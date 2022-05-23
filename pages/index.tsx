import CreateShowForm from "../libs/CreateShowForm/CreateShowForm";
import LastShowes from "../libs/LastShowes/LastShowes";
import Layout from "../libs/Layout/Layout";
import classes from "../styles/Home.module.css";

export default function Home() {
  return (
    <Layout>
      <div className={classes.container}>
        <div className={classes.home}>
          <CreateShowForm />
        </div>
        <LastShowes />
      </div>
    </Layout>
  );
}
