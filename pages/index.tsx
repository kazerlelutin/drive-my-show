import CreateShowForm from '../libs/CreateShowForm/CreateShowForm';
import Layout from '../libs/Layout/Layout';
import classes from '../styles/Home.module.css';

export default function Home() {
  return (
    <Layout>
      <div className={classes.container}>
        <CreateShowForm />
      </div>
    </Layout>
  );
}
