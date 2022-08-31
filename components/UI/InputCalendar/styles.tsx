import styled, { css } from "styled-components"
import theme from "theme/index"
import {
  InputCalendarInterface,
  CalendarDateNumberWeekInterface,
} from "./index"
import { CalendarMonthInterface } from "./CalendarMonthOfYear"
import { CalendarYearInterface } from "./CalendarYear"

/**
 * styled components to index.tsx
 */

type InputStyles = Pick<
  InputCalendarInterface,
  | "error"
  | "success"
  | "width"
  | "height"
  | "isFocus"
  | "backError"
  | "disabledAutocompleted"
>
type Width = Pick<InputCalendarInterface, "width">

type LabelStyles = Pick<InputCalendarInterface, "error" | "backError">

type PositionStyles = Pick<InputCalendarInterface, "position">

type CalendarDateStyles = Pick<CalendarDateNumberWeekInterface, "isSelected">

type CalendarDateContentStyles = Pick<
  CalendarDateNumberWeekInterface,
  "isSelected" | "isToday" | "isOff" | "isMaxDate" | "isMinDate"
>

type CalendarMonthStyles = Pick<
  CalendarMonthInterface,
  "isSelected" | "isMaxDate" | "isMinDate"
>

type CalendarYearStyles = Pick<
  CalendarYearInterface,
  "isSelected" | "isMaxDate" | "isMinDate"
>

const FieldContainer = styled.div<Width>`
  display: flex;
  flex-direction: column;
  font-family: ${theme.fonts.primary};
  width: fit-content;
  height: 78px;
  position: relative;

  ${({ width }) =>
    width &&
    css`
      width: ${width}px;
    `}
`

const Label = styled.label<LabelStyles>`
  font-weight: ${theme.fontWeights.regular};
  font-size: ${theme.fontSizes.xs};
  margin-bottom: 2px;
  color: ${theme.colors.grey};
  ${props =>
    props.error &&
    css`
      color: ${theme.colors.danger};
    `}
  ${props =>
    props.backError &&
    css`
      color: ${theme.colors.danger};
    `}
`

const InputCalendarFieldContainer = styled.div<InputStyles>`
  background-color: ${theme.colors.white};
  box-sizing: border-box;
  display: flex;
  align-items: center;
  position: relative;
  margin-bottom: 2px;
  border-radius: 5px;
  width: ${({ width }) => width || "312"}px !important;
  height: ${({ height }) => height || "40"}px;
  min-width: 150px;
  max-width: 600px;
  min-height: 36px;
  max-height: 45px;
`

const InputContainer = styled.input<InputStyles>`
  background-color: ${theme.colors.white};
  box-sizing: border-box;
  color: ${theme.colors.grey};
  font-weight: ${theme.fontWeights.semiBold};
  font-size: 14px;
  font-family: ${theme.fonts.primary};
  width: ${({ width }) => width || "312"}px !important;
  height: ${({ height }) => height || "40"}px;
  padding-left: 13px;
  padding-top: 0px;
  padding-bottom: 0px;
  border-radius: 5px;
  border: 1px solid ${theme.colors.focus};
  background: none;
  outline: none;
  min-width: 150px;
  max-width: 600px;
  min-height: 36px;
  max-height: 45px;
  ${({ isFocus, height }) =>
    isFocus &&
    height &&
    css`
      border: 2px solid ${theme.colors.focus};
      height: ${height}px;
    `}
  ${({ isFocus, height }) =>
    isFocus &&
    !height &&
    css`
      border: 2px solid ${theme.colors.focus};
      height: 40px !important;
    `}
    ${({ isFocus }) =>
    !isFocus &&
    css`
      border: 1px solid ${theme.colors.focus};
    `}
  &:hover {
    background-color: ${theme.colors.grey_lighter};
  }
  &::placeholder {
    color: ${theme.colors.grey_light};
    font-weight: ${theme.fontWeights.medium};
  }
  ${({ error }) =>
    error &&
    css`
      border: 2px solid ${theme.colors.danger};
      &:focus {
        border: 2px solid ${theme.colors.danger};
      }
    `}

  ${({ backError }) =>
    backError &&
    css`
      border: 2px solid ${theme.colors.danger};
      &:focus {
        border: 2px solid ${theme.colors.danger};
      }
    `}

  ${props =>
    props.success &&
    css`
      border: 1px solid ${theme.colors.success} !important;
      &:hover {
        background-color: ${theme.colors.white};
      }
    `}

    ${props =>
    props.disabledAutocompleted &&
    css`
      border: 2px dashed ${theme.colors.focus} !important;
      &:hover {
        background-color: ${theme.colors.grey_lighter};
      }
    `}
`

const IconContainer = styled.button`
  border: none;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
  position: absolute;
  right: 13px;
  cursor: pointer;
  &:focus {
    outline-style: none;
  }
`
const ErrorMessageContainer = styled.div<InputStyles>`
  display: flex;
  align-items: center;
  margin-top: 3px;
  width: ${({ width }) => width + 5 || "312"}px !important;
  min-width: 150px;
`

/*
 * styled component for drop down list calendar
 */

const CalendarDropDownContainer = styled.div`
  position: relative;
`

const CalendarDropDownContainerList = styled.div<PositionStyles>`
  padding: 0;
  margin: 0;
  background: ${theme.colors.white};
  border-radius: 5px;
  box-sizing: border-box;
  box-shadow: 0px 3px 6px #00000029;
  color: ${theme.colors.grey};
  font-family: ${theme.fonts.primary};
  font-size: ${theme.fontSizes.m};
  font-weight: ${theme.fontWeights.regular};
  width: 108.4%;
  min-width: 338px;
  max-width: 542px;
  position: absolute;
  z-index: 2;
  ${({ position }) =>
    position === "bottom-right" &&
    css`
      right: 0;
    `};
  ${({ position }) =>
    position === "bottom-left" &&
    css`
      left: 0;
    `};
  ${({ position }) =>
    position === "top-left" &&
    css`
      margin-bottom: 4.3rem;
      left: 0;
      bottom: 0;
    `};
  ${({ position }) =>
    position === "top-right" &&
    css`
      margin-bottom: 4.3rem;
      bottom: 0;
      right: 0px;
    `};
`

/*
 * styled component to CalendarMonthOfYear.tsx and CalendarYear.tsx
 */

const CalendarContainer = styled.div`
  width: 100%;
`

const CalendarHeader = styled.div`
  background-color: ${theme.colors.grey_lighter};
  color: ${theme.colors.primary};
  border-radius: 5px 5px 0px 0px;
  font-family: ${theme.fonts.primary};
  font-size: 18px;
  font-weight: ${theme.fontWeights.semiBold};
  height: 45px;
  padding: 5px 5px 0px 5px;
  display: flex;
  justify-content: space-between;
`

const CalendarButton = styled.button<{ rotate? }>`
  cursor: pointer;
  width: 41px;
  height: 41px;
  border: none;
  border-radius: 50%;
  background-color: ${theme.colors.white};
  position: relative;
  &:focus {
    outline-style: none;
  }
  svg {
    transform: ${props => (props.rotate ? "rotate(90deg)" : "rotate(-90deg)")};
  }
`

const CalendarHeaderTitle = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 5px;
`

const CalendarBody = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`

const CalendarBodyYear = styled.div`
  width: 95%;
  padding: 10px;
`

const CalendarDayWeekContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 17px;
`

const CalendarDayWeek = styled.p`
  color: ${theme.colors.grey};
  font-family: ${theme.fonts.primary};
  font-size: 11px;
  font-weight: ${theme.fontWeights.regular};
  width: 14.2%;
  height: 17px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`

const CalendarDateNumberWeekContainer = styled.div`
  color: ${theme.colors.grey};
  font-family: ${theme.fonts.primary};
  font-size: 13px;
  font-weight: ${theme.fontWeights.semiBold};
  width: 14.2%;
  height: 50px;
  line-height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const CalendarDateNumberWeek = styled.div<CalendarDateStyles>`
  color: ${theme.colors.grey};
  font-family: ${theme.fonts.primary};
  font-size: 13px;
  font-weight: ${theme.fontWeights.semiBold};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  ${props =>
    props.isSelected &&
    css`
      background-color: ${theme.colors.grey_lighter};
      opacity: 1;
      transition: all 0.5s;
      height: 47px;
      width: 47px;
      line-height: 47px;
    `}
`

const CalendarDateNumberWeekContent = styled.p<CalendarDateContentStyles>`
  border-radius: 50%;
  color: ${theme.colors.grey};
  font-family: ${theme.fonts.primary};
  font-size: 13px;
  font-weight: ${theme.fontWeights.semiBold};
  width: 40px;
  height: 40px;
  line-height: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    background-color: ${theme.colors.grey_lighter};
    color: ${theme.colors.grey};
  }
  ${props =>
    props.isToday &&
    css`
      border: 1px solid ${theme.colors.focus};
    `}
  ${props =>
    props.isSelected &&
    css`
      background-color: ${theme.colors.focus};
      color: ${theme.colors.white};
      opacity: 1;
      transition: all 0.5s;
    `}
    ${props =>
    props.isOff &&
    css`
      cursor: default;
      &:hover {
        background-color: transparent;
      }
    `}
    ${props =>
    props.isMaxDate &&
    css`
      color: ${theme.colors.grey_light};
      cursor: default;
      &:hover {
        background-color: transparent;
        color: ${theme.colors.grey_light};
      }
    `}
    ${props =>
    props.isMinDate &&
    css`
      color: ${theme.colors.grey_light};
      cursor: default;
      &:hover {
        background-color: transparent;
        color: ${theme.colors.grey_light};
      }
    `}
`

const CalendarMonthYearContainer = styled.div`
  color: ${theme.colors.grey};
  font-family: ${theme.fonts.primary};
  font-size: 13px;
  font-weight: ${theme.fontWeights.semiBold};
  width: 33.33%;
  height: 63px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const CalendarMonthYear = styled.div<CalendarMonthStyles>`
  color: ${theme.colors.grey};
  font-family: ${theme.fonts.primary};
  font-size: 13px;
  font-weight: ${theme.fontWeights.semiBold};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  ${props =>
    props.isSelected &&
    css`
      background-color: ${theme.colors.grey_lighter};
      opacity: 1;
      transition: all 0.5s;
      height: 53px;
      width: 53px;
      line-height: 53px;
    `}
  ${props =>
    props.isMaxDate &&
    css`
      background-color: transparent;
      opacity: 1;
      transition: all 0.5s;
      height: 53px;
      width: 53px;
      line-height: 53px;
    `}
    ${props =>
    props.isMinDate &&
    css`
      background-color: transparent;
      opacity: 1;
      transition: all 0.5s;
      height: 53px;
      width: 53px;
      line-height: 53px;
    `}
`

const CalendarMonthYearContent = styled.p<CalendarMonthStyles>`
  border-radius: 50%;
  width: 43px;
  height: 43px;
  line-height: 43px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    background-color: ${theme.colors.grey_lighter};
    color: ${theme.colors.grey};
  }
  ${props =>
    props.isSelected &&
    css`
      background-color: ${theme.colors.focus};
      color: ${theme.colors.white};
      opacity: 1;
      transition: all 0.5s;
    `}
  ${props =>
    props.isMaxDate &&
    css`
      background-color: transparent;
      color: ${theme.colors.grey_light};
      opacity: 1;
      transition: all 0.5s;
      &:hover {
        background-color: transparent;
        color: ${theme.colors.grey_light};
        cursor: default;
      }
    `}
    ${props =>
    props.isMinDate &&
    css`
      background-color: transparent;
      color: ${theme.colors.grey_light};
      opacity: 1;
      transition: all 0.5s;
      &:hover {
        background-color: transparent;
        color: ${theme.colors.grey_light};
        cursor: default;
      }
    `}
`

const CalendarYear = styled.div<CalendarYearStyles>`
  border-radius: 5px;
  color: ${theme.colors.grey};
  font-family: ${theme.fonts.primary};
  font-size: 14px;
  font-weight: ${theme.fontWeights.semiBold};
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    background-color: ${theme.colors.grey_lighter};
    color: ${theme.colors.grey};
    opacity: 1;
    transition: all 0.5s;
  }
  ${props =>
    props.isSelected &&
    css`
      background-color: ${theme.colors.focus};
      color: ${theme.colors.white};
      opacity: 1;
      transition: all 0.5s;
      font-size: 18px;
    `}
  ${props =>
    props.isMaxDate &&
    css`
      background-color: transparent;
      color: ${theme.colors.grey_light};
      opacity: 1;
      transition: all 0.5s;
      font-size: 14px;
      cursor: default;
      &:hover {
        background-color: transparent;
        color: ${theme.colors.grey_light};
        opacity: 1;
        transition: all 0.5s;
        cursor: default;
      }
    `}
    ${props =>
    props.isMinDate &&
    css`
      background-color: transparent;
      color: ${theme.colors.grey_light};
      opacity: 1;
      transition: all 0.5s;
      font-size: 14px;
      cursor: default;
      &:hover {
        background-color: transparent;
        color: ${theme.colors.grey_light};
        opacity: 1;
        transition: all 0.5s;
        cursor: default;
      }
    `}
`

export {
  FieldContainer,
  Label,
  InputCalendarFieldContainer,
  InputContainer,
  IconContainer,
  ErrorMessageContainer,
  CalendarDropDownContainer,
  CalendarDropDownContainerList,
  CalendarContainer,
  CalendarHeader,
  CalendarButton,
  CalendarHeaderTitle,
  CalendarBody,
  CalendarBodyYear,
  CalendarDayWeekContainer,
  CalendarDayWeek,
  CalendarDateNumberWeekContainer,
  CalendarDateNumberWeek,
  CalendarDateNumberWeekContent,
  CalendarMonthYearContainer,
  CalendarMonthYear,
  CalendarMonthYearContent,
  CalendarYear,
}
