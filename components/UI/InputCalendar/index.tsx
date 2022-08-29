/* eslint-disable no-nested-ternary */
import React, { useState, useEffect, useRef, RefObject } from "react"
import theme from "theme/index"
import Icon from "components/UI/Assets/Icon"
import CalendarMonthOfYear from "./CalendarMonthOfYear"
import ErrorMessage from "../ErrorMessage"
import {
  FieldContainer,
  Label,
  InputCalendarFieldContainer,
  InputContainer,
  IconContainer,
  CalendarDropDownContainer,
  CalendarDropDownContainerList,
  CalendarContainer,
  CalendarHeader,
  CalendarButton,
  CalendarHeaderTitle,
  CalendarBody,
  CalendarDayWeekContainer,
  CalendarDayWeek,
  CalendarDateNumberWeekContainer,
  CalendarDateNumberWeek,
  CalendarDateNumberWeekContent,
  ErrorMessageContainer,
} from "./styles"

export interface InputCalendarInterface {
  width?: number // to change width of the input container
  height?: number // to change height of the input container
  success?: boolean // to display the input with the style of success
  label?: string // to set a label title to de input calendar
  disabled?: boolean // to display field disabled
  disabledAutocompleted?: boolean // to display the field disabled
  required?: boolean // to mark that the input calendar is a required field in a form
  error?: boolean // to display error messages and change styles in such case
  backError?: boolean // hears a state when consumed to change styles in the presence of an error
  backErrorMessage?: string // has content to error messages in the presence of an error backend
  position?: "bottom-left" | "bottom-right" | "top-left" | "top-right" // to position the drop-down calendar up or down the input. In turn, it can be adjusted towards the right or left margin of the input
  isFocus?: boolean
  onChange?: (value?: { selectedChangeDate?: string }) => void // to capture the new input value when changing steps on a form
  valueCalendar?: any // to give it a specific value from an api
  reference: RefObject<HTMLInputElement> // important prop, takes the reference as value for its operation
  forceValidations?: boolean // to make another instance of validation
  maxCalendarDate?: any // to set a max date
  minCalendarDate?: any // to set a min date
}

export interface CalendarDateNumberWeekInterface {
  isToday: boolean
  isSelected: boolean
  isOff: boolean
  isMaxDate: boolean
  isMinDate: boolean
}

const InputCalendar = ({
  width,
  height,
  success,
  label,
  disabled,
  disabledAutocompleted,
  required,
  position,
  onChange,
  valueCalendar,
  backError,
  backErrorMessage,
  reference,
  forceValidations,
  maxCalendarDate,
  minCalendarDate,
}: InputCalendarInterface) => {
  /**
   * state to open or close calendars
   */
  const [openCalendar, setOpenCalendar] = useState(false)
  const [openMonthYear, setOpenMonthYear] = useState(false)

  const toggleCalendar = e => {
    e.preventDefault()
    setOpenCalendar(!openCalendar)
    if (openMonthYear === true) {
      setOpenCalendar(false)
    }
  }
  const toggleMonthYear = () => {
    setOpenMonthYear(!openMonthYear)
    setOpenCalendar(!openCalendar)
  }

  // status to change the color of the IconCalendar and placeholder in onFocus or onBlur events
  const [isHover, setIsHover] = useState(false)
  const [isPlaceholder, setIsPlaceholder] = useState(false)
  const [isFocus, setIsFocus] = useState(false)

  /**
   * states to display messages from general text api
   * when an incorrect date format is placed or the input calendar field is required
   */

  //   const [requiredInputCalendar, setRequiredInputCalendar] = useState("")
  const requiredInputCalendar = "Este campo es requerido"
  //   const [regexDate, setRegexDate] = useState("")
  const regexDate = "error regex"

  const response = {
    isRequired: requiredInputCalendar,
    hasRegExDate: regexDate,
    maxLimit: "Debes elegir una fecha anterior",
    minLimit: "Debes elegir una fecha posterior",
  }

  /**
   * regular expression for date format
   */

  const dateRegEx = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/

  /**
   * states to set error messages
   */

  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  /**
   * constants to indicate the number of days you have each month and in a leap year
   */

  const DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  const DAYS_LEAP = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

  /**
   * states and function to read general text api texts and display the days of the week,
   * months of the year and abbreviated months on the screen ; region/language and placeholder
   */

  const daysOfWeek = [
    {
      id: 1,
      display_name: "L",
    },
    {
      id: 2,
      display_name: "M",
    },
    {
      id: 3,
      display_name: "X",
    },
    {
      id: 4,
      display_name: "J",
    },
    {
      id: 5,
      display_name: "V",
    },
    {
      id: 6,
      display_name: "S",
    },
    {
      id: 7,
      display_name: "D",
    },
  ]
  //   const [monthOfYear, setMonthOfYear] = useState([])
  const monthOfYear = [
    {
      id: 1,
      display_name: "Enero",
    },
    {
      id: 2,
      display_name: "Febrero",
    },
    {
      id: 3,
      display_name: "Marzo",
    },
    {
      id: 4,
      display_name: "Abril",
    },
    {
      id: 5,
      display_name: "Mayo",
    },
    {
      id: 6,
      display_name: "Junio",
    },
    {
      id: 7,
      display_name: "Julio",
    },
    {
      id: 8,
      display_name: "Agosto",
    },
    {
      id: 9,
      display_name: "Septiembre",
    },
    {
      id: 10,
      display_name: "Octubre",
    },
    {
      id: 11,
      display_name: "Noviembre",
    },
    {
      id: 12,
      display_name: "Diciembre",
    },
  ]
  const abbreviatedMonth = [
    {
      id: 1,
      display_name: "Ene",
    },
    {
      id: 2,
      display_name: "Feb",
    },
    {
      id: 3,
      display_name: "Mar",
    },
    {
      id: 4,
      display_name: "Abr",
    },
    {
      id: 5,
      display_name: "May",
    },
    {
      id: 6,
      display_name: "Jun",
    },
    {
      id: 7,
      display_name: "Jul",
    },
    {
      id: 8,
      display_name: "Ago",
    },
    {
      id: 9,
      display_name: "Sept",
    },
    {
      id: 10,
      display_name: "Oct",
    },
    {
      id: 11,
      display_name: "Nov",
    },
    {
      id: 12,
      display_name: "Dic",
    },
  ]
  const region = "region"
  const placeholder = "01/01/2000"

  /**
   * states for calendar
   */

  const today = new Date()
  const [date, setDate] = useState(today)
  const [day, setDay] = useState(date.getDate())
  const [month, setMonth] = useState(date.getMonth())
  const [yearGo, setYear] = useState(date.getFullYear())

  function getStartDayOfMonth(dateStartMonth: Date) {
    const startDate = new Date(
      dateStartMonth.getFullYear(),
      dateStartMonth.getMonth(),
      1,
    ).getDay()
    return startDate === 0 ? 7 : startDate
  }

  const [startDay, setStartDay] = useState(getStartDayOfMonth(date))

  useEffect(() => {
    setDay(date.getDate())
    setMonth(date.getMonth())
    setYear(date.getFullYear())
    setStartDay(getStartDayOfMonth(date))
  }, [date])

  function isLeapYear(year: number) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
  }

  const days = isLeapYear(yearGo) ? DAYS_LEAP : DAYS

  /**
   * states to use min and max dates
   */

  const [maxDate, setMaxDate] = useState(maxCalendarDate || null)

  const maxDateCalendar =
    maxCalendarDate !== null &&
    maxCalendarDate !== undefined &&
    maxDate?.split("/")
  const maxDateYyyy =
    maxCalendarDate !== null &&
    maxCalendarDate !== undefined &&
    maxDateCalendar[2]
  const maxDateMm =
    maxCalendarDate !== null &&
    maxCalendarDate !== undefined &&
    maxDateCalendar[1]
  const maxDateDd =
    maxCalendarDate !== null &&
    maxCalendarDate !== undefined &&
    maxDateCalendar[0]
  const todayMaxDate = new Date(`${maxDateYyyy}/${maxDateMm}/${maxDateDd}`)

  const [minDate, setMinDate] = useState(minCalendarDate || null)

  const minDateCalendar =
    minCalendarDate !== null &&
    minCalendarDate !== undefined &&
    minDate?.split("/")
  const minDateYyyy =
    minCalendarDate !== null &&
    minCalendarDate !== undefined &&
    minDateCalendar[2]
  const minDateMm =
    minCalendarDate !== null &&
    minCalendarDate !== undefined &&
    minDateCalendar[1]
  const minDateDd =
    minCalendarDate !== null &&
    minCalendarDate !== undefined &&
    minDateCalendar[0]
  const todayMinDate = new Date(`${minDateYyyy}/${minDateMm}/${minDateDd}`)

  useEffect(() => {
    setMaxDate(maxCalendarDate)
    setMinDate(minCalendarDate)
  }, [maxCalendarDate, minCalendarDate, maxDateCalendar, minDateCalendar])

  /**
   * state and function to select a date
   */

  const [selectedDate, setSelectedDate] = useState(valueCalendar || "")

  const onDateClicked = e => {
    setSelectedDate(e)
    setOpenCalendar(false)
    setError(false)
    setIsFocus(false)
    setIsHover(false)

    if (onChange !== undefined)
      onChange({
        selectedChangeDate: e,
      })
  }

  const onMonthClicked = (yearParam, monthParam, dayParam) => {
    setDate(new Date(yearParam, monthParam, dayParam))
    setDay(parseInt(dayParam, 10))
    setYear(yearParam)
    setMonth(parseInt(monthParam, 10))
    setStartDay(getStartDayOfMonth(new Date(parseInt(dayParam, 10))))
    setOpenMonthYear(false)
    setOpenCalendar(true)
  }

  const handleChangeDate = e => {
    setOpenCalendar(false)
    const { value } = e.target
    const arrayDate = value.split("/")
    const yyyy = arrayDate[2]
    const mm = arrayDate[1]
    const dd = arrayDate[0]
    const toDay = new Date(`${yyyy}/${mm}/${dd}`)
    setDay(parseInt(dd, 10))
    setMonth(parseInt(mm, 10) - 1)
    setYear(parseInt(yyyy, 10))
    setStartDay(getStartDayOfMonth(toDay))
    setSelectedDate(value)
    if (!value || !e.currentTarget.value.match(dateRegEx)) {
      setDay(date.getDate())
      setMonth(date.getMonth())
      setYear(date.getFullYear())
      setStartDay(getStartDayOfMonth(date))
    }

    if (onChange !== undefined)
      onChange({
        selectedChangeDate: value,
      })
  }

  useEffect(() => {
    setSelectedDate(valueCalendar)
  }, [valueCalendar])

  /**
   * function to control the visibility of the dropdown list when it is deployed and when
   * the user decides to close it by touching anywhere outside the component
   */

  const clickRefCalendarDropDown = useRef<HTMLDivElement>(null)
  const clickRefCalendarIconDropDown = useRef<HTMLButtonElement>(null)

  const forceValidationsFunction = (value: string) => {
    if (required === true && value === "") {
      setError(true)
      setErrorMessage(response.isRequired)
      setIsHover(false)
      setIsPlaceholder(false)
    } else if (required === true && !value.match(dateRegEx)) {
      setOpenCalendar(false)
      setError(true)
      setErrorMessage(response.hasRegExDate)
      setIsHover(false)
      setIsPlaceholder(false)
    } else if (!required && value !== "" && !dateRegEx.test(value)) {
      setOpenCalendar(false)
      setError(true)
      setErrorMessage(response.hasRegExDate)
      setIsHover(false)
      setIsPlaceholder(false)
    } else {
      setError(false)
      setIsHover(false)
      setIsPlaceholder(false)
      setIsFocus(false)
    }
  }

  useEffect(() => {
    if (forceValidations) {
      forceValidationsFunction(selectedDate)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forceValidations])

  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      if (
        openCalendar &&
        clickRefCalendarDropDown.current &&
        clickRefCalendarIconDropDown.current &&
        !clickRefCalendarDropDown.current.contains(e.target) &&
        !clickRefCalendarIconDropDown.current.contains(e.target) &&
        !reference.current.contains(e.target)
      ) {
        setOpenCalendar(false)
      } else if (
        openMonthYear &&
        clickRefCalendarDropDown.current &&
        clickRefCalendarIconDropDown.current &&
        !clickRefCalendarDropDown.current.contains(e.target) &&
        !clickRefCalendarIconDropDown.current.contains(e.target)
      ) {
        setOpenMonthYear(false)
        setOpenCalendar(false)
        setIsHover(false)
        setIsFocus(false)
        setIsPlaceholder(false)
      }
    }
    document.addEventListener("mousedown", checkIfClickedOutside)
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside)
    }
  }, [openCalendar, openMonthYear, reference])

  /**
   * frontend validations to indicate required field and date format
   */

  const checkInputs = e => {
    const { value } = e.currentTarget
    const arrayDate = value.split("/")
    const yyyy = arrayDate[2]
    const mm = arrayDate[1]
    const dd = arrayDate[0]
    const newParkedDate = new Date(`${yyyy}/${mm}/${dd}`)

    if (required === true && e.currentTarget.value === "") {
      setError(true)
      setErrorMessage(response.isRequired)
      setIsHover(false)
      setIsPlaceholder(false)
    } else if (required === true && !e.currentTarget.value.match(dateRegEx)) {
      setOpenCalendar(false)
      setError(true)
      setErrorMessage(response.hasRegExDate)
      setIsHover(false)
      setIsPlaceholder(false)
    } else if (
      !required &&
      e.currentTarget.value !== "" &&
      !e.currentTarget.value.match(dateRegEx)
    ) {
      setOpenCalendar(false)
      setError(true)
      setErrorMessage(response.hasRegExDate)
      setIsHover(false)
      setIsPlaceholder(false)
    } else if (newParkedDate.getTime() > todayMaxDate.getTime()) {
      setOpenCalendar(false)
      setError(true)
      setErrorMessage(response.maxLimit)
      setIsHover(false)
      setIsPlaceholder(false)
    } else if (newParkedDate.getTime() < todayMinDate.getTime()) {
      setOpenCalendar(false)
      setError(true)
      setErrorMessage(response.minLimit)
      setIsHover(false)
      setIsPlaceholder(false)
    } else {
      setError(false)
      setIsHover(false)
      setIsPlaceholder(false)
      setIsFocus(false)
    }
  }

  const handleOnBlur = e => {
    if (!openCalendar) {
      checkInputs(e)
    }
  }

  // function to change the states of the placeholder and hover in the on focus event

  const handleHoverAndPlaceholder = e => {
    if (e.type === "focus") {
      setIsHover(true)
      setIsPlaceholder(true)
      setIsFocus(true)
    } else {
      setIsHover(false)
      setIsPlaceholder(false)
      setIsFocus(false)
    }
  }

  const handleKeyDown = e => {
    if (e.key === "Enter") {
      e.preventDefault()
      checkInputs(e)
      setIsHover(false)
      setIsPlaceholder(false)
    } else {
      setIsHover(false)
      setIsPlaceholder(false)
    }
  }

  return (
    <FieldContainer width={width}>
      <Label error={error} backError={backError}>
        {required ? `${label}*` : label}
      </Label>
      <InputCalendarFieldContainer
        error={error}
        backError={backError}
        width={width}
        height={height}
        ref={clickRefCalendarDropDown}
      >
        <InputContainer
          data-error={error}
          backError={backError}
          success={success}
          error={error}
          value={selectedDate || ""}
          placeholder={isPlaceholder ? placeholder : ""}
          ref={reference}
          disabled={disabled}
          disabledAutocompleted={disabledAutocompleted}
          required={required}
          width={width}
          height={height}
          onBlur={handleOnBlur}
          onChange={handleChangeDate}
          onClick={toggleCalendar}
          onKeyDown={handleKeyDown}
          onFocus={handleHoverAndPlaceholder}
          isFocus={isFocus}
        />
        <IconContainer
          onClick={toggleCalendar}
          onFocus={handleHoverAndPlaceholder}
          onBlur={handleOnBlur}
          ref={clickRefCalendarIconDropDown}
          value={selectedDate || ""}
          disabled={disabled}
        >
          <Icon
            icon="IconCalendar"
            color={isHover ? `${theme.colors.primary}` : `${theme.colors.grey}`}
          />
        </IconContainer>
      </InputCalendarFieldContainer>
      {openCalendar && (
        <CalendarDropDownContainer ref={clickRefCalendarDropDown}>
          <CalendarDropDownContainerList position={position}>
            <CalendarContainer>
              <CalendarHeader>
                <CalendarButton
                  rotate="true"
                  onClick={(e: any) => {
                    e.preventDefault()
                    setDate(new Date(yearGo, month - 1, day))
                  }}
                >
                  <Icon
                    icon="IconSingleArrow"
                    color={`${theme.colors.primary}`}
                  />
                </CalendarButton>
                <CalendarHeaderTitle onClick={toggleMonthYear}>
                  {`${monthOfYear[month].display_name} ${yearGo}`}
                </CalendarHeaderTitle>
                <CalendarButton
                  onClick={(e: any) => {
                    e.preventDefault()
                    setDate(new Date(yearGo, month + 1, day))
                  }}
                >
                  <Icon
                    icon="IconSingleArrow"
                    color={`${theme.colors.primary}`}
                  />
                </CalendarButton>
              </CalendarHeader>
              <CalendarBody>
                <CalendarDayWeekContainer>
                  {daysOfWeek.map(d => (
                    <CalendarDayWeek key={d.id}>
                      {d.display_name}
                    </CalendarDayWeek>
                  ))}
                </CalendarDayWeekContainer>
                {Array(days[month] + (startDay - 1))
                  .fill(null)
                  .map((_, index) => {
                    const d = index - (startDay - 2)
                    return (
                      // eslint-disable-next-line react/no-array-index-key
                      <CalendarDateNumberWeekContainer key={index}>
                        <CalendarDateNumberWeek
                          // eslint-disable-next-line react/no-array-index-key
                          key={index}
                          isSelected={
                            d > 0 &&
                            selectedDate ===
                              new Date(yearGo, month, d).toLocaleDateString(
                                `${region}`,
                                {
                                  year: "numeric",
                                  month: "2-digit",
                                  day: "2-digit",
                                },
                              )
                          }
                        >
                          <CalendarDateNumberWeekContent
                            isToday={
                              d === today.getDate() &&
                              month === today.getMonth() &&
                              yearGo === today.getFullYear()
                            }
                            isSelected={
                              d > 0 &&
                              selectedDate ===
                                new Date(yearGo, month, d).toLocaleDateString(
                                  `${region}`,
                                  {
                                    year: "numeric",
                                    month: "2-digit",
                                    day: "2-digit",
                                  },
                                )
                            }
                            isOff={d <= 0}
                            isMaxDate={
                              maxDate !== null &&
                              new Date(yearGo, month, d) > todayMaxDate
                            }
                            isMinDate={
                              minDate !== null &&
                              new Date(yearGo, month, d) < todayMinDate
                            }
                            onClick={
                              (d > 0 && !minDate && !maxDate) ||
                              (d > 0 &&
                                maxDate !== null &&
                                new Date(yearGo, month, d) <= todayMaxDate &&
                                !minDate) ||
                              (d > 0 &&
                                minDate !== null &&
                                new Date(yearGo, month, d) >= todayMinDate &&
                                !maxDate) ||
                              (d > 0 &&
                                maxDate !== null &&
                                new Date(yearGo, month, d) <= todayMaxDate &&
                                minDate !== null &&
                                new Date(yearGo, month, d) >= todayMinDate)
                                ? () =>
                                    onDateClicked(
                                      d > 0 &&
                                        new Date(
                                          yearGo,
                                          month,
                                          d,
                                        ).toLocaleDateString(`${region}`, {
                                          year: "numeric",
                                          month: "2-digit",
                                          day: "2-digit",
                                        }),
                                    )
                                : () => !onDateClicked
                            }
                          >
                            {(d > 0 ? d : "") && (d < 10 ? `0${d}` : d)}
                          </CalendarDateNumberWeekContent>
                        </CalendarDateNumberWeek>
                      </CalendarDateNumberWeekContainer>
                    )
                  })}
              </CalendarBody>
            </CalendarContainer>
          </CalendarDropDownContainerList>
        </CalendarDropDownContainer>
      )}
      {openMonthYear && (
        <div ref={clickRefCalendarDropDown}>
          <CalendarMonthOfYear
            actionClick={onMonthClicked}
            yearMonthFatherParam={yearGo}
            monthFatherParam={month}
            abbreviatedMonth={abbreviatedMonth}
            position={position}
            maxCalendarMonthOfYearDate={maxCalendarDate}
            minCalendarMonthOfYearDate={minCalendarDate}
          />
        </div>
      )}
      <ErrorMessageContainer width={width}>
        {!backError && error && <ErrorMessage message={errorMessage} />}
        {backError && !error && <ErrorMessage message={backErrorMessage} />}
      </ErrorMessageContainer>
    </FieldContainer>
  )
}

export default InputCalendar
