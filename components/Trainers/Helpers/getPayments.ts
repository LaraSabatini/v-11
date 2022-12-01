import { getLessonsByPartnerAndPaidAction } from "helpers/lessons"
import ClasesPurchasedInterface from "interfaces/trainers/ClasesPurchasedInterface"

const getPayments = async (studentSelected: number) => {
  const lessonsPaid = await getLessonsByPartnerAndPaidAction(
    studentSelected,
    "SI",
  )
  const lessonsNotPaid = await getLessonsByPartnerAndPaidAction(
    studentSelected,
    "NO",
  )

  const arrayOfLessons = lessonsPaid.concat(lessonsNotPaid).sort((a, b) => {
    return b.id - a.id
  })

  const paidDays = []
  arrayOfLessons.map((purchase: ClasesPurchasedInterface) =>
    paidDays.push(purchase.paid_day),
  )

  const cleanedArray = paidDays.filter((item, pos) => {
    return paidDays.indexOf(item) === pos
  })

  const finalArrayOfDates = cleanedArray.map(paidDate => {
    const arrayOfDates = []
    arrayOfLessons.filter(
      (lesson: ClasesPurchasedInterface) =>
        lesson.paid_day === paidDate && arrayOfDates.push(lesson),
    )
    return arrayOfDates
  })

  return finalArrayOfDates
}

export default getPayments
