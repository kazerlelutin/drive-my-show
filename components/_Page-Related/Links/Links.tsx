import ClipBoard from '../../ClipBoard/ClipBoard';
import useCreateLink from '../../../hooks/useCreateLink';
import useFetch from '../../../hooks/useFetch';
import useTranslate from '../../../hooks/useTranslate';
import { Fetch } from '../../../interfaces/fetch.interface';
import Layout from '../../_Layouts/Layout/Layout';
import LayoutConductorManager from '../../_Layouts/LayoutConductorManager/LayoutConductorManager';
import classes from './Links.module.css';

interface props {
  readonly token: string;
}

export default function Links({ token }: props) {
  const t = useTranslate(),
    l = useCreateLink(),
    { loading, error, data }: Fetch = useFetch('/getAdminLinkShow', { token });

  return (
    <Layout title={data?.title || ''}>
      <LayoutConductorManager error={error} loading={loading} token={token}>
        {data && (
          <>
            <div className="block">
              <ClipBoard
                txt={l('slider/' + data.reader)}
                typeTxt="input"
                label={t('Add this link as "Browser" source in OBS')}
              />
            </div>
            <div className="block">
              <ClipBoard
                txt={l('admin/' + data.admin)}
                typeTxt="input"
                label={t('admin link')}
              />
              <ClipBoard
                txt={l('editor/' + data.editor)}
                typeTxt="input"
                label={t('editor link')}
              />
              <ClipBoard
                txt={l('reader/conductor/' + data.reader)}
                typeTxt="input"
                label={t('reader link')}
              />
            </div>
          </>
        )}
      </LayoutConductorManager>
    </Layout>
  );
}
