import Layout from "../../../libs/Layout/Layout";
import useFetch from "../../../hooks/useFetch";
import _ from "lodash";
import classes from "../../../styles/Links.module.css";
import Show from "../../../interfaces/show.interface";
import useTranslate from "../../../hooks/useTranslate";
import pageTranslate from "../../../translate/page.translate";
import useCreateLink from "../../../hooks/useCreateLink";
import Error from "../../../interfaces/error.interface";
import EditShowTitle from "../../../libs/EditShowTitle/EditShowTitle";
import ColumnistToDelete from "../../../libs/ColumnistToDelete/ColumnistToDelete";

interface props {
  readonly token: string;
}

interface Fetch {
  readonly loading: boolean;
  readonly error: Error;
  readonly data: Show;
}

export default function AdminManage({ token }: props) {
  const t = useTranslate(pageTranslate),
    { loading, data }: Fetch = useFetch("/getAdminLinkShow", { token });
  return (
    <Layout title={_.get(data, "title")}>
      <div className={classes.container}>
        {loading && <div className={classes.page}>...</div>}
        {data && (
          <div className={classes.page}>
            <div className={classes.block}>
              <EditShowTitle title={data.title} token={token}/>
              <ColumnistToDelete token={token}/>
              <h3>Coming next : </h3>
              <p>bouton générer de nouveaux liens</p>
              <p>delete show</p>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ query }) {
  return {
    props: { token: query.token },
  };
}
