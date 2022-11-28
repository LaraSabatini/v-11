const formatDescendingDate = (date: string) => {
  return `${date.slice(6, 10)}-${date.slice(3, 5)}-${
    parseInt(date.slice(0, 2), 10) + 1
  }`
}

export default formatDescendingDate
