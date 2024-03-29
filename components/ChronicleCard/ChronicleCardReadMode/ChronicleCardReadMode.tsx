import classes from './ChronicleCardReadMode.module.css'
import Chronicle from '../../../interfaces/chronicle.interface'
import { ReactElement, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import excerpt from '../../../utils/excerpt'
import useTranslate from '../../../hooks/useTranslate'
import pageTranslate from '../../../translate/page.translate'
import ChronicleDeleteModale from '../../ChronicleDeleteModale/ChronicleDeleteModale'
import { getReadTime } from '../../../utils/get-read-time'

interface props {
  readonly chronicle: Chronicle
  readonly UpAndDownChronicles: ReactElement
  readonly MediasForCard: ReactElement
  readonly updateMode: Function
  readonly refetch: Function
}

export default function ChronicleCardReadMode({
  chronicle,
  UpAndDownChronicles,
  MediasForCard,
  updateMode,
  refetch,
}: props) {
  const [isDelete, setIsDelete] = useState<boolean>(false),
    t = useTranslate(pageTranslate)
  return (
    <>
      {isDelete && (
        <ChronicleDeleteModale
          refetch={refetch}
          id={chronicle.id}
          title={chronicle.title}
          onClose={setIsDelete}
        />
      )}
      <div className={classes.container} id={`${chronicle.id}`}>
        <div className={classes.drag}>{UpAndDownChronicles}</div>
        <div className={classes.content}>
          <header className={classes.header}>
            <div className={classes.title}>{chronicle.title}</div>
            <div className={classes.state} data-state={chronicle.state}>
              {t(chronicle.state)}
            </div>
          </header>
          <div className={classes.columnist}>
            {chronicle?.columnist?.name}
            <span className={classes.duration}>
              {getReadTime(chronicle.content)}
            </span>
          </div>
          {chronicle.link && (
            <a href={chronicle.link} target="_blank" rel="noreferrer">
              <div className={classes.link}>{chronicle.link}</div>
            </a>
          )}
          <div className={classes.excerpt}>
            <ReactMarkdown>{excerpt(chronicle.content, 50)}</ReactMarkdown>
          </div>
          {MediasForCard}
          <div className={classes.buttons}>
            <button className="cancel" onClick={() => setIsDelete(true)}>
              {t('Delete')}
            </button>
            <button onClick={() => updateMode(chronicle)}>{t('Edit')}</button>
          </div>
        </div>
      </div>
    </>
  )
}
