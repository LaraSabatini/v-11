import React, { useContext, useState, useRef } from "react"
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

  const [openFilters, setOpenFilters] = useState<boolean>(false)

  const calendarRef = useRef(null)

  const cleanDate = (e: string) => {
    const day = e.slice(0, 2)
    const month = e.slice(3, 5)
    const year = e.slice(6, 10)
    setTillDateSelected(`${day}-${month}-${year}`)
  }

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
        <InputCalendar
          position="bottom-right"
          width={200}
          valueCalendar={`${tillDateSelected.slice(
            0,
            2,
          )}/${tillDateSelected.slice(3, 5)}/${tillDateSelected.slice(6, 10)}`}
          reference={calendarRef}
          onChange={e => cleanDate(e.selectedChangeDate)}
        />
      </CalendarContainer>
    </FiltersContainer>
  )
}

export default TillFilters
