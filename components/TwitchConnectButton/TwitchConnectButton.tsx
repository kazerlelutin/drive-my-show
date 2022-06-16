import { useRouter } from 'next/router';
import classes from './TwitchConnectButton.module.css';
import { useEffect } from 'react';
import { LS_REDIRECT_TWITCH } from '../../utils/constants';

export default function TwitchConnectButton() {
  const {asPath} = useRouter(),
  url = encodeURI(
    'https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=' +
      process.env.NEXT_PUBLIC_ID_TWITCH +
      '&redirect_uri=' +
      window.location.protocol +"//"+ window.location.host + '/twitch' +
      '&scope=chat:read+chat:edit'
  );

  useEffect(()=>{
    localStorage.setItem(LS_REDIRECT_TWITCH,asPath);
  },[asPath]);

  return (
    <div className={classes.container}>
      <a href={url} target={'_blank'} rel="noreferrer">
        se connecter à twitch
      </a>
    </div>
  );
}
