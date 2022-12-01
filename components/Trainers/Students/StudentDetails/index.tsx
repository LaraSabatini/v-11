import React, { useContext, useState } from "react"
import { Lessons } from "contexts/Lessons"
import trainerTexts from "strings/trainers.json"
import { day, month, year } from "const/time"
import ScrollView from "components/UI/ScrollView"
import Icon from "components/UI/Assets/Icon"
import calculateExpireDate from "../../Helpers/calculateExpireDate"
import formatDescendingDate from "../../Helpers/formatDescendingDate"
import {
  Container,
  CardTitle,
  LessonsPurchased,
  TableTitle,
  TableTitles,
  LessonListContainer,
  LessonGroup,
  Dropdown,
  GroupInfo,
  DateShown,
} from "./styles"

function StudentDetails() {
  const { studentSelected, lessonsByStudent } = useContext(Lessons)
  const [groupSelected, setGroupSelected] = useState<number>(null)

  const todayDate = new Date(`${month}-${day}-${year}`)

  const checkPastDate = date => {
    const lessonDate = new Date(formatDescendingDate(date))
    const isDisabled = lessonDate < todayDate
    return isDisabled
  }

  return (
    <Container>
      <CardTitle>
        Historial de pagos - {studentSelected.name} {studentSelected.last_name}
      </CardTitle>
      <LessonsPurchased>
        <TableTitles>
          <TableTitle>{trainerTexts.students_info.purchase}</TableTitle>
          <TableTitle>{trainerTexts.students_info.expire_date}</TableTitle>
        </TableTitles>
        <ScrollView height={270}>
          <LessonListContainer>
            {lessonsByStudent.length > 0 &&
              lessonsByStudent.map(lesson => (
                <LessonGroup>
                  <Dropdown
                    onClick={() => {
                      if (groupSelected === null || groupSelected !== lesson) {
                        setGroupSelected(lesson)
                      } else {
                        setGroupSelected(null)
                      }
                    }}
                    open={groupSelected === lesson}
                  >
                    <div className="title">
                      <p>{lesson.length}</p> <span>{trainerTexts.lessons}</span>
                    </div>
                    <div className="title">
                      <p>
                        {lesson[0].paid_day !== ""
                          ? calculateExpireDate(lesson[0].paid_day).string
                          : `${trainerTexts.students_info.without_payment}`}
                      </p>
                      <Icon icon="IconArrowRight" />
                    </div>
                  </Dropdown>

                  {groupSelected !== null && groupSelected === lesson && (
                    <GroupInfo>
                      {lesson.map(purchase => (
                        <DateShown
                          disabled={checkPastDate(purchase.lesson_date)}
                        >
                          {purchase.lesson_date}
                        </DateShown>
                      ))}
                    </GroupInfo>
                  )}
                  {lesson.length === 8 && (
                    <span>{trainerTexts.students_info.has_shoes}</span>
                  )}
                </LessonGroup>
              ))}
          </LessonListContainer>
        </ScrollView>
      </LessonsPurchased>
    </Container>
  )
}

export default StudentDetails
