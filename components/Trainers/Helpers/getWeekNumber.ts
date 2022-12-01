const getWeekNumber = (date: string) => {
  const dateForCalculation = `${date.slice(3, 5)}-${date.slice(
    0,
    2,
  )}-${date.slice(6, 10)}`

  const currentDate = new Date(dateForCalculation)
  const startDate = new Date(currentDate.getFullYear(), 0, 1)
  const days = Math.floor(
    (currentDate.valueOf() - startDate.valueOf()) / (24 * 60 * 60 * 1000),
  )

  return {
    week: Math.ceil(days / 7),
    day: currentDate,
  }
}

export default getWeekNumber
