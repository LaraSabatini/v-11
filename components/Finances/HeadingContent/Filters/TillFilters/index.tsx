import React, { useContext, useState, useRef } from "react"
import { Finances } from "contexts/Finances"
import { tillFilters } from "const/finances"
import Icon from "components/UI/Assets/Icon"
import InputCalendar from "components/UI/InputCalendar"
import cleanDate from "../../../Helpers/cleanDate"
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

  const calendarRef = useRef(null)
  const [openFilters, setOpenFilters] = useState<boolean>(false)

  const getPermissions = localStorage.getItem("permissions")
  const permissions = JSON.parse(getPermissions)[0].sections[3].sub_sections
  const billingPermissions = permissions[0].actions

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

      {billingPermissions.calendar && (
        <CalendarContainer>
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
            onChange={e => setTillDateSelected(cleanDate(e.selectedChangeDate))}
          />
        </CalendarContainer>
      )}
    </FiltersContainer>
  )
}

export default TillFilters
