import formatDescendingDate from "./formatDescendingDate"

const calculateExpireDate = (initialDate: string) => {
  const newDate = new Date(formatDescendingDate(initialDate))

  newDate.setMonth(newDate.getMonth() + 1)

  const day =
    newDate.getDate() > 9 ? newDate.getDate() : `0${newDate.getDate()}`

  const month =
    newDate.getMonth() + 1 > 9
      ? newDate.getMonth() + 1
      : `0${newDate.getMonth() + 1}`

  const newDateCleaned = `${day}-${month}-${newDate.getFullYear()}`

  const dateFormats = {
    string: newDateCleaned,
    date: newDate,
  }
  return dateFormats
}

export default calculateExpireDate
