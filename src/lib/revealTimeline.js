const WORD_SPAN = 1
const WORD_STEP = 0.5
const SENTENCE_GAP = 1.2

const SENTENCE_PATTERN = /[^.!?]+[.!?]+(?:["')\]]+)?|[^.!?]+$/g

export function splitSentences(text) {
  const matches = text.match(SENTENCE_PATTERN)
  if (!matches) return [text]
  return matches.map((sentence) => sentence.trim()).filter(Boolean)
}

export function buildTimeline(text) {
  const sentences = splitSentences(text)
  const words = []
  let cursor = 0

  sentences.forEach((sentence) => {
    const parts = sentence.split(/\s+/).filter(Boolean)

    parts.forEach((word, index) => {
      const start = cursor + index * WORD_STEP
      words.push({ word, start, end: start + WORD_SPAN })
    })

    if (parts.length) {
      const last = words[words.length - 1]
      cursor = last.start + WORD_SPAN + SENTENCE_GAP
    }
  })

  const total = words.length ? words[words.length - 1].end : 1

  return words.map((entry) => ({
    word: entry.word,
    start: entry.start / total,
    end: entry.end / total,
  }))
}
