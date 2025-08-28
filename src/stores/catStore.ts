import { defineStore } from 'pinia'
import { fetchMultipleCatImages } from '@/services/catService'

export const useCatStore = defineStore('catStore', {
  state: () => ({
    likedCats: [] as string[],
    dislikedCats: [] as string[],
    catImageUrls: [] as string[],
  }),
  actions: {
    async fetchCatImages(count: number) {
      this.catImageUrls = await fetchMultipleCatImages(count)
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
