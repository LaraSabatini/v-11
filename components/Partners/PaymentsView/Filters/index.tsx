import React, { useContext, useRef } from "react"
// DATA STORAGE & TYPES
import { PaymentsHistory } from "contexts/PaymentsHistory"
// COMPONENTS & STYLING
import InputCalendar from "components/UI/InputCalendar"
import { FiltersContainer, CalendarContainer } from "./styles"

const Filters = () => {
  const { setDateSelected } = useContext(PaymentsHistory)

  const calendarRef = useRef(null)

  return (
    <FiltersContainer>
      <CalendarContainer>
        <InputCalendar
          width={200}
          label="Fecha"
          reference={calendarRef}
          position="bottom-right"
          onChange={e => setDateSelected(e.selectedChangeDate)}
        />
      </CalendarContainer>
    </FiltersContainer>
  )
}

export default Filters
