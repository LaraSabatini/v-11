import styled, { css } from "styled-components"
import theme from "theme/index"

const FiltersContainer = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`

const Filter = styled.button<{ selected: boolean }>`
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

  ${props =>
    props.selected &&
    css`
      background-color: ${theme.colors.black};
      color: ${theme.colors.white};
    `};
`
export { FiltersContainer, Filter }
