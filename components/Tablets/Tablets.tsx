import classes from './Tablets.module.css';
import { useState } from 'react';
import TwitchChatPopin from '../TwitchChatPopin/TwitchChatPopin';

export default function Tablets(){
  const [current,setCurrent] = useState<string>('');

  return <div className={classes.container}>
    <TwitchChatPopin setCurrent={setCurrent} current={current}/>
  </div>
}