import formatDescDate from "./formatDescDate"

const calculateLessonWeek = (date: string) => {
  const currentDate = new Date(formatDescDate(date))
  const startDate = new Date(currentDate.getFullYear(), 0, 1)
  const days = Math.floor(
    (currentDate.valueOf() - startDate.valueOf()) / (24 * 60 * 60 * 1000),
  )

  return {
    week: Math.ceil(days / 7),
    day: currentDate,
  }
}

export default calculateLessonWeek
