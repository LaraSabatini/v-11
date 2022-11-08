/* eslint-disable import/prefer-default-export */

export const getExpirationDate = (paidTime: number, comboSelected: number) => {
  const today = new Date()

  const newDate = new Date(today.setMonth(today.getMonth() + paidTime))
  const expireDate = newDate.getDate()
  const expireMonth = newDate.getMonth()
  const expireYear = newDate.getFullYear()
  const finalExpireDay = expireDate > 9 ? expireDate : `0${expireDate}`

  let finalExpireMonth: string | number
  if (comboSelected !== null && comboSelected !== undefined) {
    finalExpireMonth =
      expireMonth + 2 > 9 ? expireMonth + 2 : `0${expireMonth + 2}`
  } else {
    finalExpireMonth =
      expireMonth + 1 > 9 ? expireMonth + 1 : `0${expireMonth + 1}`
  }

  return `${finalExpireDay}-${finalExpireMonth}-${expireYear}`
}
