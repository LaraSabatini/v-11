/* eslint-disable import/prefer-default-export */
import formatDescendingDate from "components/Trainers/Helpers/formatDescendingDate"

interface CalculateExpireDateInterface {
  date: string
  paidTime: number
  paidTimeUnit: number
  comboSelected: number
}

export const getExpirationDate = ({
  date,
  paidTime,
  paidTimeUnit,
  comboSelected,
}: CalculateExpireDateInterface) => {
  const dateToStart = new Date(formatDescendingDate(date))

  let newDate: Date

  if (comboSelected !== 0 || paidTimeUnit === 1) {
    newDate = new Date(dateToStart.setMonth(dateToStart.getMonth() + 1))
  }

  if (paidTimeUnit === 2) {
    newDate = new Date(dateToStart.setMonth(dateToStart.getMonth() + paidTime))
  }
  const finalExpireDay =
    newDate.getDate() > 9 ? newDate.getDate() : `0${newDate.getDate()}`
  const finalExpireMonth =
    newDate.getMonth() + 1 > 9
      ? newDate.getMonth() + 1
      : `0${newDate.getMonth() + 1}`
  const expireYear = newDate.getFullYear()

  return `${finalExpireDay}-${finalExpireMonth}-${expireYear}`
}
