/* eslint-disable react-hooks/exhaustive-deps */
import Layout from "../../libs/Layout/Layout";
import useFetch from "../../hooks/useFetch";
import _ from "lodash";
import classes from "../../styles/Admin.module.css";
import Show from "../../interfaces/show.interface";
import dayjs from "dayjs";
import useTranslate from "../../hooks/useTranslate";
import pageTranslate from "../../translate/page.translate";
import ChronicleEditor from "../../libs/ChronicleEditor/ChronicleEditor";
import LayoutConductorManager from "../../libs/LayoutConductorManager/LayoutConductorManager";
import Error from "../../interfaces/error.interface";
import { useState } from "react";
import Chronicles from "../../libs/Chronicles/Chronicles";

interface props {
  readonly token: string;
}

interface Fetch {
  readonly loading: boolean;
  readonly error: Error;
  readonly data: Show;
}

export default function Admin({ token }: props) {
  const t = useTranslate(pageTranslate),
    [showChronicleForm, setShowChronicleForm] = useState<boolean>(false),
    { loading, error, data }: Fetch = useFetch("/getAdminShow", { token });
    
  return (
    <Layout title={_.get(data, "title")}>
      <LayoutConductorManager error={error} loading={loading}>
        {data && (
          <>
            <header className={classes.header}>
              <h1>{data.title}</h1>
              <div className={classes.expire}>
                {t("Expires")} {dayjs(data.trigger).add(30, "days").fromNow()}
              </div>
            </header>
            <div className={classes.actions}>
              <button onClick={() => setShowChronicleForm(!showChronicleForm)}>
                {t(showChronicleForm ? "Cancel" : "Add chronicle")}
              </button>
            </div>
            {showChronicleForm ? (
              <ChronicleEditor onClose={() => setShowChronicleForm(false)} />
            ) : (
              <Chronicles token={token} />
            )}
          </>
        )}
      </LayoutConductorManager>
    </Layout>
  );
}

export async function getServerSideProps({ query, req }) {
  return {
    props: { token: query.token },
  };
}
