<script setup lang="ts">
const { wrong, tips } = defineProps<{ wrong: boolean, tips?: string }>()
</script>

<template>
  <button
    class="absolute inset-0 flex size-20 items-center justify-center rounded-xl border-2 font-medium transition-colors"
    :class="{ 'bg-red-500/80 ': wrong }"
  >
    <span
      class="relative"
      :class="{ 'animate-[bounce_0.3s_ease]': wrong }"
    >
      <slot />
      <div class="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full whitespace-nowrap text-sm opacity-30">{{ tips }}</div>
    </span>
  </button>
</template>
