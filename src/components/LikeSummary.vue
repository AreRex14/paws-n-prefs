<template>
  <div class="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md dark:bg-gray-800">
    <h2
      class="text-2xl font-bold text-center mb-4 text-gray-800 dark:text-gray-200 bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text pb-2"
    >
      You liked {{ likedCats.length }} cat{{ likedCats.length !== 1 ? 's' : '' }}!
    </h2>

    <div class="grid grid-cols-2 gap-4">
      <img
        v-for="(cat, index) in likedCats"
        :key="index"
        :src="cat"
        alt="Liked Cat"
        class="rounded-lg shadow-sm w-full h-32 object-cover"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useCatStore } from '@/stores/catStore'

export default defineComponent({
  setup() {
    const catStore = useCatStore()
    return {
      likedCats: catStore.likedCats,
    }
  },
})
</script>
