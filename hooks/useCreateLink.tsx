import { useRouter } from 'next/router';

export default function useCreateLink():Function {
  const {locale} = useRouter();
  return (url:string)=> `${window.location.protocol}//${window.location.host}/${locale}/${url}`
}
