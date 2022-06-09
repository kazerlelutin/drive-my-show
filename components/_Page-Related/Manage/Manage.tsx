import ColumnistToDelete from '../../ColumnistToDelete/ColumnistToDelete';
import DeleteShowButton from '../../DeleteShowButton/DeleteShowButton';
import EditShowTitle from '../../EditShowTitle/EditShowTitle';
import useFetch from '../../../hooks/useFetch';
import useTranslate from '../../../hooks/useTranslate';
import { Fetch } from '../../../interfaces/fetch.interface';
import Layout from '../../_Layouts/Layout/Layout';
import LayoutConductorManager from '../../_Layouts/LayoutConductorManager/LayoutConductorManager';
import classes from './Manage.module.css';

interface props {
  readonly token: string;
}

export default function Manage({ token }: props) {
  const t = useTranslate(),
    { loading, data, error }: Fetch = useFetch('/getAdminLinkShow', { token });
  return (
    <Layout title={data?.title || ''}>
      <LayoutConductorManager error={error} loading={loading} token={token}>
        <div className={classes.container}>
          {loading && <div className={classes.page}>...</div>}
          {data && (
            <div className={classes.page}>
              <div className="block">
                <EditShowTitle title={data.title} token={token} />
                <ColumnistToDelete token={token} />
              </div>
              <div className="block">
                <div className={classes.delete}>
                  <div className={classes.label}>
                    {t('Delete this conductor')}
                  </div>
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
