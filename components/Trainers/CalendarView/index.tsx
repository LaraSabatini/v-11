import React, { useContext, useEffect, useState } from "react"
// DATA STORAGE & TYPES
import { Lessons } from "@contexts/Lessons"
import { year, daysOfTheWeek, shifts } from "const/time"
import ClasesPurchasedInterface from "interfaces/trainers/ClasesPurchasedInterface"
// COMPONENTS & STYLING
import Pagination from "components/UI/Pagination"
import ScrollView from "components/UI/ScrollView"
import { calculateActualWeek } from "utils"
import getDayOfWeek from "../utils/getDayOfTheWeek"
import getLessonsData from "../utils/getLessonsData"
import MakePayment from "./MakePayment"
import {
  MainContainer,
  Column,
  LessonPurchased,
  StudentsList,
  ColumnTitle,
  DividerRowTitles,
  DividerRowShifts,
  PaginatorContainer,
  SectionContainer,
  Scroll,
  ScrollContainer,
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
      const calc = calculateActualWeek()
      setWeekNumberSelected(calc)
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
                <span>
                  {weekDays[0].getDate()}/{weekDays[0].getMonth() + 1}/
                  {weekDays[0].getFullYear()}
                </span>
              )}
            </p>
          </ColumnTitle>
          <StudentsList>
            <ScrollContainer>
              <ScrollView height={160}>
                <Scroll>
                  {cleanedLessons.monday.am.map(lesson => (
                    <LessonPurchased
                      paid={lesson.paid === "SI"}
                      type="button"
                      selected={purchaseSelected?.id === lesson.id}
                      onClick={() => selectPurchase(lesson)}
                    >
                      {lesson.partner_name} {lesson.partner_last_name}
                    </LessonPurchased>
                  ))}
                </Scroll>
              </ScrollView>
            </ScrollContainer>
          </StudentsList>
          <StudentsList>
            <ScrollContainer>
              <ScrollView height={160}>
                <Scroll>
                  {cleanedLessons.monday.pm.map(lesson => (
                    <LessonPurchased
                      paid={lesson.paid === "SI"}
                      type="button"
                      selected={purchaseSelected?.id === lesson.id}
                      onClick={() => selectPurchase(lesson)}
                    >
                      {lesson.partner_name} {lesson.partner_last_name}
                    </LessonPurchased>
                  ))}
                </Scroll>
              </ScrollView>
            </ScrollContainer>
          </StudentsList>
        </Column>
        <Column>
          <ColumnTitle>
            <p>
              {daysOfTheWeek[1].display_name}
              {weekDays.length && (
                <span>
                  {weekDays[1].getDate()}/{weekDays[1].getMonth() + 1}/
                  {weekDays[1].getFullYear()}
                </span>
              )}
            </p>
          </ColumnTitle>
          <StudentsList>
            <ScrollContainer>
              <ScrollView height={160}>
                <Scroll>
                  {cleanedLessons.tuesday.am.map(lesson => (
                    <LessonPurchased
                      paid={lesson.paid === "SI"}
                      type="button"
                      selected={purchaseSelected?.id === lesson.id}
                      onClick={() => selectPurchase(lesson)}
                    >
                      {lesson.partner_name} {lesson.partner_last_name}
                    </LessonPurchased>
                  ))}
                </Scroll>
              </ScrollView>
            </ScrollContainer>
          </StudentsList>
          <StudentsList>
            <ScrollContainer>
              <ScrollView height={160}>
                <Scroll>
                  {cleanedLessons.tuesday.pm.map(lesson => (
                    <LessonPurchased
                      paid={lesson.paid === "SI"}
                      type="button"
                      selected={purchaseSelected?.id === lesson.id}
                      onClick={() => selectPurchase(lesson)}
                    >
                      {lesson.partner_name} {lesson.partner_last_name}
                    </LessonPurchased>
                  ))}
                </Scroll>
              </ScrollView>
            </ScrollContainer>
          </StudentsList>
        </Column>
        <Column>
          <ColumnTitle>
            <p>
              {daysOfTheWeek[2].display_name}
              {weekDays.length && (
                <span>
                  {weekDays[2].getDate()}/{weekDays[2].getMonth() + 1}/
                  {weekDays[2].getFullYear()}
                </span>
              )}
            </p>
          </ColumnTitle>
          <StudentsList>
            <ScrollContainer>
              <ScrollView height={160}>
                <Scroll>
                  {cleanedLessons.wednesday.am.map(lesson => (
                    <LessonPurchased
                      paid={lesson.paid === "SI"}
                      type="button"
                      selected={purchaseSelected?.id === lesson.id}
                      onClick={() => selectPurchase(lesson)}
                    >
                      {lesson.partner_name} {lesson.partner_last_name}
                    </LessonPurchased>
                  ))}
                </Scroll>
              </ScrollView>
            </ScrollContainer>
          </StudentsList>
          <StudentsList>
            <ScrollContainer>
              <ScrollView height={160}>
                <Scroll>
                  {cleanedLessons.wednesday.pm.map(lesson => (
                    <LessonPurchased
                      paid={lesson.paid === "SI"}
                      type="button"
                      selected={purchaseSelected?.id === lesson.id}
                      onClick={() => selectPurchase(lesson)}
                    >
                      {lesson.partner_name} {lesson.partner_last_name}
                    </LessonPurchased>
                  ))}
                </Scroll>
              </ScrollView>
            </ScrollContainer>
          </StudentsList>
        </Column>
        <Column>
          <ColumnTitle>
            <p>
              {daysOfTheWeek[3].display_name}
              {weekDays.length && (
                <span>
                  {weekDays[3].getDate()}/{weekDays[3].getMonth() + 1}/
                  {weekDays[3].getFullYear()}
                </span>
              )}
            </p>
          </ColumnTitle>
          <StudentsList>
            <ScrollContainer>
              <ScrollView height={160}>
                <Scroll>
                  {cleanedLessons.thursday.am.map(lesson => (
                    <LessonPurchased
                      paid={lesson.paid === "SI"}
                      type="button"
                      selected={purchaseSelected?.id === lesson.id}
                      onClick={() => selectPurchase(lesson)}
                    >
                      {lesson.partner_name} {lesson.partner_last_name}
                    </LessonPurchased>
                  ))}
                </Scroll>
              </ScrollView>
            </ScrollContainer>
          </StudentsList>
          <StudentsList>
            <ScrollContainer>
              <ScrollView height={160}>
                <Scroll>
                  {cleanedLessons.thursday.pm.map(lesson => (
                    <LessonPurchased
                      paid={lesson.paid === "SI"}
                      type="button"
                      selected={purchaseSelected?.id === lesson.id}
                      onClick={() => selectPurchase(lesson)}
                    >
                      {lesson.partner_name} {lesson.partner_last_name}
                    </LessonPurchased>
                  ))}
                </Scroll>
              </ScrollView>
            </ScrollContainer>
          </StudentsList>
        </Column>
        <Column>
          <ColumnTitle>
            <p>
              {daysOfTheWeek[4].display_name}
              {weekDays.length && (
                <span>
                  {weekDays[4].getDate()}/{weekDays[4].getMonth() + 1}/
                  {weekDays[4].getFullYear()}
                </span>
              )}
            </p>
          </ColumnTitle>
          <StudentsList>
            <ScrollContainer>
              <ScrollView height={160}>
                <Scroll>
                  {cleanedLessons.friday.am.map(lesson => (
                    <LessonPurchased
                      paid={lesson.paid === "SI"}
                      type="button"
                      selected={purchaseSelected?.id === lesson.id}
                      onClick={() => selectPurchase(lesson)}
                    >
                      {lesson.partner_name} {lesson.partner_last_name}
                    </LessonPurchased>
                  ))}
                </Scroll>
              </ScrollView>
            </ScrollContainer>
          </StudentsList>
          <StudentsList>
            <ScrollContainer>
              <ScrollView height={160}>
                <Scroll>
                  {cleanedLessons.friday.pm.map(lesson => (
                    <LessonPurchased
                      paid={lesson.paid === "SI"}
                      type="button"
                      selected={purchaseSelected?.id === lesson.id}
                      onClick={() => selectPurchase(lesson)}
                    >
                      {lesson.partner_name} {lesson.partner_last_name}
                    </LessonPurchased>
                  ))}
                </Scroll>
              </ScrollView>
            </ScrollContainer>
          </StudentsList>
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
