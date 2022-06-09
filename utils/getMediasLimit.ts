export default function getMediasLimit(): number {
  return parseInt(process.env.NEXT_PUBLIC_MEDIA_LIMIT);
}
