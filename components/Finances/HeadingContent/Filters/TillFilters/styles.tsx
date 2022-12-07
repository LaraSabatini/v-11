import styled, { css } from "styled-components"
import theme from "theme/index"

const FiltersContainer = styled.div`
  position: relative;
  display: flex;
  gap: 15px;
  margin-top: 30px;
  justify-content: flex-end;
`

const Filter = styled.div`
  border: none;
  font-family: ${theme.fonts.primary};
  color: ${theme.colors.black};
  background-color: ${theme.colors.white};
  font-size: 16px;
  padding: 10px 15px;
  border-radius: 5px;
  height: 20px;
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
  background: white;
  width: 150px;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 110%;
  right: 0;
  gap: 10px;
  padding: 10px;
  border-radius: 0 0 10px 10px;
  z-index: 100;

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

const CalendarContainer = styled.div``

const Select = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

export { FiltersContainer, Filter, Options, Option, CalendarContainer, Select }
