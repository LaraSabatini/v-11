import React, { useContext, useEffect } from "react"
import { Lessons } from "contexts/Lessons"
import PartnerInterface from "interfaces/partners/PartnerInterface"
import getLessonsByStudent from "services/Trainers/studentLessons.service"
import trainerTexts from "strings/trainers.json"
import Pagination from "components/UI/Pagination"
import {
  Container,
  ListContainer,
  NoMore,
  PaginatorContainer,
  FiltersRow,
  Tab,
  InfoRow,
  FullName,
  PartnerNumber,
  Identification,
  MemberSince,
  ClientList,
  ClientRow,
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
    setTypeOfStudent,
    typeOfStudent,
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
    const req = await getLessonsByStudent(studentSelected.id)
    setLessonsByStudent(req.data)
  }

  useEffect(() => {
    if (studentSelected !== null) {
      getListPayments()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [studentSelected])

  return (
    <Container>
      <ListContainer>
        <FiltersRow>
          <Tab onClick={() => setTypeOfStudent("adults")}>Adultos</Tab>
          <Tab onClick={() => setTypeOfStudent("kids")}>Escuelita</Tab>
        </FiltersRow>
        <InfoRow>
          <FullName>{trainerTexts.table.fullName}</FullName>
          <PartnerNumber>{trainerTexts.table.number}</PartnerNumber>
          <Identification>
            {trainerTexts.table.identificationNumber}
          </Identification>
          <MemberSince>
            {typeOfStudent === "adults"
              ? `${trainerTexts.table.member_since}`
              : "Contacto"}
          </MemberSince>
        </InfoRow>
        <ClientRow>
          {students.length > 0 ? (
            students.map((student: PartnerInterface) => {
              return (
                <ClientList
                  isSelected={studentSelected?.id === student.id}
                  key={student.id}
                  onClick={() => checkSelection(student)}
                >
                  <FullName>
                    {student.name} {student.last_name}
                  </FullName>
                  <PartnerNumber>{student.id}</PartnerNumber>

                  <Identification>
                    {student.identification_number ?? student.identification}
                  </Identification>
                  <MemberSince>
                    {student.membership_start_date ??
                      `${student.tutor_name} - ${student.phone}`}
                  </MemberSince>
                </ClientList>
              )
            })
          ) : (
            <NoMore>{trainerTexts.students_info.no_results}</NoMore>
          )}
        </ClientRow>
      </ListContainer>
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
