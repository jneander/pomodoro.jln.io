export const ONE_SECOND_MS = 1000
export const ONE_MINUTE_MS = 60 * ONE_SECOND_MS

export function minutesToMs(minutes: number) {
  return minutes * ONE_MINUTE_MS
}
