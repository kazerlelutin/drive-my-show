import Tablet from '../_UI/Tablet/Tablet';
import classes from './Tablets.module.css';
import { useState } from 'react';
import TwitchChat from '../TwitchChat/TwitchChat';

export default function Tablets(){
  const [current,setCurrent] = useState<string>('');

  return <div className={classes.container}>
    <TwitchChat setCurrent={setCurrent} current={current}/>
  </div>
}