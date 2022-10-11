import styled, { css } from "styled-components"
import theme from "theme/index"

const MainContainer = styled.div`
  font-family: ${theme.fonts.primary};
  display: flex;
  justify-content: center;
  border: 1px solid ${theme.colors.focus};
  box-shadow: 0px 4px 20px 4px rgba(83, 45, 117, 0.1);
  width: 1085px;
  height: 400px;
  margin: 50px auto;
  border-radius: 10px;
  position: relative;

  .divider-1 {
    left: 181px;
  }

  .divider-2 {
    left: 361px;
  }

  .divider-3 {
    left: 541px;
  }

  .divider-4 {
    left: 721px;
  }

  .divider-5 {
    left: 901px;
  }

  .divider-1,
  .divider-2,
  .divider-3,
  .divider-4,
  .divider-5 {
    width: 1px;
    height: 100%;
    background-color: ${theme.colors.focus};
    position: absolute;
  }
`

const Column = styled.div`
  display: flex;
  flex-direction: column;
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

const ColumnTitle = styled.div`
  width: 180px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;

  p {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
  }

  span {
    font-weight: ${theme.fontWeights.light};
  }
`

const DividerRowTitles = styled.div`
  position: absolute;
  width: 100%;
  height: 1px;
  background-color: ${theme.colors.focus};
  top: 55px;
`

const DividerRowShifts = styled.div`
  position: absolute;
  width: 100%;
  height: 1px;
  background-color: ${theme.colors.focus};
  top: 226px;
`

const PaginatorContainer = styled.div``

const SectionContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: fit-content;
  margin: 0 auto;
  align-items: flex-end;
`

export {
  MainContainer,
  Column,
  LessonPurchased,
  StudentsList,
  ColumnTitle,
  DividerRowTitles,
  DividerRowShifts,
  PaginatorContainer,
  SectionContainer,
}
