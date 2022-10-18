import styled, { css } from "styled-components"
import theme from "theme/index"

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px 0 10px 20px;
  margin-top: 10px;
`

const ListItem = styled.div`
  box-shadow: 0px 4px 20px 4px rgba(83, 45, 117, 0.1);
  border-radius: 5px;
  background-color: ${theme.colors.white};
  padding: 15px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`

const IconContainer = styled.div<{ active: boolean }>`
  margin-right: 30px;
  transform: rotate(90deg);

  ${props =>
    props.active &&
    css`
      transform: rotate(360deg);
    `};
`

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;
  font-family: ${theme.fonts.primary};
`

const LeftContainer = styled.div`
  width: 50%;
  margin-top: 30px;
`
const RightContainer = styled.div`
  width: 450px;
  height: 400px;
  box-shadow: 0px 4px 20px 4px rgba(83, 45, 117, 0.1);
  padding: 15px;
  border-radius: 10px;

  .name {
    margin: 0;
  }
`

const SearchBarContainer = styled.div`
  margin-left: 20px;
`

const PaginatorContainer = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
`

const NoMore = styled.p`
  font-size: 20px;
  font-weight: bold;
  color: ${theme.colors.focus};
  text-align: center;
  margin-top: 25%;
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
`

const TableTitles = styled.div`
  display: flex;
  align-items: center;
  /* margin-left: 25px; */
  justify-content: space-between;
`

export {
  ListContainer,
  ListItem,
  IconContainer,
  Container,
  LeftContainer,
  RightContainer,
  SearchBarContainer,
  PaginatorContainer,
  NoMore,
  LessonsPurchased,
  TableTitle,
  TableTitles,
}
