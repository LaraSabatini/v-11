import React, { useContext, useEffect, useState } from "react"
// SERVICES
import { getStudents, searchPartner } from "services/Partners/Partner.service"
// DATA STORAGE & TYPES
import { Lessons } from "contexts/LessonsContext"
import PartnerInterface from "interfaces/partners/PartnerInterface"
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
} from "./styles"

const StudentsView = () => {
  // BUSCADOR
  // CADA ALUMNO:
  /*
        clases compradas
        pasadas
        hoy
        futuras

        cuando pago cada clase o pack => partner payments => VER SI ES POSIBLE
    */

  const { setStudents, students } = useContext(Lessons)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [studentSelected, setStudentSelected] = useState<PartnerInterface>(null)
  const [searchValue, setSearchValue] = useState<string>("")

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
            totalPages="?"
            setPage={currentPage}
            onClickNext={goNext}
            onClickBack={goPrev}
          />
        </PaginatorContainer>
      </LeftContainer>
      {studentSelected !== null && (
        <RightContainer>
          <p className="name">
            {studentSelected.name} {studentSelected.last_name}
          </p>
        </RightContainer>
      )}
    </Container>
  )
}

export default StudentsView
