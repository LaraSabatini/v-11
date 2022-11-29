import { getLessonsByWeekAction } from "helpers/lessons"
import { shifts } from "const/time"
import ClasesPurchasedInterface from "interfaces/trainers/ClasesPurchasedInterface"

const organizeDataForCalendar = async (weekNumberSelected: number) => {
  const getLessonsByWeekCall = await getLessonsByWeekAction(weekNumberSelected)

  const monday = getLessonsByWeekCall.filter(
    (lesson: ClasesPurchasedInterface) => lesson.day_id === 1,
  )
  const tuesday = getLessonsByWeekCall.filter(lesson => lesson.day_id === 2)
  const wednesday = getLessonsByWeekCall.filter(
    (lesson: ClasesPurchasedInterface) => lesson.day_id === 3,
  )
  const thursday = getLessonsByWeekCall.filter(
    (lesson: ClasesPurchasedInterface) => lesson.day_id === 4,
  )
  const friday = getLessonsByWeekCall.filter(
    (lesson: ClasesPurchasedInterface) => lesson.day_id === 5,
  )
  const newArrayForCalendar = {
    monday: {
      am: monday.filter(
        (lesson: ClasesPurchasedInterface) =>
          lesson.shift === `${shifts[0].display_name}`,
      ),
      pm: monday.filter(
        (lesson: ClasesPurchasedInterface) =>
          lesson.shift === `${shifts[1].display_name}`,
      ),
    },
    tuesday: {
      am: tuesday.filter(
        (lesson: ClasesPurchasedInterface) =>
          lesson.shift === `${shifts[0].display_name}`,
      ),
      pm: tuesday.filter(
        (lesson: ClasesPurchasedInterface) =>
          lesson.shift === `${shifts[1].display_name}`,
      ),
    },
    wednesday: {
      am: wednesday.filter(
        (lesson: ClasesPurchasedInterface) =>
          lesson.shift === `${shifts[0].display_name}`,
      ),
      pm: wednesday.filter(
        (lesson: ClasesPurchasedInterface) =>
          lesson.shift === `${shifts[1].display_name}`,
      ),
    },
    thursday: {
      am: thursday.filter(
        (lesson: ClasesPurchasedInterface) =>
          lesson.shift === `${shifts[0].display_name}`,
      ),
      pm: thursday.filter(
        (lesson: ClasesPurchasedInterface) =>
          lesson.shift === `${shifts[1].display_name}`,
      ),
    },
    friday: {
      am: friday.filter(
        (lesson: ClasesPurchasedInterface) =>
          lesson.shift === `${shifts[0].display_name}`,
      ),
      pm: friday.filter(
        (lesson: ClasesPurchasedInterface) =>
          lesson.shift === `${shifts[1].display_name}`,
      ),
    },
  }

  return newArrayForCalendar
}

export default organizeDataForCalendar
