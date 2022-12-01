import React, { useContext, useEffect } from "react"
import { Lessons } from "contexts/Lessons"
import { getStudentsAction } from "helpers/partners"
import StudentList from "./StudentList"
import StudentDetails from "./StudentDetails"
import Container from "./styles"

function Students() {
  const {
    studentSelected,
    currentPage,
    setStudents,
    setTotalPages,
  } = useContext(Lessons)

  const setStudentsList = async () => {
    const getList = await getStudentsAction(currentPage)
    setStudents(getList.data)
    setTotalPages(getList.meta.totalPages)
  }

  useEffect(() => {
    setStudentsList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage])

  return (
    <Container>
      <StudentList />
      {studentSelected !== null && <StudentDetails />}
    </Container>
  )
}

export default Students
