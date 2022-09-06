/* eslint-disable no-nested-ternary */
import styled from "styled-components"
import theme from "theme/index"

const PaginationContainer = styled.div`
  display: flex;
  height: 20px;
  width: 87px;
`

const PagesContainer = styled.div`
  height: 20px;
  width: 34px;
  display: flex;
  align-content: center;
  justify-content: space-between;
  margin-right: 18px;
  user-select: none;
`
const ArrowsContainer = styled.div`
  display: flex;
  height: 20px;
  width: 34px;
  justify-content: space-between;
  align-items: center;
`
const ArrowItemContainer = styled.span`
  svg {
    path {
      fill: ${props => props.color};
    }
  }
  svg:hover {
    cursor: ${props => props.color !== "#C8C8C8" && "pointer"};
    path {
      fill: ${props => props.color !== "#C8C8C8" && theme.colors.secondary};
    }
  }
`

interface INumberPage {
  bold?: boolean
}

const NumberPage = styled.span<INumberPage>`
  font-size: ${theme.fontSizes.s};
  font-family: ${theme.fonts.primary};
  color: ${props => (props.bold ? theme.colors.black : theme.colors.grey)};
  font-weight: ${props =>
    props.bold ? theme.fontWeights.semiBold : theme.fontWeights.medium};
  :hover {
    cursor: ${props => props.onClick && "pointer"};
  }
`
export {
  PaginationContainer,
  PagesContainer,
  ArrowsContainer,
  NumberPage,
  ArrowItemContainer,
}
