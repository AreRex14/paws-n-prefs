<template>
  <div class="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
    <h2 class="text-2xl font-bold text-center mb-4">You liked {{ likedCats.length }} cats!</h2>
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
