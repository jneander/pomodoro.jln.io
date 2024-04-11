import {ONE_SECOND_MS} from './timing'

import alarmDigitalMp3 from './audio/alarm-digital.mp3'
import buttonDigitalMp3 from './audio/button-digital.mp3'

const ALARM_DURATION_MS = 3 * ONE_SECOND_MS

const alarmAudio = new Audio(alarmDigitalMp3)
const buttonPressAudio = new Audio(buttonDigitalMp3)

export function playAlarm() {
  alarmAudio.loop = true
  alarmAudio.play()

  /* Fit the full length of the audio file so that it isn't clipped mid-sound. */
  const fullDuration =
    ((ALARM_DURATION_MS / (alarmAudio.duration * ONE_SECOND_MS)) | 0) *
    alarmAudio.duration *
    ONE_SECOND_MS

  return new Promise<void>((resolve) => {
    setTimeout(() => {
      alarmAudio.pause()
      alarmAudio.currentTime = 0
      resolve()
    }, fullDuration)
  })
}

export function playButtonPress() {
  buttonPressAudio.play()
  /* Reset to start so that subsequent presses also play sound */
  buttonPressAudio.currentTime = 0
}
