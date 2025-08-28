<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useCatStore } from '@/stores/catStore'
import SwipeArea from '@/components/SwipeArea.vue'
import LikeSummary from '@/components/LikeSummary.vue'
import CatCard from './components/CatCard.vue'

const catStore = useCatStore()
const showSummary = ref(false)

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
  <div class="min-h-screen bg-gray-100 p-4">
    <h1 class="text-3xl font-bold text-center mb-6 text-gray-800">Paws & Preferences</h1>
    <p class="text-center text-gray-600 mb-8">Swipe right to like, left to dislike!</p>

    <SwipeArea
      v-if="!showSummary && catStore.catImageUrls.length > 0"
      @allCatsReviewed="handleAllCatsReviewed"
    >
      <CatCard :imageUrl="catStore.catImageUrls[0]" />
    </SwipeArea>
    <LikeSummary v-else-if="showSummary" />
    <div v-else class="text-center text-gray-500">Loading cats...</div>
  </div>
</template>

<style scoped></style>
