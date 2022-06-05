import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import useFetch from '../../hooks/useFetch';
import useTranslate from '../../hooks/useTranslate';
import Chronicle from '../../interfaces/chronicle.interface';
import { UiContext } from '../../store/ui.store';
import ClipBoard from '../ClipBoard/ClipBoard';
import LayoutConductorManager from '../LayoutConductorManager/LayoutConductorManager';
import classes from './Resume.module.css';

interface props {
    readonly token: string;
    readonly type: string;
  }

export default function Resume({ token, type }: props){
    const 
    {socket} = useContext(UiContext),
    { loading, error, data } = useFetch("/getConductor", {
      token: token,
    }),
    t = useTranslate(),
    [refresh,setRefresh] = useState<string>('')
  
    useEffect(() => {
      socket.on("connect", () => {
        socket.on(`conductor-${type}-${token}`, () => {
          setRefresh('refresh')
          toast.info(t('Update detected, reload the page.'), {
            toastId: refresh
          });
          setTimeout(()=>{
            setRefresh('')
          },5000)
        });
      });
    }, []);

    return <LayoutConductorManager error={error} loading={loading}>
    {data && (
      <div className={classes.page}>
        <h1 className={classes.title}>{data.title}</h1>
        {data.chronicles.map((chronicle: Chronicle) => (
          <div className={classes.chronicle} key={chronicle.id} id={`${chronicle.id}`}>
            <div className={classes.title}>{chronicle.title}</div>
            <div className={classes.columnist}>{chronicle.columnist.name}</div>
            {chronicle.link && <ClipBoard txt={chronicle.title}  typeTxt='input' label={t('title')}/> }
            {chronicle.link && <ClipBoard txt={chronicle.link}  typeTxt='input' label={t('link')}/> }
          </div>
        ))}
      </div>
    )}
  </LayoutConductorManager>
} 