<script setup lang="ts">
useSeoMeta({
  title: 'KanaNya | 日语假名练习',
  description: 'KanaNya 是一个为日语初学者准备的假名练习小工具，通过对平假名、片假名和罗马音选择配对来强化你的记忆。',
  keywords: '日语, 假名, 平假名, 片假名, 罗马音, 练习, 记忆, 学习, 工具, kana, japanese, hiragana, KanaNya, romaji',
})

const config = useRuntimeConfig()
useHead({
  link: [
    {
      rel: 'icon',
      type: 'image/x-icon',
      href: `${config.app.baseURL}favicon.ico`,
    },
  ],
})

const lastQuestion = ref<Question | null>(null)
const question = ref(generateQuestion())
const lastOption = ref(0)
const hasWrong = ref(false)
const isTipsVisible = ref(true)

const score = ref(0)
const questionCount = ref(0)
function reset() {
  score.value = 0
  questionCount.value = 0
  hasWrong.value = false
  lastQuestion.value = null
  question.value = generateQuestion()
}
onKeyStroke(['R', 'r'], reset)
const isScoreVisible = ref(true)
function toggleScoreVisible() {
  isScoreVisible.value = !isScoreVisible.value
}
onKeyStroke(['H', 'h'], toggleScoreVisible)

function choose(option: number) {
  if (isTipsVisible.value) isTipsVisible.value = false
  const correct = question.value.options[option] === question.value.answer
  lastOption.value = option
  if (correct) {
    if (!hasWrong.value) {
      score.value++
    }
    else {
      hasWrong.value = false
    }
    lastQuestion.value = question.value
    question.value = generateQuestion()
    questionCount.value++
  }
  else {
    hasWrong.value = true
  }
  playPopSound()
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
        :tips="isTipsVisible ? 'W ↑' : undefined"
        @click="choose(0)"
      >
        {{ question.options[0] }}
      </OptionCell>
      <OptionCell
        class="translate-x-full border-amber-300"
        :wrong="hasWrong && lastOption === 1"
        :tips="isTipsVisible ? 'D →' : undefined"
        @click="choose(1)"
      >
        {{ question.options[1] }}
      </OptionCell>
      <OptionCell
        class="translate-y-full border-pink-400"
        :wrong="hasWrong && lastOption === 2"
        :tips="isTipsVisible ? 'S ↓' : undefined"
        @click="choose(2)"
      >
        {{ question.options[2] }}
      </OptionCell>
      <OptionCell
        class="-translate-x-full border-lime-400"
        :wrong="hasWrong && lastOption === 3"
        :tips="isTipsVisible ? 'A ←' : undefined"
        @click="choose(3)"
      >
        {{ question.options[3] }}
      </OptionCell>
      <div
        v-if="lastQuestion"
        class="absolute left-0 top-0 -translate-x-full -translate-y-full p-1.5 text-sm opacity-30"
      >
        {{ lastQuestion.review }}
      </div>
    </div>
    <footer class="mb-16 mt-4 flex w-full flex-shrink flex-col items-stretch justify-center space-y-2">
      <div
        class="flex items-center justify-center space-x-1 text-3xl"
        :class="{
          'opacity-0': !isScoreVisible && !isTipsVisible,
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
    <audio
      class="size-0 opacity-0"
      src="/sound/pop.mp3"
      preload="auto"
    />
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
