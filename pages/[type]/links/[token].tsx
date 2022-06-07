/* eslint-disable react-hooks/exhaustive-deps */
import Layout from "../../../libs/Layout/Layout";
import useFetch from "../../../hooks/useFetch";
import _ from "lodash";
import classes from "../../../styles/Links.module.css";
import Show from "../../../interfaces/show.interface";
import useTranslate from "../../../hooks/useTranslate";
import pageTranslate from "../../../translate/page.translate";
import ClipBoard from "../../../libs/ClipBoard/ClipBoard";
import useCreateLink from "../../../hooks/useCreateLink";
import LayoutConductorManager from "../../../libs/LayoutConductorManager/LayoutConductorManager";
import Error from "../../../interfaces/error.interface";

interface props {
  readonly token: string;
}

interface Fetch {
  readonly loading: boolean;
  readonly error: Error;
  readonly data: Show;
}

export default function AdminLinks({ token }: props) {
  const t = useTranslate(pageTranslate),
    l = useCreateLink(),
    { loading, error, data }: Fetch = useFetch("/getAdminLinkShow", { token });

  return (
    <Layout title={_.get(data, "title")}>
      <LayoutConductorManager error={error} loading={loading} token={token}>
        {data && (
          <>
            <div className={classes.block}>
              <ClipBoard
                txt={l("slider/" + data.reader)}
                typeTxt="input"
                label={t('Add this link as "Browser" source in OBS')}
              />
            </div>
            <div className={classes.block}>
              <ClipBoard
                txt={l("admin/" + data.admin)}
                typeTxt="input"
                label={t("admin link")}
              />
              <ClipBoard
                txt={l("editor/" + data.editor)}
                typeTxt="input"
                label={t("editor link")}
              />
              <ClipBoard
                txt={l("reader/conductor/" + data.reader)}
                typeTxt="input"
                label={t("reader link")}
              />
            </div>
          </>
        )}
      </LayoutConductorManager>
    </Layout>
  );
}

export async function getServerSideProps({ query }) {
  return {
    props: { token: query.token },
  };
}
