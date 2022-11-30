import LessonsSelectedInterface from "interfaces/trainers/LessonsSelected"

const removeLessonFromList = (
  lesson: {
    id: number
    date: string
    shift: string
  },
  list: LessonsSelectedInterface[],
) => {
  const newArrayOfDates = list.filter(
    (lessonDate: { id: number; date: string; shift: "AM" | "PM" }) =>
      lessonDate !== lesson,
  )
  return newArrayOfDates
}

export default removeLessonFromList
