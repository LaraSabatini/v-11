import styled, { css } from "styled-components"
import theme from "theme/index"

const StudentsList = styled.div`
  height: 190px;
  width: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;

  p {
    margin: 0;
  }
`

const Scroll = styled.div`
  padding-bottom: 10px;
  display: flex;
  width: 140px;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
`

const LessonPurchased = styled.button<{ paid: boolean; selected?: boolean }>`
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  border: 1px solid transparent;

  ${props =>
    props.selected &&
    css`
      border: 1px solid ${theme.colors.primary};
    `};

  ${props =>
    props.paid
      ? css`
          background-color: ${theme.colors.success_light};
        `
      : css`
          background-color: ${theme.colors.danger};
          color: white;
        `};
`

export { StudentsList, Scroll, LessonPurchased }
