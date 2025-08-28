import { defineStore } from 'pinia'
import { fetchMultipleCatImages } from '@/services/catService'

export const useCatStore = defineStore('catStore', {
  state: () => ({
    likedCats: [] as string[],
    dislikedCats: [] as string[],
    catImageUrls: [] as string[],
    loading: false,
  }),
  actions: {
    async fetchCatImages(count: number) {
      this.loading = true
      try {
        const urls = await fetchMultipleCatImages(count)
        this.catImageUrls = urls
      } catch (error) {
        console.error('Error fetching cat images:', error)
      } finally {
        this.loading = false
      }
    },
    likeCat(imageUrl: string) {
      this.likedCats.push(imageUrl)
      this.catImageUrls = this.catImageUrls.filter((url: string) => url !== imageUrl)
    },
    dislikeCat(imageUrl: string) {
      this.dislikedCats.push(imageUrl)
      this.catImageUrls = this.catImageUrls.filter((url: string) => url !== imageUrl)
    },
  },
})
