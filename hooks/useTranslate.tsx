import { useRouter } from "next/router";
import pageTranslate from "../translate/page.translate";

export default function useTranslate(translateJson?: Object) {
  const { locale } = useRouter(),
    translate = translateJson
      ? { ...pageTranslate, ...translateJson }
      : pageTranslate;

  return (text: string): string => {
    const translateTxt = translate[text];
    if (translateTxt) {
      return translateTxt[locale] || text;
    } else {
      return text;
    }
  };
}
