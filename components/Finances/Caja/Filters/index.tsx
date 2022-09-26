import React, { useContext, useState, useRef } from "react"
// DATA STORAGE & TYPES
import { Finances } from "contexts/Finances"
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

const FiltersCaja = () => {
  const {
    setCajaFilterSelected,
    cajaFilters,
    cajaFilterSelected,
    setCajaDateSelected,
    cajaDateSelected,
  } = useContext(Finances)

  const [openFilters, setOpenFilters] = useState<boolean>(false)

  const calendarRef = useRef(null)

  const cleanDate = (e: string) => {
    const day = e.slice(0, 2)
    const month = e.slice(3, 5)
    const year = e.slice(6, 10)
    setCajaDateSelected(`${day}-${month}-${year}`)
  }

  return (
    <FiltersContainer>
      <Filter>
        <Select onClick={() => setOpenFilters(!openFilters)}>
          {cajaFilterSelected !== null && <p>{cajaFilterSelected.filter}</p>}
          <Icon icon="IconArrowLeft" />
        </Select>
        {openFilters && (
          <Options>
            {cajaFilters.map((filter: { id: number; filter: string }) => (
              <Option
                onClick={() => setCajaFilterSelected(filter)}
                selected={cajaFilterSelected.id === filter.id}
              >
                {filter.filter}
              </Option>
            ))}
          </Options>
        )}
      </Filter>
      <CalendarContainer>
        <InputCalendar
          width={200}
          valueCalendar={cajaDateSelected}
          reference={calendarRef}
          onChange={e => cleanDate(e.selectedChangeDate)}
        />
      </CalendarContainer>
    </FiltersContainer>
  )
}

export default FiltersCaja
