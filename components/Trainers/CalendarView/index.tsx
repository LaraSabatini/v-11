import React, { useContext, useEffect, useState } from "react"
// DATA STORAGE & TYPES
import { Lessons } from "@contexts/Lessons"
import { year, daysOfTheWeek, shifts, today } from "const/time"
import ClasesPurchasedInterface from "interfaces/trainers/ClasesPurchasedInterface"
// COMPONENTS & STYLING
import Pagination from "components/UI/Pagination"
import { calculateActualWeek } from "utils"
import getDayOfWeek from "../helpers/getDayOfTheWeek"
import getLessonsData from "../helpers/getLessonsData"
import MakePayment from "./MakePayment"
import LessonPurchasedView from "./LessonPurchasedView"
import formatCalendarDate from "../helpers/formatCalendarDate"
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

function CalendarView() {
  const {
    weekNumberSelected,
    setWeekNumberSelected,
    purchaseSelected,
    setPurchaseSelected,
    setPaymentMethodSelected,
    setPaymentUserSelected,
    setFinalPrice,
    triggerListUpdate,
    cleanedLessons,
    setCleanedLessons,
  } = useContext(Lessons)

  const [weekDays, setWeekDays] = useState<Date[]>([])

  const calculateDay = () => {
    const days = getDayOfWeek(weekNumberSelected, year)
    setWeekDays(days)
  }

  useEffect(() => {
    calculateDay()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weekNumberSelected])

  const setDataForLessons = async () => {
    const data = await getLessonsData(weekNumberSelected)
    setCleanedLessons(data)
  }

  useEffect(() => {
    if (weekNumberSelected === null) {
      setWeekNumberSelected(calculateActualWeek(today))
    } else {
      setDataForLessons()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weekNumberSelected, triggerListUpdate])

  const [modalMakeAPayment, setModalMakeAPayment] = useState<boolean>(false)

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

  const selectPurchase = (lesson: ClasesPurchasedInterface) => {
    if (purchaseSelected?.id === lesson.id) {
      setPurchaseSelected(null)
    } else {
      setPurchaseSelected(lesson)
    }
  }

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
          <LessonPurchasedView
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
          <LessonPurchasedView
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
          <LessonPurchasedView
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
          <LessonPurchasedView
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
          <LessonPurchasedView
            cleanedLessons={cleanedLessons.friday}
            purchaseSelected={purchaseSelected}
            selectPurchase={e => selectPurchase(e)}
          />
        </Column>
        {modalMakeAPayment && (
          <MakePayment
            data={purchaseSelected}
            cancelPayment={() => {
              setModalMakeAPayment(false)
              setPaymentMethodSelected(null)
              setPaymentUserSelected(null)
              setPurchaseSelected(null)
              setFinalPrice(0)
            }}
          />
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

export default CalendarView
