import {ONE_MINUTE_MS, ONE_SECOND_MS} from './timing.js'

export class Timer {
  public isRunning: boolean

  private durationMs: number
  private currentTimeMs: number
  private onUpdateCallback: () => void
  private intervalId: ReturnType<typeof setInterval> | null
  private referenceTimestamp: number

  constructor(durationMs = 5 * ONE_SECOND_MS) {
    this.durationMs = durationMs
    this.currentTimeMs = this.durationMs

    this.isRunning = false
    this.onUpdateCallback = () => {}

    this.intervalId = null
    this.referenceTimestamp = -1
  }

  onUpdate(callback: () => void): void {
    this.onUpdateCallback = callback
  }

  getTime(): [number, number] {
    return [(this.currentTimeMs / ONE_MINUTE_MS) | 0, (this.currentTimeMs % ONE_MINUTE_MS) / 1000]
  }

  setDuration(durationMs: number) {
    this.durationMs = durationMs
    this.currentTimeMs = this.durationMs
    this.referenceTimestamp = Date.now()
  }

  start() {
    if (this.intervalId) {
      return
    }

    this.referenceTimestamp = Date.now()
    this.intervalId = setInterval(this.tick.bind(this), 100)
    this.isRunning = true
  }

  stop() {
    if (!this.intervalId) {
      return
    }

    clearInterval(this.intervalId)
    this.intervalId = null
    this.isRunning = false
  }

  reset() {
    this.currentTimeMs = this.durationMs
    this.onUpdateCallback()
  }

  private tick(): void {
    const currentTimestamp = Date.now()
    const diff = currentTimestamp - this.referenceTimestamp

    if (diff < ONE_SECOND_MS) {
      return
    }

    const secondsElapsedMs = ((diff / ONE_SECOND_MS) | 0) * ONE_SECOND_MS

    this.currentTimeMs -= secondsElapsedMs
    this.referenceTimestamp += secondsElapsedMs

    if (this.currentTimeMs <= 0) {
      this.stop()
    }

    this.onUpdateCallback()
  }
}
