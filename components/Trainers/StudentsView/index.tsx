import React, { useContext, useEffect, useState } from "react"
// SERVICES
import { getStudents, searchPartner } from "services/Partners/Partner.service"
import { getLessonsByPartnerAndPaid } from "services/Trainers/LessonsPurchased.service"
// DATA STORAGE & TYPES
import { Lessons } from "contexts/Lessons"
import PartnerInterface from "interfaces/partners/PartnerInterface"
// import ClasesPurchasedInterface from "interfaces/trainers/ClasesPurchasedInterface"
// COMPONENTS & STYLING
import Icon from "components/UI/Assets/Icon"
import theme from "theme/index"
import ScrollView from "components/UI/ScrollView"
import SearchBar from "components/UI/SearchBar"
import Pagination from "components/UI/Pagination"
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
} from "./styles"

function StudentsView() {
  const { setStudents, students } = useContext(Lessons)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [studentSelected, setStudentSelected] = useState<PartnerInterface>(null)
  const [searchValue, setSearchValue] = useState<string>("")
  const [lessonsByStudent, setLessonsByStudent] = useState([])

  const getStudentsList = async () => {
    if (searchValue.length <= 3) {
      const getStudentsCall = await getStudents(currentPage)
      setStudents(getStudentsCall.data)
    } else {
      const searchPartnerCall = await searchPartner(searchValue, 1)
      setStudents(searchPartnerCall.data)
    }
  }

  useEffect(() => {
    getStudentsList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, searchValue])

  const checkSelection = (student: PartnerInterface) => {
    if (studentSelected?.id === student.id) {
      setStudentSelected(null)
    } else {
      setStudentSelected(student)
    }
  }

  const goNext = () => {
    setCurrentPage(currentPage + 1)
  }

  const goPrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const getPayments = async () => {
    const lessonsPaid = await getLessonsByPartnerAndPaid(
      studentSelected.id,
      "SI",
    )
    const lessonsNotPaid = await getLessonsByPartnerAndPaid(
      studentSelected.id,
      "NO",
    )

    const finalArr = lessonsPaid.data
      .concat(lessonsNotPaid.data)
      .sort((a, b) => {
        return b.id - a.id
      })

    const paidDays = []
    finalArr.map(purchase => paidDays.push(purchase.paid_day))

    const uniqueArray = paidDays.filter((item, pos) => {
      return paidDays.indexOf(item) === pos
    })

    const finalArrayOfDates = uniqueArray.map(paidDate => {
      const arrayOfDates = []
      finalArr.filter(
        lesson => lesson.paid_day === paidDate && arrayOfDates.push(lesson),
      )
      return arrayOfDates
    })

    setLessonsByStudent(finalArrayOfDates)

    // console.log("PRUEBA", prueba)

    // setRows(uniqueArray)

    // duplicatedDates = uniqueArray

    // eslint-disable-next-line no-console
    console.log("FINAL", finalArr)

    // setLessonsByStudent(finalArr)
  }

  useEffect(() => {
    if (studentSelected !== null) {
      getPayments()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [studentSelected])

  return (
    <Container>
      <LeftContainer>
        <SearchBarContainer>
          <SearchBar
            searchValue={searchValue}
            onChangeSearch={e => setSearchValue(e.target.value)}
            width={250}
          />
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
              <NoMore>NO HAY MAS ALUMNOS EN LA LISTA</NoMore>
            )}
          </ListContainer>
        </ScrollView>
        <PaginatorContainer>
          <Pagination
            totalPages={1}
            setPage={currentPage}
            onClickNext={goNext}
            onClickBack={goPrev}
          />
        </PaginatorContainer>
      </LeftContainer>
      {studentSelected !== null && (
        <RightContainer>
          <p className="name">
            Historial de pagos - {studentSelected.name}{" "}
            {studentSelected.last_name}
          </p>
          <LessonsPurchased>
            <TableTitles>
              <TableTitle>Fecha clase/s:</TableTitle>
              <TableTitle>Fecha pago:</TableTitle>
            </TableTitles>
            {lessonsByStudent.length > 0 &&
              lessonsByStudent.map((lesson, i) => (
                <div key={lesson} className="row">
                  <div className="sub-content">
                    <div className="column">
                      {lesson.length > 1 ? (
                        <div className="content">
                          <p>{lesson.length}</p> <span>Clases</span>
                        </div>
                      ) : (
                        <div className="content">
                          <span>{lesson[i]?.lesson_date}</span>
                        </div>
                      )}
                    </div>
                    <div>
                      {lesson[i]?.paid_day === ""
                        ? "Impago"
                        : `${lesson[i]?.paid_day}`}
                    </div>
                  </div>

                  {/* {lesson.map((h, i) => (
                    <div key={h.id} className="sub-content">
                      <div className="column">
                        {lesson.length > 1 ? (
                          <>
                            <p>{lesson.length}</p> <span>Clases</span>
                          </>
                        ) : (
                          <>
                            <p>{i + 1})</p> <span>{h.lesson_date}</span>
                          </>
                        )}
                      </div>
                      <div>
                        {h.paid_day === "" ? "Impago" : `${h.paid_day}`}
                      </div>
                    </div>
                  ))} */}
                </div>
              ))}
          </LessonsPurchased>
        </RightContainer>
      )}
    </Container>
  )
}

export default StudentsView
