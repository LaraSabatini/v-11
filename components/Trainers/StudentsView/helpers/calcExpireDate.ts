import formatDescDate from "../../helpers/formatDescDate"

const calcExpireDate = (initialDate: string) => {
  const newDate = new Date(formatDescDate(initialDate))

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

export default calcExpireDate
