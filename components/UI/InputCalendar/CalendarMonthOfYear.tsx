/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react"
import Icon from "components/UI/Assets/Icon"
import theme from "theme/index"
import CalendarDateYear from "./CalendarYear"
import {
  CalendarDropDownContainer,
  CalendarDropDownContainerList,
  CalendarContainer,
  CalendarHeader,
  CalendarButton,
  CalendarHeaderTitle,
  CalendarBody,
  CalendarMonthYearContainer,
  CalendarMonthYear,
  CalendarMonthYearContent,
} from "./styles"

interface CalendarMonthOfYearInterface {
  actionClick: (y, m, d) => void // function to execute through props the setting in the calendar index.tsx, the correct year, month and day when clicking on a month and year of the CalendarMonthOfYear component
  yearMonthFatherParam: number // to receive through props the year from the calendar index.tsx
  monthFatherParam: number // to receive the month through props from the calendar index.tsx
  abbreviatedMonth: CalendarAbbreviatedMonth[] // array to indicate the abbreviated months of the year. They come from the api general text
  position: "bottom-left" | "bottom-right" | "top-left" | "top-right" // to position the drop-down calendar up or down the input. In turn, it can be adjusted towards the right or left margin of the input
  maxCalendarMonthOfYearDate?: any // to receive and use a max date
  minCalendarMonthOfYearDate?: any // to receive and use a min date
}

interface CalendarAbbreviatedMonth {
  id: number
  display_name: string
}

export interface CalendarMonthInterface {
  isSelected: boolean
  isMaxDate: boolean
  isMinDate: boolean
}

export default function CalendarMonthOfYear({
  actionClick,
  yearMonthFatherParam,
  monthFatherParam,
  abbreviatedMonth,
  position,
  maxCalendarMonthOfYearDate,
  minCalendarMonthOfYearDate,
}: CalendarMonthOfYearInterface) {
  /**
   * array to set month nomenclatures
   */

  const individualMonth = abbreviatedMonth

  /**
   * states for calendar
   */

  const today = new Date()
  const [date] = useState(today)
  const [day] = useState(date.getDate())
  const [month, setMonth] = useState(monthFatherParam)
  const [yearGo, setYear] = useState(yearMonthFatherParam)

  /**
   * state to open or close calendar
   */

  const [openYear, setOpenYear] = useState(false)

  const toggleYear = () => setOpenYear(!openYear)

  /**
   * function to select a year
   */

  const onYearClicked = yearParam => {
    setYear(yearParam)
    setOpenYear(false)
  }

  /**
   * states to use min and max dates
   */

  const [maxDate, setMaxDate] = useState(maxCalendarMonthOfYearDate || null)

  const maxMonthDate =
    maxCalendarMonthOfYearDate !== null &&
    maxCalendarMonthOfYearDate !== undefined &&
    maxDate.split("/")
  const maxMonthDateYyyy =
    maxCalendarMonthOfYearDate !== null &&
    maxCalendarMonthOfYearDate !== undefined &&
    maxMonthDate[2]
  const maxMonthDateMm =
    maxCalendarMonthOfYearDate !== null &&
    maxCalendarMonthOfYearDate !== undefined &&
    maxMonthDate[1]
  const maxMonthDateDd =
    maxCalendarMonthOfYearDate !== null &&
    maxCalendarMonthOfYearDate !== undefined &&
    maxMonthDate[0]
  const todayMaxMonthDate = new Date(
    `${maxMonthDateYyyy}/${maxMonthDateMm}/${maxMonthDateDd}`,
  )

  const [minDate, setMinDate] = useState(minCalendarMonthOfYearDate || null)

  const minMonthDate =
    minCalendarMonthOfYearDate !== null &&
    minCalendarMonthOfYearDate !== undefined &&
    minDate.split("/")
  const minMonthDateYyyy =
    minCalendarMonthOfYearDate !== null &&
    minCalendarMonthOfYearDate !== undefined &&
    minMonthDate[2]
  const minMonthDateMm =
    minCalendarMonthOfYearDate !== null &&
    minCalendarMonthOfYearDate !== undefined &&
    minMonthDate[1]
  const minMonthDateDd =
    minCalendarMonthOfYearDate !== null &&
    minCalendarMonthOfYearDate !== undefined &&
    minMonthDate[0]
  const todayMinMonthDate = new Date(
    `${minMonthDateYyyy}/${minMonthDateMm}/${minMonthDateDd}`,
  )

  useEffect(() => {
    setMaxDate(maxDate)
    setMinDate(minDate)
  }, [maxDate, minDate])

  return (
    <>
      <CalendarDropDownContainer>
        <CalendarDropDownContainerList position={position}>
          <CalendarContainer>
            <CalendarHeader>
              <CalendarButton rotate="true" onClick={() => setYear(yearGo - 1)}>
                <Icon
                  icon="IconSingleArrow"
                  color={`${theme.colors.primary}`}
                />
              </CalendarButton>
              <CalendarHeaderTitle onClick={toggleYear}>
                {yearGo}
              </CalendarHeaderTitle>
              <CalendarButton onClick={() => setYear(yearGo + 1)}>
                <Icon
                  icon="IconSingleArrow"
                  color={`${theme.colors.primary}`}
                />
              </CalendarButton>
            </CalendarHeader>
            <CalendarBody>
              {individualMonth.map((m, index) => (
                <CalendarMonthYearContainer key={m.id}>
                  <CalendarMonthYear
                    key={m.id}
                    isSelected={m.id === month + 1}
                    isMaxDate={
                      maxDate !== null &&
                      new Date(yearGo, index, day) > todayMaxMonthDate
                    }
                    isMinDate={
                      minDate !== null &&
                      new Date(yearGo, m.id, day) < todayMinMonthDate
                    }
                  >
                    <CalendarMonthYearContent
                      onClick={
                        (maxDate !== null &&
                          new Date(yearGo, index, day) > todayMaxMonthDate) ||
                        (minDate !== null &&
                          new Date(yearGo, m.id, day) < todayMinMonthDate)
                          ? () => !actionClick
                          : () => actionClick(yearGo, index, day)
                      }
                      isSelected={m.id === month + 1}
                      isMaxDate={
                        maxDate !== null &&
                        new Date(yearGo, index, day) > todayMaxMonthDate
                      }
                      isMinDate={
                        minDate !== null &&
                        new Date(yearGo, m.id, day) < todayMinMonthDate
                      }
                    >
                      {m.display_name}
                    </CalendarMonthYearContent>
                  </CalendarMonthYear>
                </CalendarMonthYearContainer>
              ))}
            </CalendarBody>
          </CalendarContainer>
        </CalendarDropDownContainerList>
      </CalendarDropDownContainer>
      {openYear && (
        <CalendarDateYear
          actionYearClick={onYearClicked}
          yearFatherParam={yearGo}
          position={position}
          maxCalendarYearDate={maxCalendarMonthOfYearDate}
          minCalendarYearDate={minCalendarMonthOfYearDate}
        />
      )}
    </>
  )
}
