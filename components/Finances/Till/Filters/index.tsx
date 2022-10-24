import React, { useContext, useState, useRef } from "react"
import { useRouter } from "next/router"
// DATA STORAGE & TYPES
import { Finances } from "contexts/Finances"
import { tillFilters } from "const/finances"
// COMPONENTS & STYLING
import Icon from "components/UI/Assets/Icon"
import InputCalendar from "components/UI/InputCalendar"
import {
  FiltersContainer,
  Filter,
  Options,
  Option,
  CalendarContainer,
  Select,
} from "./styles"

function TillFilters() {
  const {
    setTillFilterSelected,
    tillFilterSelected,
    setTillDateSelected,
    tillDateSelected,
  } = useContext(Finances)

  const router = useRouter()

  const [openFilters, setOpenFilters] = useState<boolean>(false)

  const calendarRef = useRef(null)

  const cleanDate = (e: string) => {
    const day = e.slice(0, 2)
    const month = e.slice(3, 5)
    const year = e.slice(6, 10)
    setTillDateSelected(`${day}-${month}-${year}`)
  }

  const getPermissions = localStorage.getItem("permissions")
  const permissions = JSON.parse(getPermissions)[0].sections
  const routeName = router.pathname.slice(1, router.pathname.length)

  const sectionPermissions = permissions.filter(
    section => section.name === routeName,
  )[0].sub_sections

  const billingPermissions = sectionPermissions.filter(
    subSection => subSection.name === "billing",
  )[0].actions

  return (
    <FiltersContainer>
      <Filter>
        <Select onClick={() => setOpenFilters(!openFilters)}>
          {tillFilterSelected !== null && <p>{tillFilterSelected.filter}</p>}
          <Icon icon="IconArrowLeft" />
        </Select>
        {openFilters && (
          <Options>
            {tillFilters.map((filter: { id: number; filter: string }) => (
              <Option
                key={filter.id}
                onClick={() => {
                  setTillFilterSelected(filter)
                  setOpenFilters(false)
                }}
                selected={tillFilterSelected.id === filter.id}
              >
                {filter.filter}
              </Option>
            ))}
          </Options>
        )}
      </Filter>

      <CalendarContainer>
        {billingPermissions.calendar && (
          <InputCalendar
            position="bottom-right"
            width={200}
            valueCalendar={`${tillDateSelected.slice(
              0,
              2,
            )}/${tillDateSelected.slice(3, 5)}/${tillDateSelected.slice(
              6,
              10,
            )}`}
            reference={calendarRef}
            onChange={e => cleanDate(e.selectedChangeDate)}
          />
        )}
      </CalendarContainer>
    </FiltersContainer>
  )
}

export default TillFilters
