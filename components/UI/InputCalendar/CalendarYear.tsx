/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react"
import ScrollView from "components/UI/ScrollView"
import {
  CalendarDropDownContainer,
  CalendarDropDownContainerList,
  CalendarContainer,
  CalendarBody,
  CalendarBodyYear,
  CalendarYear,
} from "./styles"

interface CalendarDateYearInterface {
  actionYearClick: (y) => void // function to execute through props the setting in the CalendarMonthOfYear component, the correct year when clicking a year of the CalendarYear component
  yearFatherParam: number // to receive through props the year from the CalendarMonthOfYear component
  position: "bottom-left" | "bottom-right" | "top-left" | "top-right" // to position the drop-down calendar up or down the input. In turn, it can be adjusted towards the right or left margin of the input
  maxCalendarYearDate?: any // to receive and use a max date
  minCalendarYearDate?: any // to receive and use a min date
}

export interface CalendarYearInterface {
  isSelected: boolean
  isMaxDate: boolean
  isMinDate: boolean
}

export default function CalendarDateYear({
  actionYearClick,
  yearFatherParam,
  position,
  maxCalendarYearDate,
  minCalendarYearDate,
}: CalendarDateYearInterface) {
  /**
   * states for calendar
   */

  const [yearGo] = useState(yearFatherParam)
  const [arrayYearList, setArrayYearList] = useState([])

  /**
   * function to show past years and future years with respect to the selected year
   */

  const generateArrayYearList = () => {
    const arrayYearListPrev = []
    // eslint-disable-next-line for-direction
    // eslint-disable-next-line no-plusplus
    for (let i = yearFatherParam - 120; i < yearFatherParam; i++) {
      arrayYearListPrev.push(i)
    }
    // eslint-disable-next-line no-plusplus
    for (let i = yearFatherParam; i < yearFatherParam + 50; i++) {
      arrayYearListPrev.push(i)
    }
    setArrayYearList(arrayYearListPrev)
  }

  const scrollMidScreen = async () => {
    const yearSelected = await document.getElementById("yearSelected")
    yearSelected.scrollTop = 5265
  }

  /**
   * useEffect to update arrayYearList and set scroll
   */

  useEffect(() => {
    generateArrayYearList()
    scrollMidScreen()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /**
   * states to use min and max dates
   */

  const [maxDate, setMaxDate] = useState(maxCalendarYearDate || null)

  const maxYearDate =
    maxCalendarYearDate !== null &&
    maxCalendarYearDate !== undefined &&
    maxDate.split("/")
  const maxYearDateYyyy =
    maxCalendarYearDate !== null &&
    maxCalendarYearDate !== undefined &&
    maxYearDate[2]

  const [minDate, setMinDate] = useState(minCalendarYearDate || null)

  const minYearDate =
    minCalendarYearDate !== null &&
    minCalendarYearDate !== undefined &&
    minDate.split("/")
  const minYearDateYyyy =
    minCalendarYearDate !== null &&
    minCalendarYearDate !== undefined &&
    minYearDate[2]

  return (
    <CalendarDropDownContainer>
      <CalendarDropDownContainerList position={position}>
        <CalendarContainer>
          <CalendarBody>
            <CalendarBodyYear>
              <ScrollView height={303} id="yearSelected">
                {arrayYearList.map(y => (
                  <CalendarYear
                    key={y}
                    isSelected={y === yearGo}
                    onClick={
                      (maxDate !== null && y > maxYearDateYyyy) ||
                      (minDate !== null && y < minYearDateYyyy)
                        ? () => !actionYearClick
                        : () => actionYearClick(y)
                    }
                    isMaxDate={maxDate !== null && y > maxYearDateYyyy}
                    isMinDate={minDate !== null && y < minYearDateYyyy}
                  >
                    {y}
                  </CalendarYear>
                ))}
              </ScrollView>
            </CalendarBodyYear>
          </CalendarBody>
        </CalendarContainer>
      </CalendarDropDownContainerList>
    </CalendarDropDownContainer>
  )
}
