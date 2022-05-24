import AsyncSelect from 'react-select/async';
import reactSelectStyle from '../../styles/reactSelectStyle';
import useTranslate from '../../hooks/useTranslate';
import ColumnistFilterTranslate from './ColumnistFilter.translate';
import { useRouter } from 'next/router';
import axios from 'axios';

interface props {
  readonly onChange: Function;
  readonly value?: any;
}

export default function ColumnistFilter({ onChange, value }: props) {
  const { query } = useRouter(),
    t = useTranslate(ColumnistFilterTranslate),
    inputOptions = {
      instanceId: 'ColumnistSelector',
      isClearable: true,
      value,
      defaultValue: value,
      defaultOptions:true,
      isMulti:true,
      styles: reactSelectStyle,
      noOptionsMessage: () => t('No columnist found'),
      placeholder: t('Columnist') + '...',
      loadOptions: loadOptions,
      onChange: (choices: Array<{ label: string; value: number }>) =>
        onChange(choices)
        ,
      formatCreateLabel: (inputValue: string) =>
        `Créer le chroniqueur "${inputValue}"`,
    };

  async function loadOptions(input: string, callback: Function) {
    const { data } = await axios.post('/api/getColoumnistsCounters', {
      search: input,
      token: query.token,
    });

    const response= data.columnists.map(o=>({
      label: `${o.name} (${o._count?.chronicles})`,
      value: o,
    }));
    callback(response);
    return response;
  }
  return <AsyncSelect {...inputOptions} />;
}
