import React, { useState, useEffect, useContext } from "react"
import { TrainersContext } from "contexts/Trainers"
import {
  getLessonScheduleByWeek,
  getLessonTypes,
} from "services/Trainers/agenda.service"
import {
  TableInterface,
  CalendarInterface,
  LessonType,
} from "interfaces/lessons/Calendar"
import { daysOfTheWeek, hours } from "const/time"
import Switch from "components/UI/Switch"
import Icon from "components/UI/Assets/Icon"
import { Modal } from "antd"
import PurchaseLesson from "./PurchaseLesson"
import LessonModal from "./LessonModal"
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
  const {
    lessonTypes,
    setLessonTypes,
    refreshAgenda,
    setRefreshAgenda,
  } = useContext(TrainersContext)

  const [type, setType] = useState<LessonType | "all">("all")
  const [weekLessonList, setWeekLessonList] = useState<CalendarInterface[]>([])

  const [openTypesList, setOpenTypesList] = useState<boolean>(false)

  const [lessonList, setLessonList] = useState<CalendarInterface[]>([])

  const [
    openLessonModal,
    setOpenLessonModal,
  ] = useState<CalendarInterface | null>(null)

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
        weekId: lesson.weekId,
        hourRange: lesson.hourRange,
        type: lesson.type,
        purchaseIds: JSON.parse(lesson.purchaseIds),
        assists: lesson.assists === "" ? [] : JSON.parse(lesson.assists),
      }),
    )

    setLessonList(lessonListCleaned)
    setWeekLessonList(lessonListCleaned)
  }

  useEffect(() => {
    getLessonScheduleByDayCall()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startingDate, refreshAgenda])

  const defineTypes = async () => {
    const getLessonTypesCall = await getLessonTypes()
    setLessonTypes(getLessonTypesCall.data)
  }

  useEffect(() => {
    defineTypes()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
                        parseInt(lesson.hourRange as string, 10) === hour.id,
                    )
                    .map(item => (
                      <Lesson
                        key={item.id}
                        lessonType={item.type}
                        onClick={() => setOpenLessonModal(item)}
                      >
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
        {openLessonModal !== null && (
          <Modal
            title={`Clase - ${openLessonModal.date.replaceAll("-", "/")}`}
            open={openLessonModal !== null}
            onCancel={() => {
              setOpenLessonModal(null)
              setRefreshAgenda(refreshAgenda + 1)
            }}
            footer={[]}
          >
            <LessonModal lesson={openLessonModal} lessonTypes={lessonTypes} />
          </Modal>
        )}
      </ColumnContainer>
      <ButtonContainer>
        <PurchaseLesson lessonTypes={lessonTypes} />
      </ButtonContainer>
    </Container>
  )
}

export default Agenda
