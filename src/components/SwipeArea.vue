<script setup lang="ts">
import { useCatStore } from '@/stores/catStore'
import CatCard from '@/components/CatCard.vue'
import { computed, watch } from 'vue'

const catStore = useCatStore()
const currentCatUrl = computed(() => catStore.catImageUrls[0])

const handleSwipeLeft = () => {
  if (currentCatUrl.value) {
    catStore.dislikeCat(currentCatUrl.value)
  }
}

const handleSwipeRight = () => {
  if (currentCatUrl.value) {
    catStore.likeCat(currentCatUrl.value)
  }
}

const emit = defineEmits(['allCatsReviewed'])

watch(
  () => catStore.catImageUrls.length,
  (newLength) => {
    console.log('Remaining cats:', newLength)
    if (newLength === 0) {
      emit('allCatsReviewed')
    }
  },
  { immediate: true }, // Check immediately
)
</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <CatCard
      v-if="currentCatUrl"
      :imageUrl="currentCatUrl"
      @swipe-left="handleSwipeLeft"
      @swipe-right="handleSwipeRight"
    />
    <p v-else class="text-center text-gray-500">No more cats to review!</p>
  </div>
</template>
