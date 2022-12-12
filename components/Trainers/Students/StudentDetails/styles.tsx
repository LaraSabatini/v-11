import styled, { css } from "styled-components"
import theme from "theme/index"

const Container = styled.div`
  padding: 15px;

  width: 374px;
  height: 332px;
  background: #fffffe;
  box-shadow: 0px 8px 24px rgba(83, 45, 117, 0.1);
  border-radius: 10px;
`

const CardTitle = styled.h3`
  margin: 0;
  font-weight: ${theme.fontWeights.regular};
  font-size: 16px;
  padding-top: 10px;
`

const LessonsPurchased = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 25px;
  padding: 10px;

  .row {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid ${theme.colors.focus};
    margin-bottom: 15px;
  }

  .sub-content {
    display: flex;
    align-items: center;
    gap: 15px;
    justify-content: space-between;

    p {
      margin: 0;
      width: 10px;
    }

    span {
      font-weight: ${theme.fontWeights.light};
    }
  }

  .column {
    display: flex;
    gap: 15px;
  }

  .content {
    display: flex;
    gap: 15px;
  }
`

const TableTitle = styled.p`
  margin: 0;
  text-decoration: underline;
  font-weight: ${theme.fontWeights.light};
`

const TableTitles = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const LessonListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const LessonGroup = styled.div`
  display: flex;
  width: 95%;
  flex-direction: column;
`

const Dropdown = styled.div<{ open: boolean }>`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  padding: 0 15px 0 10px;
  border-bottom: 0.5px solid rgba(83, 45, 117, 0.4);
  font-size: 15px;
  font-weight: ${theme.fontWeights.light};

  .title {
    display: flex;
    align-items: center;
    gap: 15px;
  }

  svg {
    transform: rotate(270deg);
  }

  ${props =>
    props.open &&
    css`
      svg {
        transform: rotate(90deg);
      }
    `};
`

const GroupInfo = styled.div`
  width: 100%;
  margin-top: 10px;
  background-color: white;
  border-radius: 0 0 10px 10px;
  padding: 0 15px 0 10px;
  border: 1px solid ${theme.colors.focus};
  box-shadow: 0px 4px 20px 4px rgba(83, 45, 117, 0.1);
`

const DateShown = styled.div<{ disabled: boolean }>`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 5px 0;

  ${props =>
    props.disabled &&
    css`
      opacity: 0.3;
    `};
`

export {
  Container,
  CardTitle,
  LessonsPurchased,
  TableTitle,
  TableTitles,
  LessonListContainer,
  LessonGroup,
  Dropdown,
  GroupInfo,
  DateShown,
}
