import {playAlarm, playButtonPress} from './sound.js'
import {Timer} from './timer.js'
import {minutesToMs} from './timing.js'
import type {SequenceStep} from './types.js'

import nextSvg from './svg/next.svg?raw'
import resetSvg from './svg/reset.svg?raw'
import startSvg from './svg/start.svg?raw'
import pauseSvg from './svg/pause.svg?raw'

const appContainer = document.querySelector('main') as HTMLElement
const time = appContainer.querySelector('.time') as HTMLElement
const startPauseButton = appContainer.querySelector(
  '[data-action="start-pause"'
) as HTMLButtonElement
const resetButton = appContainer.querySelector('[data-action="reset"]') as HTMLButtonElement
const nextButton = appContainer.querySelector('[data-action="next"]') as HTMLButtonElement

const sequence: SequenceStep[] = [
  {duration: 25, type: 'session'},
  {duration: 5, type: 'break'},
]

let currentSequenceIndex = 0

function setIconButtonContent(button: HTMLButtonElement, svg: string, label: string): void {
  button.innerHTML = `${svg}<span class="visually-hidden">${label}</span>`
}

const timer = new Timer()

timer.onUpdate(() => {
  setTime()

  if (!timer.isRunning) {
    updateStartPauseButton()
  }

  const [m, s] = timer.getTime()
  if (m + s > 0) {
    return
  }

  timer.stop()
  playAlarm().then(() => {
    advanceSequence()
    timer.start()
  })
})

setSequenceStep(sequence[currentSequenceIndex])

function updateStartPauseButton() {
  if (timer.isRunning) {
    setIconButtonContent(startPauseButton, pauseSvg, 'Pause')
  } else {
    setIconButtonContent(startPauseButton, startSvg, 'Start')
  }
}

function setTime() {
  const [minutes, seconds] = timer.getTime()

  time.innerText = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

startPauseButton.addEventListener('click', () => {
  playButtonPress()

  if (timer.isRunning) {
    timer.stop()
  } else {
    const [m, s] = timer.getTime()
    if (m + s > 0) {
      timer.start()
    }
  }

  updateStartPauseButton()
})

resetButton.addEventListener('click', () => {
  playButtonPress()

  if (timer.isRunning) {
    return
  }

  timer.reset()
})

nextButton.addEventListener('click', () => {
  playButtonPress()
  advanceSequence()
})

setIconButtonContent(nextButton, nextSvg, 'Next')
setIconButtonContent(resetButton, resetSvg, 'Reset')
updateStartPauseButton()
setTime()

function setSequenceStep(step: SequenceStep) {
  document.body.dataset['step'] = step.type
  timer.setDuration(minutesToMs(step.duration))
}

function advanceSequence() {
  currentSequenceIndex = (currentSequenceIndex + 1) % sequence.length
  setSequenceStep(sequence[currentSequenceIndex])
  setTime()
}
