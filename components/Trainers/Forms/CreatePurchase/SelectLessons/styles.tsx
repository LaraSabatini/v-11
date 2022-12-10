import styled, { css } from "styled-components"
import theme from "theme/index"

const Container = styled.div`
  display: flex;
`

const LessonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`

const LessonsSubGroup = styled.div`
  display: flex;
  gap: 15px;
  align-items: flex-start;
`

const AcceptButton = styled.button<{ disabled: boolean }>`
  border: none;
  background-color: ${theme.colors.success};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-top: 20px;
  cursor: pointer;
  opacity: 1;

  ${props =>
    props.disabled &&
    css`
      cursor: not-allowed;
      opacity: 0.3;
    `}
`

const DisablingDiv = styled.div`
  background-color: white;
  opacity: 0.3;
  position: absolute;
  z-index: 100;
  width: 350px;
  height: 57px;
  top: 75px;
`

const LessonsPurchasedList = styled.div`
  margin-left: 100px;
  background-color: #dbdbdb7d;
  width: 259px;
  height: 115px;
  border-radius: 5px;
  padding: 10px;
  .title {
    margin: 0;
    text-decoration: underline;
    font-size: 15px;
  }

  p {
    font-size: 15px;
    margin: 0;
  }

  .dates {
    margin-top: 12px;
    font-weight: ${theme.fontWeights.light};
    display: flex;
    flex-direction: column;
    gap: 8px;
    p {
      width: 80%;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    b {
      font-weight: ${theme.fontWeights.regular};
    }

    span {
      width: 100px;
    }

    button {
      border: none;
      background: transparent;
      cursor: pointer;
      width: 15px;
      height: 15px;
    }
  }
`

export {
  Container,
  LessonsContainer,
  LessonsSubGroup,
  DisablingDiv,
  LessonsPurchasedList,
  AcceptButton,
}
