/* eslint-disable import/prefer-default-export */
export const evaluateFinalTime = (paidTime: number, usesDay: boolean) => {
  return paidTime !== null && paidTime !== 0
    ? usesDay
      ? paidTime - 1
      : paidTime
    : 0
}
