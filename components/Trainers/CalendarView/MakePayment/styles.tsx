import styled, { css } from "styled-components"
import theme from "theme/index"

const Form = styled.div`
  width: 310px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;

  font-family: ${theme.fonts.primary};

  .aclaration {
    font-weight: ${theme.fontWeights.light};
    font-size: 14px;
  }
`

const HorizontalGroup = styled.div`
  width: 310px;
  display: flex;
  gap: 10px;
`

const List = styled.div`
  p {
    margin: 0;
    padding-bottom: 10px;
  }

  .list {
    display: flex;
    flex-direction: column;
    gap: 3px;
  }
`

const ListItem = styled.button<{ selected?: boolean }>`
  font-weight: ${theme.fontWeights.light};
  border: none;
  background: none;
  font-family: ${theme.fonts.primary};
  text-align: left;
  font-size: 15px;
  cursor: pointer;

  &:hover {
    font-weight: ${theme.fontWeights.regular};
  }

  ${props =>
    props.selected &&
    css`
      font-weight: ${theme.fontWeights.regular};
    `};
`

const Total = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${theme.colors.grey_lighter};
  padding: 15px 15px;
  border-radius: 5px;

  p {
    margin: 0;
  }
`

const DeleteRecord = styled.button`
  position: absolute;
  right: 0;
  top: -60px;
  background: none;
  border: none;
  cursor: pointer;
`

export { Form, HorizontalGroup, List, Total, ListItem, DeleteRecord }
