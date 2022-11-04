import LessonsSelectedInterface from "interfaces/trainers/LessonsSelected"

const deleteLessonFromList = (
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

export default deleteLessonFromList
