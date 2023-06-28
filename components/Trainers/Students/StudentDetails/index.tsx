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
  const [groupSelected, setGroupSelected] = useState<any>(null)

  const [purchases, setPurchases] = useState<any>(null)

  const todayDate = new Date(`${month}-${day}-${year}`)

  const checkPastDate = (date: string) => {
    const lessonDate = new Date(formatDescendingDate(date))
    const isDisabled = lessonDate < todayDate
    return isDisabled
  }

  return (
    <Container>
      <CardTitle>
        {trainerTexts.students_info.payments_history} - {studentSelected.name}{" "}
        {studentSelected.last_name}
      </CardTitle>
      <LessonsPurchased>
        <TableTitles>
          <TableTitle>{trainerTexts.students_info.purchase}</TableTitle>
          <TableTitle>{trainerTexts.students_info.expire_date}</TableTitle>
        </TableTitles>
        <ScrollView height={240}>
          <LessonListContainer>
            {lessonsByStudent.separated?.length > 0 &&
              lessonsByStudent.separated.map(purchaseDate => (
                <LessonGroup key={purchaseDate.id}>
                  <Dropdown
                    onClick={() => {
                      if (
                        groupSelected === null ||
                        groupSelected !== purchaseDate
                      ) {
                        setGroupSelected(purchaseDate)
                        const filteredData = lessonsByStudent.purchases.filter(
                          item => {
                            const purchaseIds = JSON.parse(item.purchaseIds)
                            return purchaseIds.some(id =>
                              purchaseDate.ids.includes(id),
                            )
                          },
                        )
                        setPurchases(filteredData)
                      } else {
                        setGroupSelected(null)
                      }
                    }}
                    open={groupSelected === purchaseDate}
                  >
                    <div className="title">
                      <p>{purchaseDate.ids.length}</p>{" "}
                      <span>{trainerTexts.lessons}</span>
                    </div>
                    <div className="title">
                      <p>
                        {purchaseDate.date !== ""
                          ? calculateExpireDate(purchaseDate.date).string
                          : `${trainerTexts.students_info.without_payment}`}
                      </p>
                      <Icon icon="IconArrowRight" />
                    </div>
                  </Dropdown>
                  {groupSelected !== null && groupSelected === purchaseDate && (
                    <GroupInfo>
                      {purchases.map(purchase => (
                        <DateShown
                          key={purchase.id}
                          disabled={checkPastDate(purchase.date)}
                        >
                          {purchase.date}
                        </DateShown>
                      ))}
                    </GroupInfo>
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
