/* eslint-disable no-console */
import React, { useState, useEffect } from "react"
import {
  getLessonScheduleByWeek,
  getLessonTypes,
} from "services/Trainers/agenda.service"
import { daysOfTheWeek, hours } from "const/time"
import Switch from "components/UI/Switch"
import Icon from "components/UI/Assets/Icon"
import {
  TableInterface,
  CalendarInterface,
  LessonType,
} from "interfaces/lessons/Calendar"
import PurchaseLesson from "./PurchaseLesson"
import {
  Container,
  Column,
  ColumnContainer,
  HourColumn,
  ColumnItem,
  Lesson,
  SwitchContainer,
  Select,
  ButtonContainer,
  ChangeWeekContainer,
  Categories,
  SelectList,
} from "./styles"

function Agenda({
  startingDate,
  dateList,
  goNext,
  goPrev,
  weekId,
}: TableInterface) {
  const [type, setType] = useState<LessonType | "all">("all")
  const [weekLessonList, setWeekLessonList] = useState<CalendarInterface[]>([])

  const [openTypesList, setOpenTypesList] = useState<boolean>(false)

  const [lessonTypes, setLessonTypes] = useState<
    {
      id: number
      value: string
      name: string
      color: string
      colorSecondary: string
      price_mp: number
      price_cash: number
      quota: number
    }[]
  >([])

  const [lessonList, setLessonList] = useState<CalendarInterface[]>([])

  const filterLessons = () => {
    if (type === "all") {
      setLessonList(weekLessonList)
    } else {
      const list = weekLessonList.filter(lesson => lesson.type === type)
      setLessonList(list)
    }
  }

  useEffect(() => {
    filterLessons()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type])

  const getLessonScheduleByDayCall = async () => {
    const req = await getLessonScheduleByWeek(weekId)
    const lessonListCleaned = []

    req.data.map(lesson =>
      lessonListCleaned.push({
        id: lesson.id,
        date: lesson.date,
        hourRange: JSON.parse(lesson.hourRange),
        type: lesson.type,
        purchaseIds: JSON.parse(lesson.purchaseIds),
      }),
    )

    setLessonList(lessonListCleaned)
    setWeekLessonList(lessonListCleaned)
  }

  useEffect(() => {
    getLessonScheduleByDayCall()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startingDate])

  const defineTypes = async () => {
    const getLessonTypesCall = await getLessonTypes()
    setLessonTypes(getLessonTypesCall.data)
  }

  useEffect(() => {
    defineTypes()
  }, [])

  console.log(lessonList)

  return (
    <Container>
      <SwitchContainer>
        <Categories onClick={() => setOpenTypesList(!openTypesList)}>
          Categorias
          <Icon icon="IconSingleArrow" />
        </Categories>
        {openTypesList && (
          <SelectList>
            <Select>
              Todos
              <Switch
                onChange={() => setType("all")}
                defaultValue
                ownState={type === "all"}
              />
            </Select>
            {lessonTypes.length > 0 &&
              lessonTypes.map(lessonType => (
                <Select key={lessonType.id}>
                  {lessonType.name}
                  <Switch
                    onChange={() => setType(lessonType.value)}
                    defaultValue
                    ownState={type === lessonType.value}
                    color={lessonType.color}
                    colorSecondary={lessonType.colorSecondary}
                  />
                </Select>
              ))}
          </SelectList>
        )}
      </SwitchContainer>

      <ChangeWeekContainer>
        <button type="button" onClick={goPrev}>
          <Icon icon="IconArrowLeft" />
        </button>
        <button type="button" onClick={goNext}>
          <Icon icon="IconArrowRight" />
        </button>
      </ChangeWeekContainer>
      <HourColumn>
        <p className="title">HORA</p>
        {hours.map(hour => (
          <ColumnItem key={hour.id}>{hour.value}</ColumnItem>
        ))}
      </HourColumn>
      <ColumnContainer>
        {daysOfTheWeek.map((dayItem, index) => (
          <Column key={dayItem.id}>
            <p className="title">
              {dayItem.display_name}
              <span>{dateList[index]}</span>
            </p>
            {hours.map(hour => (
              <ColumnItem key={hour.id}>
                {lessonList.length ? (
                  lessonList
                    .filter(
                      lesson =>
                        lesson.date === dateList[index] &&
                        lesson.hourRange[0] === hour.id,
                    )
                    .map(item => (
                      <Lesson key={item.id} lessonType={item.type}>
                        {item.purchaseIds.length
                          ? `${item.purchaseIds.length} alumno/s`
                          : ""}
                      </Lesson>
                    ))
                ) : (
                  <p />
                )}
              </ColumnItem>
            ))}
          </Column>
        ))}
      </ColumnContainer>
      <ButtonContainer>
        <PurchaseLesson />
      </ButtonContainer>
    </Container>
  )
}

export default Agenda
