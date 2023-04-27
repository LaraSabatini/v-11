/* eslint-disable import/prefer-default-export */

export const calculateActualWeek = () => {
  const today = new Date()
  const startDate = new Date(today.getFullYear(), 0, 1)
  const days = Math.floor(
    (today.valueOf() - startDate.valueOf()) / (24 * 60 * 60 * 1000),
  )
  const weekNumber = Math.ceil(days / 7)

  return weekNumber
}
