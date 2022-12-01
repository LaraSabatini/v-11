import formatDescendingDate from "./formatDescendingDate"

const calculateExpireDate = (initialDate: string) => {
  const newDate = new Date(formatDescendingDate(initialDate))

  newDate.setMonth(newDate.getMonth() + 1)

  const newDateCleaned = `${newDate.getDate()}-${
    newDate.getMonth() + 1
  }-${newDate.getFullYear()}`

  const dateFormats = {
    string: newDateCleaned,
    date: newDate,
  }
  return dateFormats
}

export default calculateExpireDate
