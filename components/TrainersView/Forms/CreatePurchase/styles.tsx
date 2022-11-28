import styled, { css } from "styled-components"
import theme from "theme/index"

const Form = styled.div`
  width: 655px;
  font-family: ${theme.fonts.primary};
`

const HorizontalGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Results = styled.div`
  .title {
    text-decoration: underline;
    font-weight: ${theme.fontWeights.regular};
  }
`

const ListItem = styled.p<{ selected: boolean }>`
  font-weight: ${theme.fontWeights.light};
  margin: 0;
  padding: 4px 0;
  cursor: pointer;

  &:hover {
    font-weight: ${theme.fontWeights.regular};
  }

  ${props =>
    props.selected &&
    css`
      font-weight: ${theme.fontWeights.regular};
    `}
`

export { Form, HorizontalGroup, Results, ListItem }
