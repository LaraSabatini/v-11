import React, { useContext, useEffect } from "react"
import { Lessons } from "contexts/Lessons"
import PartnerInterface from "interfaces/partners/PartnerInterface"
import trainerTexts from "strings/trainers.json"
import theme from "theme/index"
import ScrollView from "components/UI/ScrollView"
import Pagination from "components/UI/Pagination"
import Icon from "components/UI/Assets/Icon"
import getPayments from "../../Helpers/getPayments"
import {
  Container,
  ListContainer,
  ListItem,
  IconContainer,
  NoMore,
  PaginatorContainer,
} from "./styles"

function StudentList() {
  const {
    students,
    studentSelected,
    setStudentSelected,
    setLessonsByStudent,
    currentPage,
    setCurrentPage,
    totalPages,
  } = useContext(Lessons)

  const checkSelection = (student: PartnerInterface) => {
    if (studentSelected?.id === student.id) {
      setStudentSelected(null)
      setLessonsByStudent([])
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

  return (
    <Container>
      <ScrollView height={450}>
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
    </Container>
  )
}

export default StudentList
