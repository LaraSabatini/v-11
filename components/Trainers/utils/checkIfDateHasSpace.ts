import { getLessonsByDateAndShiftAction } from "reducers/lessons"
import LessonsSelectedInterface from "interfaces/trainers/LessonsSelected"

const checkIfDateHasSpace = async (
  provisionalSelection: {
    date: string
    shift: "AM" | "PM" | ""
  },
  datesSelected: LessonsSelectedInterface[],
) => {
  let response: {
    can: boolean
    newDates: { id: number; date: string; shift: string }[] | null
  }

  const dateCleaned = `${provisionalSelection.date.slice(
    0,
    2,
  )}-${provisionalSelection.date.slice(3, 5)}-${provisionalSelection.date.slice(
    6,
    10,
  )}`

  const checkAvailability = await getLessonsByDateAndShiftAction(
    dateCleaned,
    provisionalSelection.shift,
  )

  if (checkAvailability.length >= 10) {
    response = {
      can: false,
      newDates: null,
    }
  } else {
    response = {
      can: true,
      newDates: [
        ...datesSelected,
        {
          id: datesSelected.length + 1,
          date: provisionalSelection.date,
          shift: provisionalSelection.shift,
        },
      ],
    }
  }

  return response
}

export default checkIfDateHasSpace
