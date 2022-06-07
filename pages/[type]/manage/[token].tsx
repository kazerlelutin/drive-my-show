import Layout from "../../../libs/Layout/Layout";
import useFetch from "../../../hooks/useFetch";
import _ from "lodash";
import classes from "../../../styles/Links.module.css";
import Show from "../../../interfaces/show.interface";
import useTranslate from "../../../hooks/useTranslate";
import pageTranslate from "../../../translate/page.translate";
import Error from "../../../interfaces/error.interface";
import EditShowTitle from "../../../libs/EditShowTitle/EditShowTitle";
import ColumnistToDelete from "../../../libs/ColumnistToDelete/ColumnistToDelete";
import LayoutConductorManager from "../../../libs/LayoutConductorManager/LayoutConductorManager";
import DeleteShowButton from "../../../libs/DeleteShowButton/DeleteShowButton";

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
    { loading, data, error }: Fetch = useFetch("/getAdminLinkShow", { token });
  return (
    <Layout title={_.get(data, "title")}>
      <LayoutConductorManager error={error} loading={loading} token={token}>
        <div className={classes.container}>
          {loading && <div className={classes.page}>...</div>}
          {data && (
            <div className={classes.page}>
              <div className={classes.block}>
                <EditShowTitle title={data.title} token={token} />
                <ColumnistToDelete token={token} />
                <h3>Coming next : </h3>
                <p>bouton générer de nouveaux liens</p>
              </div>
              <div className={classes.block}>
                <div className={classes.delete}>
                <div className={classes.label}>{t('Delete this conductor')}</div>
                <DeleteShowButton token={token} />
                </div>
              </div>
            </div>
          )}
        </div>
      </LayoutConductorManager>
    </Layout>
  );
}

export async function getServerSideProps({ query }) {
  return {
    props: { token: query.token },
  };
}
