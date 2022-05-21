/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import useTranslate from '../../hooks/useTranslate';
import SubmitButton from '../SubmitButton/SubmitButton';
import classes from './CreateShowForm.module.css';
import CreateShowFormTranslate from './CreateShowForm.translate';
import useLazyFetch from '../../hooks/useLazyFetch';

export default function CreateShowForm() {
  const 
    [value, setValue] = useState<string>(''),
    {data,loading,error, fetch} = useLazyFetch('/createShow'),
    router = useRouter(),
    t = useTranslate(CreateShowFormTranslate);

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    if (!value) return toast.error(t('You must enter a title !'));
    fetch({ title: value })
  };

  useEffect(()=>{
    if(data) router.push('/admin/' + data);
  },[data]);

  useEffect(()=>{
    if(error)  toast.error(t('e'));
  },[error]);

  return (
    <form className={classes.container} onSubmit={(e) => handleSubmit(e)}>
      <input
        type="text"
        placeholder={t(`Conductor's title`)}
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />
      <SubmitButton txt={t('Create my conductor')} isLoading={loading} />
    </form>
  );
}
