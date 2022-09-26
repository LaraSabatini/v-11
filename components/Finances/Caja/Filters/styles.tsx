import styled, { css } from "styled-components"
import theme from "theme/index"

const FiltersContainer = styled.div`
  /* border: 1px solid red; */
  position: relative;
`

const Filter = styled.div`
  border: none;
  font-family: ${theme.fonts.primary};
  color: ${theme.colors.black};
  background-color: ${theme.colors.white};
  font-size: 16px;
  padding: 10px 15px;
  border-radius: 5px;
  box-shadow: 0px 10px 16px 0px rgba(45, 54, 61, 0.14);
  -webkit-box-shadow: 0px 10px 16px 0px rgba(45, 54, 61, 0.14);
  -moz-box-shadow: 0px 10px 16px 0px rgba(45, 54, 61, 0.14);
  cursor: pointer;

  position: relative;

  p {
    margin: 0;
  }

  svg {
    transform: rotate(-0.25turn);
  }
`

const Options = styled.div`
  position: absolute;
  background: white;
  top: 115%;
  right: 0;
  width: 150px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  border-radius: 0 0 10px 10px;

  box-shadow: 0px 10px 16px 0px rgba(45, 54, 61, 0.14);
  -webkit-box-shadow: 0px 10px 16px 0px rgba(45, 54, 61, 0.14);
  -moz-box-shadow: 0px 10px 16px 0px rgba(45, 54, 61, 0.14);
`

const Option = styled.p<{ selected: boolean }>`
  font-weight: ${theme.fontWeights.light};

  &:hover {
    font-weight: ${theme.fontWeights.regular};
  }

  ${props =>
    props.selected &&
    css`
      font-weight: ${theme.fontWeights.regular};
    `};
`

const CalendarContainer = styled.div`
  position: absolute;
  right: -220px;
  top: -4px;
`

const Select = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

export { FiltersContainer, Filter, Options, Option, CalendarContainer, Select }
