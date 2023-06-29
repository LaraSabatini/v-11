import React, { useContext, useEffect } from "react"
import { Lessons } from "contexts/Lessons"
import { getStudentsAction } from "helpers/partners"
import { getKids } from "services/Partners/Kids.service"
import StudentList from "./StudentList"
import StudentDetails from "./StudentDetails"
import Container from "./styles"

function Students() {
  const {
    studentSelected,
    currentPage,
    setCurrentPage,
    setStudents,
    setTotalPages,
    typeOfStudent,
  } = useContext(Lessons)

  const setStudentsList = async () => {
    if (typeOfStudent === "adults") {
      const getList = await getStudentsAction(currentPage)
      setStudents(getList.data)
      setTotalPages(getList.meta.totalPages)
    } else {
      const getList = await getKids(currentPage)
      setStudents(getList.data)
      setTotalPages(getList.meta.totalPages)
    }
  }

  useEffect(() => {
    setStudentsList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, typeOfStudent])

  useEffect(() => {
    setCurrentPage(1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typeOfStudent])

  return (
    <Container>
      <StudentList />
      {studentSelected !== null && <StudentDetails />}
    </Container>
  )
}

export default Students
