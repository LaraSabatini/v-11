import React, { useContext, useState } from "react"
import { Lessons } from "contexts/Lessons"
import { useRouter } from "next/router"
import Header from "components/UI/Header"
import PartnersProvider from "contexts/Partners"
import { calculateActualWeek } from "utils/calculateActualWeek"
import HeadingContent from "./HeadingContent"
import Students from "./Students"
import Modals from "./GeneralContent/Modals"
import EditLessonDate from "./Forms/EditLessonDate"
import Container from "./styles"
import Prices from "./Prices"
import Agenda from "./Agenda"

function TrainersView() {
  const { setEditLessonDateView, editLessonDateView } = useContext(Lessons)

  const router = useRouter()

  const routeIsStudents = router.query.students === "true"
  const routeIsAgenda = router.query.agenda === "true"
  const routeIsPrices = router.query.prices === "true"

  const today = new Date()

  const getMondayDateOfWeek = (weekId: number, year: number): Date => {
    const date = new Date(year, 0, 1)
    const dayOfYear = (date.getDay() - 1 + 1) % 1
    const daysToMonday = (weekId - 1) * 7 + 1 - dayOfYear
    date.setDate(date.getDate() + daysToMonday)

    return date
  }

  const [weekId, setWeekId] = useState<number>(calculateActualWeek())
  const [currentYear, setCurrentYear] = useState<number>(today.getFullYear())
  const [startingDay, setStartingDay] = useState<Date>(
    getMondayDateOfWeek(calculateActualWeek(), 2023),
  )

  const getNextSixDates = (startDate: Date): string[] => {
    const nextSixDatesFormatted = []
    const options = { day: "2-digit", month: "2-digit", year: "numeric" }
    for (let i = 1; i <= 6; i += 1) {
      const date = new Date(startDate)
      date.setDate(startDate.getDate() + i)
      const formattedDate = date.toLocaleDateString(
        "es-ES",
        options as { day: "2-digit"; month: "2-digit"; year: "numeric" },
      )

      nextSixDatesFormatted.push(formattedDate.replaceAll("/", "-"))
    }
    return nextSixDatesFormatted
  }

  const day =
    startingDay.getDate() > 9
      ? `${startingDay.getDate()}`
      : `0${startingDay.getDate()}`
  const month =
    startingDay.getMonth() + 1 > 9
      ? `${startingDay.getMonth() + 1}`
      : `0${startingDay.getMonth() + 1}`
  const year = startingDay.getFullYear()

  const dateList = [`${day}-${month}-${year}`, ...getNextSixDates(startingDay)]

  const goNext = () => {
    if (weekId < 52) {
      setWeekId(weekId + 1)
      setStartingDay(getMondayDateOfWeek(weekId + 1, currentYear))
    } else {
      setWeekId(1)
      setCurrentYear(currentYear + 1)
      setStartingDay(getMondayDateOfWeek(1, currentYear + 1))
    }
  }
  const goPrev = () => {
    if (weekId > 1) {
      setWeekId(weekId - 1)
      setStartingDay(getMondayDateOfWeek(weekId - 1, currentYear))
    } else {
      setWeekId(52)
      setCurrentYear(currentYear - 1)
      setStartingDay(getMondayDateOfWeek(52, currentYear - 1))
    }
  }

  return (
    <div>
      <PartnersProvider>
        <Header />
      </PartnersProvider>
      <Container>
        <HeadingContent />
        <Modals />

        {routeIsStudents && <Students />}
        {routeIsAgenda && (
          <Agenda
            startingDate={startingDay}
            dateList={dateList}
            goNext={goNext}
            goPrev={goPrev}
            weekId={weekId}
          />
        )}
        {routeIsPrices && <Prices />}

        {editLessonDateView && (
          <EditLessonDate
            cancelEditLessonPurchase={() => setEditLessonDateView(false)}
          />
        )}
      </Container>
    </div>
  )
}

export default TrainersView
