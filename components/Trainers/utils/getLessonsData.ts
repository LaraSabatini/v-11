import { getLessonsByWeek } from "services/Trainers/LessonsPurchased.service"
import { shifts } from "const/time"
import ClasesPurchasedInterface from "interfaces/trainers/ClasesPurchasedInterface"

const getLessonsData = async (weekNumberSelected: number) => {
  const getLessonsByWeekCall = await getLessonsByWeek(weekNumberSelected)

  const monday = getLessonsByWeekCall.data.filter(
    (lesson: ClasesPurchasedInterface) => lesson.day_id === 0,
  )
  const tuesday = getLessonsByWeekCall.data.filter(
    lesson => lesson.day_id === 1,
  )
  const wednesday = getLessonsByWeekCall.data.filter(
    (lesson: ClasesPurchasedInterface) => lesson.day_id === 2,
  )
  const thursday = getLessonsByWeekCall.data.filter(
    (lesson: ClasesPurchasedInterface) => lesson.day_id === 3,
  )
  const friday = getLessonsByWeekCall.data.filter(
    (lesson: ClasesPurchasedInterface) => lesson.day_id === 4,
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
  //   setCleanedLessons(newArrayForCalendar)
}

export default getLessonsData
