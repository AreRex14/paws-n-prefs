<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useCatStore } from '@/stores/catStore'
import SwipeArea from '@/components/SwipeArea.vue'
import LikeSummary from '@/components/LikeSummary.vue'
import CatCard from './components/CatCard.vue'

const catStore = useCatStore()
const showSummary = ref(false)

const reloadCats = async () => {
  showSummary.value = false
  catStore.likedCats = []
  catStore.dislikedCats = []
  await catStore.fetchCatImages(10)
}

onMounted(async () => {
  await catStore.fetchCatImages(10) // Fetch 10 cat images
})

const handleAllCatsReviewed = () => {
  showSummary.value = true
}

// Watch for changes, handle edge cases
watch(
  () => catStore.catImageUrls.length,
  (newLength) => {
    console.log('Cats left in App.vue:', newLength)
    if (newLength === 0 && catStore.likedCats.length > 0) {
      showSummary.value = true
    }
  },
)
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-br from-indigo-100 via-pink-50 to-yellow-100 p-4 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-700"
  >
    <h1 class="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-gray-100">
      Paws & Preferences
    </h1>
    <p class="text-center text-gray-600 mb-8 dark:text-gray-300">
      Swipe right to like, left to dislike!
    </p>

    <SwipeArea
      v-if="!showSummary && catStore.catImageUrls.length > 0"
      @allCatsReviewed="handleAllCatsReviewed"
      :loading="catStore.loading"
    >
      <CatCard :imageUrl="catStore.catImageUrls[0]" :disabled="catStore.loading" />
    </SwipeArea>
    <div v-else-if="showSummary" class="flex flex-col items-center">
      <LikeSummary />
      <button
        @click="reloadCats"
        class="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition-colors dark:bg-indigo-800 dark:hover:bg-indigo-900"
      >
        Another Round!
      </button>
    </div>
    <div v-else class="flex flex-col items-center justify-center text-gray-500 mt-12">
      <svg
        class="animate-spin h-8 w-8 text-indigo-600 mb-3"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
      </svg>
      <span>Loading cats...</span>
    </div>
  </div>
</template>

<style scoped></style>
