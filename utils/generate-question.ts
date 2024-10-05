import { KANA } from './constants'

export interface Question {
  question: string
  answer: string
  options: [string, string, string, string]
  review: string
}

const lastQuestionRowIdx = -1

export function generateQuestion(): Question {
  const questionCol = Math.floor(Math.random() * 3)
  const answerCol = (questionCol + 1 + Math.floor(Math.random() * 2)) % 3
  let questionRowIdx = Math.floor(Math.random() * KANA.length)
  if (questionRowIdx === lastQuestionRowIdx) {
    questionRowIdx = (questionRowIdx + 1) % KANA.length
  }
  const questionRow = KANA[questionRowIdx]
  const question = questionRow[questionCol]
  const answer = questionRow[answerCol]
  const options: [string, string, string, string] = [answer, '', '', '']
  function getRandomOption() {
    // TODO: 如果 question 和 answer 都不是罗马音，选项仅在同清浊音内选择，否则太容易排除了
    let row = KANA[Math.floor(Math.random() * KANA.length)]
    while (options.includes(row[answerCol]) || row[questionCol] === question) {
      row = KANA[Math.floor(Math.random() * KANA.length)]
    }
    return row[answerCol]
  }
  for (let i = 1; i < 4; i++) {
    options[i] = getRandomOption()
  }
  options.sort(() => Math.random() - 0.5)
  return { question, answer, options, review: questionRow.join(' ') }
}
