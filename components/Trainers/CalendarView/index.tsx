import React, { useContext, useEffect } from "react"
// SERVICES
import { getLessonsByWeek } from "services/Trainers/LessonsPurchased.service"
// DATA STORAGE & TYPES
import { Clases } from "contexts/Clases"
import { today } from "const/fixedVariables"
// COMPONENTS & STYLING

const CalendarView = () => {
  const {
    // clasesPurchasedByWeek,
    setClasesPurchasedByWeek,
    currentWeekNumber,
    setCurrentWeekNumber,
    weekNumberSelected,
    setWeekNumberSelected,
  } = useContext(Clases)

  const calculateActualWeek = () => {
    const startDate = new Date(today.getFullYear(), 0, 1)
    const days = Math.floor(
      (today.valueOf() - startDate.valueOf()) / (24 * 60 * 60 * 1000),
    )
    const weekNumber = Math.ceil(days / 7)

    setCurrentWeekNumber(weekNumber)
    setWeekNumberSelected(weekNumber)
  }

  const getLessonsData = async () => {
    const getLessonsByWeekCall = await getLessonsByWeek(weekNumberSelected)
    setClasesPurchasedByWeek(getLessonsByWeekCall.data)
  }

  useEffect(() => {
    if (currentWeekNumber === null && weekNumberSelected === null) {
      calculateActualWeek()
    } else {
      getLessonsData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentWeekNumber, weekNumberSelected])

  return <div />
}

export default CalendarView
