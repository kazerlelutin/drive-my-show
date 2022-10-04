import dayjs from 'dayjs';
import _ from 'lodash';
import { useState } from 'react';
import ChronicleEditor from '../../ChronicleEditor/ChronicleEditor';
import Chronicles from '../../Chronicles/Chronicles';
import useFetch from '../../../hooks/useFetch';
import useTranslate from '../../../hooks/useTranslate';
import { Fetch } from '../../../interfaces/fetch.interface';
import Layout from '../../_Layouts/Layout/Layout';
import LayoutConductorManager from '../../_Layouts/LayoutConductorManager/LayoutConductorManager';
import classes from './Write.module.css';
import { toast } from 'react-toastify';
import getChroniclesLimit from '../../../utils/getChroniclesLimit';

interface props {
  readonly token: string;
}

export default function Write({ token }: props) {
  const t = useTranslate(),
    [showChronicleForm, setShowChronicleForm] = useState<boolean>(false),
    { loading, error, data, refetch }: Fetch = useFetch('/getAdminShow', {
      token,
    });

  function handleAddShowChronicleForm() {
    if (data._count.chronicles >= getChroniclesLimit()) {
      toast.error(t("You can't create more chronicles."));
    } else {
      setShowChronicleForm(!showChronicleForm);
    }
  }

  return (
    <Layout title={_.get(data, 'title','conducteur')}>
      <LayoutConductorManager error={error} loading={loading} token={token}>
        {data && (
          <>
            <header className={classes.header}>
              <h1 className={classes.title}>{data.title}</h1>
              <div className={classes.expire}>
                {t('Expires')} {dayjs(data.trigger).add(30, 'days').fromNow()}
              </div>
            </header>
            <div className={classes.actions}>
              <button
                title={t(
                  data._count.chronicles >=  getChroniclesLimit()
                    ? "You can't create more chronicles."
                    : 'Create a chronicle'
                )}
                onClick={handleAddShowChronicleForm}
                disabled={data._count.chronicles >= getChroniclesLimit()}
              >
                {t(showChronicleForm ? 'Cancel' : 'Add chronicle')}
              </button>
            </div>
            {showChronicleForm ? (
              <ChronicleEditor
                onClose={() => setShowChronicleForm(false)}
                refetch={refetch}
              />
            ) : (
              <Chronicles token={token} />
            )}
          </>
        )}
      </LayoutConductorManager>
    </Layout>
  );
}
