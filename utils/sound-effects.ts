let audio: HTMLAudioElement | null = null
export function playPopSound() {
  if (!audio) {
    const config = useRuntimeConfig()
    audio = new Audio(`${config.app.baseURL}sound/pop.mp3`)
  }
  audio.currentTime = 0
  audio.play()
}
