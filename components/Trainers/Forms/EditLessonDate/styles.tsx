import styled from "styled-components"
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

const HorizontalGroup = styled.div`
  display: flex;
  justify-content: space-between;
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

export {
  Form,
  CurrentDate,
  HorizontalGroup,
  DateSelectedContainer,
  UnselectButton,
  FutureLessonsList,
}
