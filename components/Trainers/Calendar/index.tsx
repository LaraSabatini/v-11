import React, { useEffect, useContext, useState } from "react"
import { Lessons } from "contexts/Lessons"
import {
  day,
  month,
  year,
  daysOfWeekWithoutWeekendAv,
  abbreviatedMonth,
} from "const/time"
import ClasesPurchasedInterface from "interfaces/trainers/ClasesPurchasedInterface"
import ScrollView from "components/UI/ScrollView"
import getWeekNumber from "../Helpers/getWeekNumber"
import organizeDataForCalendar from "../Helpers/organizeDataForCalendar"
import getDaysOfTheWeek from "../Helpers/getDaysOfTheWeek"
import MakePayment from "../Forms/MakePayment"
import {
  MainContainer,
  SectionContainer,
  ShiftColumn,
  Title,
  DayColumn,
  Row,
  ArrowsContainer,
  ButtonNavigate,
  Student,
  StudentsContainer,
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
        <ArrowsContainer>
          <ButtonNavigate
            onClick={() => {
              if (weekNumberSelected === 1) {
                setWeekNumberSelected(52)
              } else {
                setWeekNumberSelected(weekNumberSelected - 1)
              }
            }}
          >
            &lt;
          </ButtonNavigate>
          <ButtonNavigate
            onClick={() => {
              if (weekNumberSelected === 52) {
                setWeekNumberSelected(1)
              } else {
                setWeekNumberSelected(weekNumberSelected + 1)
              }
            }}
          >
            &gt;
          </ButtonNavigate>
        </ArrowsContainer>
        <ShiftColumn>
          <Title>TURNO</Title>
          <Row>AM</Row>
          <Row>PM</Row>
        </ShiftColumn>
        {daysOfWeekWithoutWeekendAv.map((item, index) => (
          <DayColumn>
            <Title>
              <p className="day"> {item.display_name}</p>
              <p className="number">{weekDays[index]?.getDate()}</p>
              <p className="month">
                {abbreviatedMonth[
                  weekDays[index]?.getMonth()
                ]?.display_name.toUpperCase()}
              </p>
            </Title>
            <Row>
              <ScrollView height={180}>
                <StudentsContainer>
                  {cleanedLessons[index]?.am !== undefined &&
                    cleanedLessons[index].am.map(lesson => (
                      <Student
                        key={lesson.id}
                        paid={lesson.paid === "SI"}
                        type="button"
                        selected={purchaseSelected?.id === lesson.id}
                        onClick={() => selectPurchase(lesson)}
                      >
                        {lesson.partner_name} {lesson.partner_last_name}
                      </Student>
                    ))}
                </StudentsContainer>
              </ScrollView>
            </Row>
            <Row>
              <ScrollView height={180}>
                <StudentsContainer>
                  {cleanedLessons[index]?.pm !== undefined &&
                    cleanedLessons[index].pm.map(lesson => (
                      <Student
                        paid={lesson.paid === "SI"}
                        type="button"
                        selected={purchaseSelected?.id === lesson.id}
                        onClick={() => selectPurchase(lesson)}
                        key={lesson.id}
                      >
                        {lesson.partner_name} {lesson.partner_last_name}
                      </Student>
                    ))}
                </StudentsContainer>
              </ScrollView>
            </Row>
          </DayColumn>
        ))}
        {modalMakeAPayment && (
          <MakePayment cancelPayment={() => setModalMakeAPayment(false)} />
        )}
      </MainContainer>
    </SectionContainer>
  )
}

export default Calendar
