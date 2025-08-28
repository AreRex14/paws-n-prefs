export const fetchMultipleCatImages = async (count: number): Promise<string[]> => {
  const urls: string[] = []
  for (let i = 0; i < count; i++) {
    const response = await fetch('https://cataas.com/cat?json=true')
    const data = await response.json()
    urls.push(data.url)
  }
  return urls
}
