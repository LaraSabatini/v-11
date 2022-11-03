import React, { useContext, useEffect, useState } from "react"
// SERVICES
import { getStudents } from "services/Partners/Partner.service"
// DATA STORAGE & TYPES
import { searchPartnerAction } from "helpers/partners"
import { Lessons } from "contexts/Lessons"
import PartnerInterface from "interfaces/partners/PartnerInterface"
import { day, month, year } from "const/time"
import generalTexts from "strings/general.json"
import trainerTexts from "strings/trainers.json"
// COMPONENTS & STYLING
import PopOver from "components/UI/PopOver"
import Icon from "components/UI/Assets/Icon"
import theme from "theme/index"
import ScrollView from "components/UI/ScrollView"
import SearchBar from "components/UI/SearchBar"
import Pagination from "components/UI/Pagination"
import getPayments from "./utils/getPayments"
import calcExpireDate from "./utils/calcExpireDate"
import {
  ListContainer,
  ListItem,
  IconContainer,
  Container,
  LeftContainer,
  PaginatorContainer,
  NoMore,
  SearchBarContainer,
  RightContainer,
  LessonsPurchased,
  TableTitle,
  TableTitles,
  HelpContainer,
  LessonGroup,
  Dropdown,
  DateShown,
  GroupInfo,
  LessonListContainer,
} from "./styles"

function StudentsView() {
  const { setStudents, students } = useContext(Lessons)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [studentSelected, setStudentSelected] = useState<PartnerInterface>(null)
  const [searchValue, setSearchValue] = useState<string>("")
  const [lessonsByStudent, setLessonsByStudent] = useState([])
  const [popOverView, setPopOverView] = useState<boolean>(false)
  const [totalPages, setTotalPages] = useState<number>(1)

  const [groupSelected, setGroupSelected] = useState<number>(null)

  const todayDate = new Date(`${year}-${month}-${day}`)

  const getStudentsList = async () => {
    setStudentSelected(null)
    const getStudentsCall = await getStudents(currentPage)
    setStudents(getStudentsCall.data)
    setTotalPages(getStudentsCall.meta.totalPages)
  }

  useEffect(() => {
    getStudentsList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage])

  const searchStudentInDB = async () => {
    setStudentSelected(null)
    const searchPartnerCall = await searchPartnerAction(searchValue)
    setStudents(searchPartnerCall.data)
    setTotalPages(searchPartnerCall.meta.totalPages)
  }

  const checkSelection = (student: PartnerInterface) => {
    if (studentSelected?.id === student.id) {
      setStudentSelected(null)
    } else {
      setStudentSelected(student)
    }
  }

  const getListPayments = async () => {
    const list = await getPayments(studentSelected.id)
    setLessonsByStudent(list)
  }

  useEffect(() => {
    if (studentSelected !== null) {
      getListPayments()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [studentSelected])

  const checkPastDate = date => {
    const cleanDate = `${date.slice(6, 10)}-${date.slice(3, 5)}-${date.slice(
      0,
      2,
    )}`

    const lessonDate = new Date(cleanDate)
    const isDisabled = lessonDate < todayDate
    return isDisabled
  }

  return (
    <Container>
      <LeftContainer>
        <SearchBarContainer>
          <SearchBar
            searchValue={searchValue}
            onChangeSearch={e => {
              if (e.target.value === "") {
                getStudentsList()
                setSearchValue("")
              } else {
                setSearchValue(e.target.value)
              }
            }}
            width={250}
            enterSearch={searchStudentInDB}
          />
          <HelpContainer onClick={() => setPopOverView(!popOverView)}>
            <PopOver
              title={generalTexts.search.title}
              description={generalTexts.search.description}
              view={popOverView}
            />
            <Icon icon="IconHelp" />
          </HelpContainer>
        </SearchBarContainer>
        <ScrollView height={500}>
          <ListContainer>
            {students.length > 0 ? (
              students.map((student: PartnerInterface) => (
                <ListItem
                  key={student.id}
                  onClick={() => checkSelection(student)}
                >
                  {student.name} {student.last_name}
                  <IconContainer active={studentSelected?.id === student.id}>
                    <Icon icon="IconArrowRight" color={theme.colors.primary} />
                  </IconContainer>
                </ListItem>
              ))
            ) : (
              <NoMore>{trainerTexts.students_info.no_results}</NoMore>
            )}
          </ListContainer>
        </ScrollView>
        <PaginatorContainer>
          <Pagination
            setPage={currentPage}
            onClickNext={() => setCurrentPage(currentPage + 1)}
            onClickBack={() => {
              if (currentPage > 1) {
                setCurrentPage(currentPage - 1)
              }
            }}
            totalPages={totalPages}
          />
        </PaginatorContainer>
      </LeftContainer>
      {studentSelected !== null && (
        <RightContainer>
          <p className="name">
            {trainerTexts.students_info.payments_history} -{" "}
            {studentSelected.name} {studentSelected.last_name}
          </p>
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
                          if (
                            groupSelected === null ||
                            groupSelected !== lesson
                          ) {
                            setGroupSelected(lesson)
                          } else {
                            setGroupSelected(null)
                          }
                        }}
                        open={groupSelected === lesson}
                      >
                        <div className="title">
                          <p>{lesson.length}</p>{" "}
                          <span>{trainerTexts.lessons}</span>
                        </div>
                        <div className="title">
                          <p>
                            {lesson[0].paid_day !== ""
                              ? calcExpireDate(lesson[0].paid_day).string
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
        </RightContainer>
      )}
    </Container>
  )
}

export default StudentsView
