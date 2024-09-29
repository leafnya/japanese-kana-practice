<script setup lang="ts">
const question = ref(generateQuestion())
const lastOption = ref(0)
const hasWrong = ref(false)

const score = ref(0)
const questionCount = ref(0)
function reset() {
  score.value = 0
  questionCount.value = 0
  hasWrong.value = false
  question.value = generateQuestion()
}
onKeyStroke(['R', 'r'], reset)
const isScoreVisible = ref(true)
function toggleScoreVisible() {
  isScoreVisible.value = !isScoreVisible.value
}
onKeyStroke(['H', 'h'], toggleScoreVisible)

function choose(option: number) {
  const correct = question.value.options[option] === question.value.answer
  lastOption.value = option
  if (correct) {
    if (!hasWrong.value) {
      score.value++
    }
    else {
      hasWrong.value = false
    }
    question.value = generateQuestion()
    questionCount.value++
  }
  else {
    hasWrong.value = true
  }
}

[['W', 'w', 'ArrowUp'], ['D', 'd', 'ArrowRight'], ['S', 's', 'ArrowDown'], ['A', 'a', 'ArrowLeft']].forEach((keys, i) => {
  onKeyStroke(keys, () => choose(i), { dedupe: true })
})
</script>

<template>
  <main class="flex size-full flex-col items-center justify-between bg-zinc-900 text-xl text-white">
    <header class="h-20 flex-shrink-[999]" />
    <div class="relative m-20">
      <div
        class="flex size-20 items-center justify-center font-medium"
      >
        {{ question.question }}
      </div>
      <OptionCell
        class="-translate-y-full border-purple-500"
        :wrong="hasWrong && lastOption === 0"
        @click="choose(0)"
      >
        {{ question.options[0] }}
      </OptionCell>
      <OptionCell
        class="translate-x-full border-amber-300"
        :wrong="hasWrong && lastOption === 1"
        @click="choose(1)"
      >
        {{ question.options[1] }}
      </OptionCell>
      <OptionCell
        class="translate-y-full border-pink-400"
        :wrong="hasWrong && lastOption === 2"
        @click="choose(2)"
      >
        {{ question.options[2] }}
      </OptionCell>
      <OptionCell
        class="-translate-x-full border-lime-400"
        :wrong="hasWrong && lastOption === 3"
        @click="choose(3)"
      >
        {{ question.options[3] }}
      </OptionCell>
    </div>
    <footer class="mb-16 mt-4 flex w-full flex-shrink flex-col items-stretch justify-center space-y-2">
      <div
        class="flex items-center justify-center space-x-1 text-3xl"
        :class="{
          'opacity-0': !isScoreVisible,
        }"
      >
        <span>{{ score }}</span><span>/</span><span>{{ questionCount }}</span>
      </div>
      <div class="flex items-center justify-center space-x-3 text-2xl">
        <button
          title="R"
          @click="reset"
        >
          <Icon name="fluent-emoji-flat:right-arrow-curving-left" />
        </button>
        <button
          title="H"
          @click="toggleScoreVisible"
        >
          <Icon :name="isScoreVisible ? 'fluent-emoji-flat:face-savoring-food' : 'fluent-emoji-flat:face-with-peeking-eye'" />
        </button>
      </div>
    </footer>
  </main>
</template>

<style>
html, body, #__nuxt {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  cursor: default;
}
</style>
