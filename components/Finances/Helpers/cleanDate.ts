const cleanDate = (e: string) => {
  const day = e.slice(0, 2)
  const month = e.slice(3, 5)
  const year = e.slice(6, 10)
  return `${day}-${month}-${year}`
}

export default cleanDate
