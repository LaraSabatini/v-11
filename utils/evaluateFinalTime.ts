/* eslint-disable import/prefer-default-export */
export const evaluateFinalTime = (paidTime: number, usesDay: boolean) => {
  let finalTime = 0
  if (paidTime !== null && paidTime !== 0) {
    if (usesDay) {
      finalTime = paidTime - 1
    } else {
      finalTime = paidTime
    }
  } else {
    finalTime = 0
  }

  return finalTime
}
