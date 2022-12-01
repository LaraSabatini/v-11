import React, { useEffect, useContext, useState } from "react"
import { Lessons } from "contexts/Lessons"
import { daysOfTheWeek, shifts, day, month, year } from "const/time"
import ClasesPurchasedInterface from "interfaces/trainers/ClasesPurchasedInterface"
import Pagination from "components/UI/Pagination"
import getWeekNumber from "../Helpers/getWeekNumber"
import organizeDataForCalendar from "../Helpers/organizeDataForCalendar"
import getDaysOfTheWeek from "../Helpers/getDaysOfTheWeek"
import formatCalendarDate from "../Helpers/formatCalendarDate"
import MakePayment from "../Forms/MakePayment"
import DayView from "./DayView"
import {
  MainContainer,
  Column,
  StudentsList,
  ColumnTitle,
  DividerRowTitles,
  DividerRowShifts,
  PaginatorContainer,
  SectionContainer,
} from "./styles"

function Calendar() {
  const {
    weekNumberSelected,
    setWeekNumberSelected,
    purchaseSelected,
    setPurchaseSelected,
    triggerListUpdate,
    cleanedLessons,
    setCleanedLessons,
  } = useContext(Lessons)

  const [weekDays, setWeekDays] = useState<Date[]>([])
  const [modalMakeAPayment, setModalMakeAPayment] = useState<boolean>(false)

  const calculateDays = () => {
    const days = getDaysOfTheWeek(weekNumberSelected, year)
    setWeekDays(days)
  }

  const setDataForLessons = async () => {
    const reorganizedLessonData = await organizeDataForCalendar(
      weekNumberSelected,
    )
    setCleanedLessons(reorganizedLessonData)
  }

  const selectPurchase = (lesson: ClasesPurchasedInterface) => {
    if (purchaseSelected?.id === lesson.id) {
      setPurchaseSelected(null)
    } else {
      setPurchaseSelected(lesson)
    }
  }

  const evaluateIfPaymentOrEdition = () => {
    if (purchaseSelected.paid === "NO") {
      setModalMakeAPayment(true)
    }
  }

  useEffect(() => {
    if (purchaseSelected !== null) {
      evaluateIfPaymentOrEdition()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [purchaseSelected])

  useEffect(() => {
    if (weekNumberSelected === null) {
      setWeekNumberSelected(getWeekNumber(`${day}-${month}-${year}`).week)
    } else {
      setDataForLessons()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weekNumberSelected, triggerListUpdate])

  useEffect(() => {
    calculateDays()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weekNumberSelected])

  return (
    <SectionContainer>
      <MainContainer>
        <DividerRowTitles />
        <DividerRowShifts />
        <div className="divider-1" />
        <div className="divider-2" />
        <div className="divider-3" />
        <div className="divider-4" />
        <div className="divider-5" />
        <Column>
          <ColumnTitle>
            <p>TURNO</p>
          </ColumnTitle>
          <StudentsList>
            <p>{shifts[0].display_name}</p>
          </StudentsList>
          <StudentsList>
            <p>{shifts[1].display_name}</p>
          </StudentsList>
        </Column>

        <Column>
          <ColumnTitle>
            <p>
              {daysOfTheWeek[0].display_name}
              {weekDays.length && (
                <span>{formatCalendarDate(weekDays[0])}</span>
              )}
            </p>
          </ColumnTitle>
          <DayView
            cleanedLessons={cleanedLessons.monday}
            purchaseSelected={purchaseSelected}
            selectPurchase={e => selectPurchase(e)}
          />
        </Column>
        <Column>
          <ColumnTitle>
            <p>
              {daysOfTheWeek[1].display_name}
              {weekDays.length && (
                <span>{formatCalendarDate(weekDays[1])}</span>
              )}
            </p>
          </ColumnTitle>
          <DayView
            cleanedLessons={cleanedLessons.tuesday}
            purchaseSelected={purchaseSelected}
            selectPurchase={e => selectPurchase(e)}
          />
        </Column>
        <Column>
          <ColumnTitle>
            <p>
              {daysOfTheWeek[2].display_name}
              {weekDays.length && (
                <span>{formatCalendarDate(weekDays[2])}</span>
              )}
            </p>
          </ColumnTitle>
          <DayView
            cleanedLessons={cleanedLessons.wednesday}
            purchaseSelected={purchaseSelected}
            selectPurchase={e => selectPurchase(e)}
          />
        </Column>
        <Column>
          <ColumnTitle>
            <p>
              {daysOfTheWeek[3].display_name}
              {weekDays.length && (
                <span>{formatCalendarDate(weekDays[3])}</span>
              )}
            </p>
          </ColumnTitle>
          <DayView
            cleanedLessons={cleanedLessons.thursday}
            purchaseSelected={purchaseSelected}
            selectPurchase={e => selectPurchase(e)}
          />
        </Column>
        <Column>
          <ColumnTitle>
            <p>
              {daysOfTheWeek[4].display_name}
              {weekDays.length && (
                <span>{formatCalendarDate(weekDays[4])}</span>
              )}
            </p>
          </ColumnTitle>
          <DayView
            cleanedLessons={cleanedLessons.friday}
            purchaseSelected={purchaseSelected}
            selectPurchase={e => selectPurchase(e)}
          />
        </Column>
        {modalMakeAPayment && (
          <MakePayment cancelPayment={() => setModalMakeAPayment(false)} />
        )}
      </MainContainer>
      <PaginatorContainer>
        <Pagination
          totalPages={52}
          setPage={weekNumberSelected}
          onClickNext={() => setWeekNumberSelected(weekNumberSelected + 1)}
          onClickBack={() => setWeekNumberSelected(weekNumberSelected - 1)}
        />
      </PaginatorContainer>
    </SectionContainer>
  )
}

export default Calendar
