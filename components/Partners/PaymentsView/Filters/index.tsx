import React, { useContext, useState, useRef } from "react"
import { PaymentsHistory } from "contexts/PaymentsHistory"
import InputCalendar from "components/UI/InputCalendar"
import Icon from "components/UI/Assets/Icon"
import {
  FiltersContainer,
  Select,
  IconContainer,
  Selector,
  Option,
  CalendarContainer,
} from "./styles"

const Filters = () => {
  const { months, setMonthSelected, setDateSelected } = useContext(
    PaymentsHistory,
  )

  const [openMonthMenu, setOpenMonthMenu] = useState<boolean>(false)

  const calendarRef = useRef(null)

  return (
    <FiltersContainer>
      <Select
        onClick={() => {
          setOpenMonthMenu(!openMonthMenu)
        }}
      >
        <div className="select">
          <p>Mes</p>
          <IconContainer>
            <Icon icon="IconArrowLeft" />
          </IconContainer>
        </div>
        {openMonthMenu && (
          <Selector>
            {months.length &&
              months.map((month: { id: number; display_name: string }) => (
                <Option
                  key={month.id}
                  onClick={() => setMonthSelected(month.id)}
                >
                  {month.display_name}
                </Option>
              ))}
            <Option onClick={() => setMonthSelected(null)}>Todos</Option>
          </Selector>
        )}
      </Select>
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
