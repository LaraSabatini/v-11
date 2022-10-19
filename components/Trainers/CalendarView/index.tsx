import React, { useContext, useEffect, useState } from "react"
// SERVICES
import { getLessonsByWeek } from "services/Trainers/LessonsPurchased.service"
// DATA STORAGE & TYPES
import { Lessons } from "@contexts/Lessons"
import { today, year, daysOfTheWeek, shifts } from "const/time"
import ClasesPurchasedInterface from "interfaces/trainers/ClasesPurchasedInterface"
// COMPONENTS & STYLING
import Pagination from "components/UI/Pagination"
import ScrollView from "components/UI/ScrollView"
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

const CalendarView = () => {
  const {
    weekNumberSelected,
    setWeekNumberSelected,
    purchaseSelected,
    setPurchaseSelected,
    setPaymentMethodSelected,
    setPaymentUserSelected,
    setFinalPrice,
    triggerListUpdate,
  } = useContext(Lessons)

  const [cleanedLessons, setCleanedLessons] = useState<{
    monday: {
      am: ClasesPurchasedInterface[]
      pm: ClasesPurchasedInterface[]
    }
    tuesday: {
      am: ClasesPurchasedInterface[]
      pm: ClasesPurchasedInterface[]
    }
    wednesday: {
      am: ClasesPurchasedInterface[]
      pm: ClasesPurchasedInterface[]
    }
    thursday: {
      am: ClasesPurchasedInterface[]
      pm: ClasesPurchasedInterface[]
    }
    friday: {
      am: ClasesPurchasedInterface[]
      pm: ClasesPurchasedInterface[]
    }
  }>({
    monday: {
      am: [],
      pm: [],
    },
    tuesday: {
      am: [],
      pm: [],
    },
    wednesday: {
      am: [],
      pm: [],
    },
    thursday: {
      am: [],
      pm: [],
    },
    friday: {
      am: [],
      pm: [],
    },
  })

  const [weekDays, setWeekDays] = useState<Date[]>([])

  const getDayOfWeek = (w: number, y: number) => {
    const simple = new Date(y, 0, 1 + (w - 1) * 7)
    const dow = simple.getDay()
    const ISOweekStart = simple
    if (dow <= 4) ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1)
    else ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay())

    const tuesdayDate = new Date(ISOweekStart)
    tuesdayDate.setDate(ISOweekStart.getDate() + 1)
    const wednesdayDate = new Date(ISOweekStart)
    wednesdayDate.setDate(ISOweekStart.getDate() + 2)
    const thursdayDate = new Date(ISOweekStart)
    thursdayDate.setDate(ISOweekStart.getDate() + 3)
    const fridayDate = new Date(ISOweekStart)
    fridayDate.setDate(ISOweekStart.getDate() + 4)

    setWeekDays([
      ISOweekStart,
      tuesdayDate,
      wednesdayDate,
      thursdayDate,
      fridayDate,
    ])
  }

  useEffect(() => {
    getDayOfWeek(weekNumberSelected, year)
  }, [weekNumberSelected])

  const calculateActualWeek = () => {
    const startDate = new Date(today.getFullYear(), 0, 1)
    const days = Math.floor(
      (today.valueOf() - startDate.valueOf()) / (24 * 60 * 60 * 1000),
    )
    const weekNumber = Math.ceil(days / 7)

    setWeekNumberSelected(weekNumber)
  }

  const getLessonsData = async () => {
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

    setCleanedLessons(newArrayForCalendar)
  }

  useEffect(() => {
    if (weekNumberSelected === null) {
      calculateActualWeek()
    } else {
      getLessonsData()
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
