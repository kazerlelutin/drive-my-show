export function getReadTime(text: string): string {
  const wordsPerMinute = 120
  const noOfWords = text.split(/\s/g).length
  const minutes = noOfWords / wordsPerMinute
  const readTime = Math.ceil(minutes)
  return `${readTime * 5}`
}
