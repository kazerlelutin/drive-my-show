import AsyncCreatableSelect from 'react-select/async-creatable';
import reactSelectStyle from '../../styles/reactSelectStyle';
import useTranslate from '../../hooks/useTranslate';
import ColumnistSelectorTranslate from './ColumnistSelector.translate';
import { useRouter } from 'next/router';
import axios from 'axios';

interface props {
  readonly onChange: Function;
  readonly value?: Object;
}

export default function ColumnistSelector({ onChange, value }: props) {
  const { query } = useRouter(),
    t = useTranslate(ColumnistSelectorTranslate),
    inputOptions = {
      instanceId: 'ColumnistSelector',
      isClearable: true,
      defaultOptions: true,
      cacheOptions: true,
      value,
      styles: reactSelectStyle,
      noOptionsMessage: () => t('No columnist found'),
      placeholder: t('Columnist') + '...',
      loadOptions: loadOptions,
      onCreateOption: async (textInput: string) => {
        const { data } = await axios.post('/api/createColumniste', {
          name: textInput,
          token: query.token,
        });
        onChange({ label: data.name, value: data.id });
        return { label: data.name, value: data.id }
      },
      onChange: (choices: Array<{ label: string; value: number }>) =>
        onChange(choices)
        ,
      formatCreateLabel: (inputValue: string) =>
        `Créer le chroniqueur "${inputValue}"`,
    };

  async function loadOptions(input: string, callback: Function) {
    const { data } = await axios.post('/api/getColumnistes', {
      search: input,
      token: query.token,
    });
    callback(data);
    return data;
  }
  return <AsyncCreatableSelect {...inputOptions} />;
}
