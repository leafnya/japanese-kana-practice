let audio: HTMLAudioElement | null = null
export function playPopSound() {
  if (!audio) {
    audio = new Audio('/sound/pop.mp3')
  }
  audio.currentTime = 0
  audio.play()
}
