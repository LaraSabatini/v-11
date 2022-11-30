const formatDescendingDate = (date: string) => {
  return `${date.slice(3, 5)}-${parseInt(date.slice(0, 2), 10)}-${date.slice(
    6,
    10,
  )}`
}

export default formatDescendingDate
