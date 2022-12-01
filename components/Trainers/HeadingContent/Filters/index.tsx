import React, { useContext } from "react"
import { Lessons } from "contexts/Lessons"
import { searchPartnerAction, getStudentsAction } from "helpers/partners"
import SearchBar from "components/UI/SearchBar"

interface FiltersInterface {
  routeIsStudents: boolean
}

function Filters({ routeIsStudents }: FiltersInterface) {
  const {
    studentsSearchValue,
    setStudentsSearchValue,
    setStudentSelected,
    currentPage,
    setStudents,
    setTotalPages,
  } = useContext(Lessons)

  const getStudentsList = async () => {
    setStudentSelected(null)
    const getStudentsCall = await getStudentsAction(currentPage)
    setStudents(getStudentsCall.data)
    setTotalPages(getStudentsCall.meta.totalPages)
  }

  const searchStudentInDB = async () => {
    setStudentSelected(null)
    const searchPartnerCall = await searchPartnerAction(studentsSearchValue)
    setStudents(searchPartnerCall.data)
    setTotalPages(searchPartnerCall.meta.totalPages)
  }

  return (
    <>
      {routeIsStudents && (
        <SearchBar
          searchValue={studentsSearchValue}
          onChangeSearch={e => {
            if (e.target.value === "") {
              getStudentsList()
              setStudentsSearchValue("")
            } else {
              setStudentsSearchValue(e.target.value)
            }
          }}
          enterSearch={searchStudentInDB}
          width={220}
        />
      )}
    </>
  )
}

export default Filters
