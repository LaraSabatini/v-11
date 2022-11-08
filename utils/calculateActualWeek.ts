/* eslint-disable import/prefer-default-export */
import { today } from "const/time"

export const calculateActualWeek = () => {
  const startDate = new Date(today.getFullYear(), 0, 1)
  const days = Math.floor(
    (today.valueOf() - startDate.valueOf()) / (24 * 60 * 60 * 1000),
  )
  const weekNumber = Math.ceil(days / 7)

  return weekNumber
}
