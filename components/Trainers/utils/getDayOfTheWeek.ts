const getDayOfWeek = (w: number, y: number) => {
  const simple = new Date(y, 0, 1 + (w - 1) * 7)
  const dow = simple.getDay()
  const ISOweekStart = simple
  if (dow <= 4) ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1)
  else ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay())

  const tuesdayDate = new Date(ISOweekStart)
  tuesdayDate.setDate(ISOweekStart.getDate() + 1)
  const wednesdayDate = new Date(ISOweekStart)
  wednesdayDate.setDate(ISOweekStart.getDate() + 2)
  const thursdayDate = new Date(ISOweekStart)
  thursdayDate.setDate(ISOweekStart.getDate() + 3)
  const fridayDate = new Date(ISOweekStart)
  fridayDate.setDate(ISOweekStart.getDate() + 4)

  return [ISOweekStart, tuesdayDate, wednesdayDate, thursdayDate, fridayDate]
}

export default getDayOfWeek
