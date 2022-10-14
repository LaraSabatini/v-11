import styled, { css } from "styled-components"
import theme from "theme/index"

const FormContainer = styled.div`
  width: 655px;
  font-family: ${theme.fonts.primary};

  .subdiv {
    display: flex;
  }
`

const HorizontalGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  .search {
    margin-top: -5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 438px;
    position: relative;
  }
`

const SelectedClient = styled.div`
  height: 20px;
  padding: 9px 5px;
  width: 160px;
  border-radius: 5px;
  background-color: ${theme.colors.grey_lighter};
  align-items: center;
  justify-content: space-between;

  display: flex;
  p {
    font-weight: ${theme.fontWeights.light};
    font-size: 14px;
  }

  button {
    border: none;
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
`

const RegisterClientContainer = styled.div``

const PopOverContainer = styled.div`
  position: absolute;
  bottom: 0;
  right: 400px;
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

const LessonsPurchasedList = styled.div`
  margin-left: 50px;
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

const DisablingDiv = styled.div`
  background-color: white;
  opacity: 0.3;
  position: absolute;
  z-index: 100;
  width: 350px;
  height: 57px;
  top: 75px;
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

const PriceContainer = styled.div`
  background: ${theme.colors.grey_lighter};
  padding: 1%;
  width: 150px;
  border-radius: 5px;
  position: absolute;
  right: 0;
  bottom: 50px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  p {
    margin: 0;
  }
`

const Warning = styled.p`
  margin: 0;
  font-weight: ${theme.fontWeights.bold};
  color: ${theme.colors.danger};
  font-size: 14px;
  margin-top: -10px;
`

export {
  FormContainer,
  HorizontalGroup,
  RegisterClientContainer,
  SelectedClient,
  PopOverContainer,
  Results,
  ListItem,
  LessonsContainer,
  LessonsSubGroup,
  LessonsPurchasedList,
  DisablingDiv,
  AcceptButton,
  PriceContainer,
  Warning,
}
