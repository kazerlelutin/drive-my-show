import TwitchConnectButton from '../TwitchConnectButton/TwitchConnectButton';
import Tablet from '../_UI/Tablet/Tablet';
import classes from './TwitchChat.module.css';

interface props {
  readonly setCurrent: Function
  readonly current: string
}

export default function TwitchChat({setCurrent, current}:props){

  return <Tablet img='/twitch.webp' setCurrent={setCurrent} current={current} name={'twitchChat'}>
    <div className="con">
      <TwitchConnectButton/>
    </div>
  </Tablet>
}