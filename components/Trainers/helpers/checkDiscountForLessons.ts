import { getPartnerPaymentsByIdAction } from "helpers/partners"
import LessonsSelectedInterface from "interfaces/trainers/LessonsSelected"
import { day, month, year } from "const/time"
import formatDescDate from "./formatDescDate"

const checkDiscountForLessons = async (
  clientId: number,
  lessonDates: LessonsSelectedInterface[],
) => {
  const checkPayment = await getPartnerPaymentsByIdAction(clientId)

  const lessons: {
    id: number
    date: string
    shift: string
    hasDiscount: boolean
  }[] = []

  const turnDatesWithoutDiscount = () => {
    lessonDates.forEach(lesson =>
      lessons.push({
        id: lesson.id,
        date: lesson.date,
        shift: lesson.shift,
        hasDiscount: false,
      }),
    )
  }

  if (checkPayment.length) {
    const expirationDate =
      checkPayment[checkPayment.length - 1].payment_expire_date

    const expirationDateCleaned = new Date(formatDescDate(expirationDate))
    const todayDate = new Date(`${year}-${month}-${day}`)

    if (expirationDateCleaned > todayDate) {
      for (let i = 0; i < lessonDates.length; i += 1) {
        const lessonDateCleaned = new Date(formatDescDate(lessonDates[i].date))
        lessons.push({
          id: lessonDates[i].id,
          date: lessonDates[i].date,
          shift: lessonDates[i].shift,
          hasDiscount: expirationDateCleaned > lessonDateCleaned,
        })
      }
    } else {
      turnDatesWithoutDiscount()
    }
  } else {
    turnDatesWithoutDiscount()
  }
  return lessons
}

export default checkDiscountForLessons
