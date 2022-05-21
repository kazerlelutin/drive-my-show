export default function excerpt(txt: string, numWords: number): string {
  const splitTxt = txt.split(" ");

  return splitTxt.length > numWords
    ? splitTxt.slice(0, numWords).join(" ") + " [...]"
    : txt;
}
