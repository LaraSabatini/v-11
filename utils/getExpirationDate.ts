/* eslint-disable import/prefer-default-export */
import { today } from "const/time"

export const getExpirationDate = (paidTime: number, comboSelected: number) => {
  const newDate = new Date(today.setMonth(today.getMonth() + paidTime))
  const expireDate = newDate.getDate()
  const expireMonth = newDate.getMonth()
  const expireYear = newDate.getFullYear()
  const finalExpireDay = expireDate > 9 ? expireDate : `0${expireDate}`
  let finalExpireMonth
  if (comboSelected !== null && comboSelected !== undefined) {
    finalExpireMonth =
      expireMonth + 2 > 9 ? expireMonth + 2 : `0${expireMonth + 2}`
  } else {
    finalExpireMonth =
      expireMonth + 1 > 9 ? expireMonth + 1 : `0${expireMonth + 1}`
  }

  return `${finalExpireDay}/${finalExpireMonth}/${expireYear}`
}
