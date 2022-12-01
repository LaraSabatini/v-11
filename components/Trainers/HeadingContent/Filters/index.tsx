import React, { useContext, useState } from "react"
import { Lessons } from "contexts/Lessons"
import { searchPartnerAction, getStudentsAction } from "helpers/partners"
import generalTexts from "strings/general.json"
import SearchBar from "components/UI/SearchBar"
import PopOver from "components/UI/PopOver"
import Icon from "components/UI/Assets/Icon"
import { SearchBarContainer, HelpContainer } from "./styles"

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

  const [popOverView, setPopOverView] = useState<boolean>(false)

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
        <SearchBarContainer>
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
          <HelpContainer onClick={() => setPopOverView(!popOverView)}>
            <PopOver
              title={generalTexts.search.title}
              description={generalTexts.search.description}
              view={popOverView}
            />
            <Icon icon="IconHelp" />
          </HelpContainer>
        </SearchBarContainer>
      )}
    </>
  )
}

export default Filters
