import styled, { css } from "styled-components"
import theme from "theme/index"

const Form = styled.div`
  font-family: ${theme.fonts.primary};
  width: 400px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const CurrentDate = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;

  p {
    margin: 0;
    text-decoration: underline;
  }

  span {
    font-weight: ${theme.fontWeights.light};
  }
`

const FutureLessonsList = styled.div`
  gap: 15px;

  p {
    margin: 0;
    text-decoration: underline;
  }

  span {
    font-weight: ${theme.fontWeights.light};
  }

  div {
    display: flex;
    flex-direction: column;
    padding-top: 10px;
    padding-left: 15px;
    gap: 3px;
  }
`

const Warning = styled.p`
  margin: 0;
  font-weight: ${theme.fontWeights.bold};
  color: ${theme.colors.danger};
  font-size: 14px;
  margin-top: -10px;
`

const DateSelectedContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  justify-content: center;
  background-color: ${theme.colors.grey_lighter};
  width: 50%;
  border-radius: 5px;
  margin-top: -15px;
`

const UnselectButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
`

const AcceptButton = styled.button<{ disabled: boolean }>`
  border: none;
  background-color: ${theme.colors.success};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  margin-top: -7px;
  border-radius: 50%;
  cursor: pointer;
  opacity: 1;

  ${props =>
    props.disabled &&
    css`
      cursor: not-allowed;
      opacity: 0.3;
    `}
`

export {
  Form,
  CurrentDate,
  FutureLessonsList,
  Warning,
  DateSelectedContainer,
  UnselectButton,
  AcceptButton,
}
