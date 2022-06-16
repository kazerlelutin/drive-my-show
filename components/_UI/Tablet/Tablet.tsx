import classes from './Tablet.module.css';
import { ReactChild } from 'react';
import Image from 'next/image';
import { CSSTransition } from 'react-transition-group';

interface props {
  readonly img: string;
  readonly setCurrent: Function;
  readonly current: string;
  readonly name: string;
  readonly children: ReactChild;
}
export default function Tablet({
  img,
  setCurrent,
  current,
  name,
  children,
}: props) {
  return (
    <div className={classes.container}>
      <div
        className={classes.tablet}
        onClick={() => setCurrent(current === name ? '' : name)}
      >
        {current === name ? (
          <div  className={classes.cross}/>
        ) : (
          <Image src={img} alt={name} width={40} height={40} />
        )}
      </div>
      <CSSTransition in={current === name } timeout={200} classNames="alert" unmountOnExit>
      <div className={classes.popin}>{children}</div>
      </CSSTransition>
    </div>
  );
}
