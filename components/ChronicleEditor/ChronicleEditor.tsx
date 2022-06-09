/* eslint-disable react-hooks/exhaustive-deps */
import classes from './ChronicleEditor.module.css';
import dynamic from 'next/dynamic';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import { useReducer, useEffect } from 'react';
import ColumnistSelector from '../ColumnistSelector/ColumnistSelector';
import { reducer, initialState, ActionKind } from './ChronicleEditor.reducer';
import useTranslate from '../../hooks/useTranslate';
import pageTranslate from '../../translate/page.translate';
import SubmitButton from '../../UI/SubmitButton/SubmitButton';
import useLazyFetch from '../../hooks/useLazyFetch';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import Chronicle from '../../interfaces/chronicle.interface';
import MediasEditor from '../MediasEditor/MediasEditor';

const MarkdownEditor = dynamic(() => import('@uiw/react-md-editor'), {
  ssr: false,
});

interface props {
  readonly onClose: Function;
  readonly chronicle?: Chronicle;
  readonly refetch?: Function;
}
export default function ChronicleEditor({
  onClose,
  chronicle,
  refetch,
}: props) {
  const t = useTranslate(pageTranslate),
    { query } = useRouter(),
    { token } = query,
    { loading, error, data, api } = useLazyFetch(
      chronicle ? '/updateChronicle' : '/createChronicle'
    ),
    [state, dispatch] = useReducer(reducer, chronicle || initialState);

  function handleSubmit() {
    if (loading) return;
    if (!state.title) return toast.warning(t('Title is required'));
    if (!state.columnist) return toast.warning(t('Need a columnist'));
    api({ ...state, token });
  }
  useEffect(() => {
    // clean to close (on open in real life)
    dispatch(
      chronicle
        ? { type: ActionKind.setChronicle, payload: chronicle }
        : { type: ActionKind.setReset, payload: undefined }
    );
  }, []);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  useEffect(() => {
    if (data) {
      toast.success(
        t(chronicle && refetch ? 'Chronicle updated !' : 'Chronicle created !')
      );
      refetch();
      onClose();
    }
  }, [data]);

  return (
    <div className={classes.container}>
      <fieldset>
        <label>{t('title')}</label>
        <input
          type="text"
          value={state.title}
          placeholder={t('required')}
          onChange={(e) =>
            dispatch({ type: ActionKind.setTitle, payload: e.target.value })
          }
        />
      </fieldset>
      <fieldset>
        <label>{t('columnist')}</label>
        <ColumnistSelector
          onChange={(value: Object) =>
            dispatch({ type: ActionKind.setColumnist, payload: value })
          }
          value={state.columnist}
        />
      </fieldset>
      <fieldset>
        <label>{t('link')}</label>
        <input
          type="text"
          value={state.link}
          placeholder={t('optional')}
          onChange={(e) =>
            dispatch({ type: ActionKind.setLink, payload: e.target.value })
          }
        />
      </fieldset>
      <fieldset>
        <label>{t('duration (in min)')}</label>
        <input
          type="number"
          value={state.duration}
          placeholder={t('optional')}
          onChange={(e) =>
            dispatch({ type: ActionKind.setDuration, payload: e.target.value })
          }
        />
      </fieldset>
      <MarkdownEditor
        height={400}
        minHeight={300}
        enableScroll={false}
        preview="edit"
        value={state.content}
        onChange={(value: string) =>
          dispatch({ type: ActionKind.setContent, payload: value })
        }
      />
      {typeof token === 'string' && (
        <MediasEditor
          token={token}
          medias={state.medias}
          sendMedias={(value: any) =>
            dispatch({ type: ActionKind.setMedias, payload: value })
          }
        />
      )}{' '}
      <div className={classes.buttons} data-alone={!!chronicle}>
        {chronicle && (
          <div onClick={() => onClose()} className={classes.button}>
            <SubmitButton isLoading={loading} txt={t('close')} />
          </div>
        )}
        <div onClick={handleSubmit} className={classes.button}>
          <SubmitButton
            isLoading={loading}
            txt={t(chronicle ? 'update' : 'publish')}
          />
        </div>
      </div>
    </div>
  );
}
