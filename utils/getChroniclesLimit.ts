
export default function getChroniclesLimit():number{
  return parseInt(process.env.NEXT_PUBLIC_CHRONICLE_LIMIT)
}
