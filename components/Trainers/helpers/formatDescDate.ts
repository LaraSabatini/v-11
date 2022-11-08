const formatDescDate = (date: string) => {
  return `${date.slice(6, 10)}-${date.slice(3, 5)}-${date.slice(0, 2)}`
}

export default formatDescDate
