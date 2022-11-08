import { getLessonsByPartnerAndPaidAction } from "helpers/lessons"

const getPayments = async (studentSelected: number) => {
  const lessonsPaid = await getLessonsByPartnerAndPaidAction(
    studentSelected,
    "SI",
  )
  const lessonsNotPaid = await getLessonsByPartnerAndPaidAction(
    studentSelected,
    "NO",
  )

  const finalArr = lessonsPaid.concat(lessonsNotPaid).sort((a, b) => {
    return b.id - a.id
  })

  const paidDays = []
  finalArr.map(purchase => paidDays.push(purchase.paid_day))

  const uniqueArray = paidDays.filter((item, pos) => {
    return paidDays.indexOf(item) === pos
  })

  const finalArrayOfDates = uniqueArray.map(paidDate => {
    const arrayOfDates = []
    finalArr.filter(
      lesson => lesson.paid_day === paidDate && arrayOfDates.push(lesson),
    )
    return arrayOfDates
  })

  return finalArrayOfDates
}

export default getPayments
