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

const DeleteRecord = styled.button`
  position: absolute;
  right: 0;
  top: -60px;
  background: none;
  border: none;
  cursor: pointer;
`

const ListOfLessons = styled.div`
  margin-top: -15px;

  .title {
    margin: 0;
    padding-bottom: 10px;
    text-decoration: underline;
  }

  div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
`

const Lesson = styled.button<{ selected: boolean }>`
  font-family: ${theme.fonts.primary};
  font-weight: ${theme.fontWeights.light};
  font-size: 16px;
  cursor: pointer;
  border: none;
  background-color: transparent;
  ${props =>
    props.selected &&
    css`
      font-weight: ${theme.fontWeights.medium};
    `};
`

const Total = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${theme.colors.grey_lighter};
  padding: 15px 15px;
  border-radius: 5px;
  margin-top: -10px;

  p {
    margin: 0;
  }
`

export { Form, DeleteRecord, ListOfLessons, Lesson, Total }
