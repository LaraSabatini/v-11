const calcExpireDate = (initialDate: string) => {
  const cleanDate = `${initialDate.slice(6, 10)}-${initialDate.slice(
    3,
    5,
  )}-${initialDate.slice(0, 2)}`

  const newDate = new Date(cleanDate)

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
