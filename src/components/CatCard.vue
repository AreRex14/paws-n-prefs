<template>
  <div
    class="cat-card relative w-64 h-80 bg-white rounded-lg shadow-lg overflow-hidden cursor-grab"
    @touchstart="handleTouchStart"
    @touchmove="handleTouchMove"
    @touchend="handleTouchEnd"
    @mousedown="handleMouseStart"
    @mouseup="handleMouseEnd"
    @mouseleave="handleMouseEnd"
  >
    <img
      :src="imageUrl"
      alt="Cat"
      class="w-full h-full object-cover"
      :class="{ 'transition-transform duration-300': isSwiping }"
      :style="{
        transform: swipeStyle.transform,
        opacity: isSwiping ? 0.8 : 1,
        rotate: `${(touchCurrentX - touchStartX) / 40}deg`,
      }"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  props: {
    imageUrl: {
      type: String,
      required: true,
    },
  },
  setup(props, { emit }) {
    const touchStartX = ref(0)
    const touchCurrentX = ref(0)
    const isSwiping = ref(false)
    const swipeStyle = ref({ transform: 'translateX(0)' })
    const isMouseDown = ref(false)

    // Touch event handlers
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.value = e.touches[0].clientX
      touchCurrentX.value = touchStartX.value
      isSwiping.value = true
    }

    const handleTouchMove = (e: TouchEvent) => {
      touchCurrentX.value = e.touches[0].clientX
      const diff = touchCurrentX.value - touchStartX.value
      swipeStyle.value = { transform: `translateX(${diff}px)` }
    }

    const handleTouchEnd = () => {
      isSwiping.value = false
      const diff = touchCurrentX.value - touchStartX.value

      if (diff > 50) {
        emit('swipe-right')
      } else if (diff < -50) {
        emit('swipe-left')
      }

      swipeStyle.value = { transform: 'translateX(0)' }
    }

    // Mouse event handlers
    const handleMouseStart = (e: MouseEvent) => {
      touchStartX.value = e.clientX
      touchCurrentX.value = e.clientX
      isMouseDown.value = true
      isSwiping.value = true
      // Add event listeners to document for mousemove and mouseup
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseEnd)
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!isMouseDown.value) return
      touchCurrentX.value = e.clientX
      const diff = touchCurrentX.value - touchStartX.value
      swipeStyle.value = { transform: `translateX(${diff}px)` }
    }

    const handleMouseEnd = (e: MouseEvent) => {
      if (!isMouseDown.value) return
      isMouseDown.value = false
      isSwiping.value = false
      // Always update touchCurrentX on mouse up
      touchCurrentX.value = e.clientX
      const diff = touchCurrentX.value - touchStartX.value

      if (diff > 50) {
        emit('swipe-right')
      } else if (diff < -50) {
        emit('swipe-left')
      }

      swipeStyle.value = { transform: 'translateX(0)' }
      // prevent memory leaks
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseEnd)
    }

    return {
      handleTouchStart,
      handleTouchMove,
      handleTouchEnd,
      handleMouseStart,
      handleMouseMove,
      handleMouseEnd,
      isSwiping,
      swipeStyle,
      touchStartX,
      touchCurrentX,
    }
  },
})
</script>

<style scoped>
.cat-card {
  user-select: none;
}
</style>
