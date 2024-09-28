<script setup lang="ts">
const question = ref(generateQuestion())
const lastOption = ref(0)
const wrong = ref(false)

function choose(option: number) {
  const correct = question.value.options[option] === question.value.answer
  lastOption.value = option
  if (correct) {
    wrong.value = false
    question.value = generateQuestion()
  }
  else {
    wrong.value = true
  }
}

[['W', 'w', 'ArrowUp'], ['D', 'd', 'ArrowRight'], ['S', 's', 'ArrowDown'], ['A', 'a', 'ArrowLeft']].forEach((keys, i) => {
  onKeyStroke(keys, () => choose(i), { dedupe: true })
})
</script>

<template>
  <div class="flex size-full items-center justify-center">
    <div class="relative">
      <div
        class="flex size-20 items-center justify-center border"
      >
        {{ question.question }}
      </div>
      <OptionCell
        class="-translate-y-full"
        :class="{
          'bg-red-200': wrong && lastOption === 0,
        }"
        @click="choose(0)"
      >
        {{ question.options[0] }}
      </OptionCell>
      <OptionCell
        class="translate-x-full"
        :class="{
          'bg-red-200': wrong && lastOption === 1,
        }"
        @click="choose(1)"
      >
        {{ question.options[1] }}
      </OptionCell>
      <OptionCell
        class="translate-y-full"
        :class="{
          'bg-red-200': wrong && lastOption === 2,
        }"
        @click="choose(2)"
      >
        {{ question.options[2] }}
      </OptionCell>
      <OptionCell
        class="-translate-x-full"
        :class="{
          'bg-red-200': wrong && lastOption === 3,
        }"
        @click="choose(3)"
      >
        {{ question.options[3] }}
      </OptionCell>
    </div>
  </div>
</template>

<style>
html, body, #__nuxt {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>
