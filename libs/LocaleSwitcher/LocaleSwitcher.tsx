import Link from 'next/link'
import { useRouter } from 'next/router'

export default function LocaleSwitcher() {
  const 
    { locales, locale: activeLocale,pathname, query, asPath } = useRouter(),
    otherLocales = locales.filter((locale) => locale !== activeLocale)

  return (
    <div>
        {otherLocales.map((locale) => {
          return (
            <div key={locale}>
              <Link href={{ pathname, query }} as={asPath} locale={locale}>
                <a>{locale}</a>
              </Link>
            </div>
          )
        })}
    </div>
  )
}