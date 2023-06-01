const isBeforeToday = (dateString: string): boolean => {
  const currentDate = new Date()
  const [day, month, year] = dateString.split("/").map(Number)
  const inputDate = new Date(year, month - 1, day) // month is zero-based

  // Compare the input date with the current date
  return inputDate < currentDate
}
// eslint-disable-next-line import/prefer-default-export
export { isBeforeToday }
