<script setup lang="ts">
const { wrong } = defineProps<{ wrong: boolean }>()
</script>

<template>
  <button
    class="absolute inset-0 flex size-20 items-center justify-center rounded-xl border-2 font-medium transition-colors"
    :class="{ 'bg-red-500/80 ': wrong }"
  >
    <span :class="{ 'animate-[bounce_0.3s_ease]': wrong }">
      <slot />
    </span>
  </button>
</template>
