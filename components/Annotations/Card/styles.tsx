import styled, { css } from "styled-components"
import theme from "theme/index"

const CardLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 450px;
  height: 520px;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0px 4px 20px 4px rgba(83, 45, 117, 0.1);
  position: relative;
`

const CardHeader = styled.div`
  height: 30px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`

const CardTitle = styled.h5`
  margin: 0;
  font-size: 18px;
`

const Filter = styled.button<{ selected?: boolean }>`
  border: 1px solid transparent;

  ${props =>
    props.selected &&
    css`
      font-weight: ${theme.fontWeights.semiBlack};
      border: 1px solid ${theme.colors.focus};
    `};

  font-family: ${theme.fonts.primary};
  font-size: 16px;
  background-color: white;
  padding: 5px 10px;
  border-radius: 3px;
  display: flex;
  gap: 5px;
  align-items: center;
`

const FilterContainer = styled.div`
  display: flex;
  gap: 10px;
`

const IconContainer = styled.div<{ rotate: "ASC" | "DESC" }>`
  ${props =>
    props.rotate === "ASC" &&
    css`
      transform: rotate(-0.5turn);
    `};
`

const CardContent = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`

const PaginationContainer = styled.div`
  margin-top: 10px;
`

export {
  CardLayout,
  CardTitle,
  CardHeader,
  Filter,
  FilterContainer,
  IconContainer,
  CardContent,
  PaginationContainer,
}
