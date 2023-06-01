import styled, { css } from "styled-components"
import theme from "theme"

const Container = styled.div`
  width: 70vw;
  padding: 10px;
  margin: 15px auto;
  display: flex;
  align-items: flex-start;
  position: relative;

  background: #fffffe;
  box-shadow: 0px 8px 24px rgba(83, 45, 117, 0.1);
  border-radius: 10px;

  .title {
    margin: 0;
    padding-bottom: 10px;
    border-bottom: 0.5px solid rgba(83, 45, 117, 0.4);
    height: 40px;
    /* border: 1px solid red; */
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  font-family: ${theme.fonts.primary};
`

const ColumnContainer = styled.div`
  display: flex;
  width: 100%;
`

const Column = styled.div`
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  border-right: 0.5px solid rgba(83, 45, 117, 0.4);

  span {
    display: block;
    font-weight: 300;
    font-size: 14px;
    margin-top: 5px;
  }
`

const HourColumn = styled.div`
  display: flex;
  flex-direction: column;
  border-right: 0.5px solid rgba(83, 45, 117, 0.4);

  /* border: 0.5px solid green; */
  text-align: center;
`

const ColumnItem = styled.div`
  padding: 10px;
  border-bottom: 0.5px solid rgba(83, 45, 117, 0.4);
  font-weight: ${theme.fontWeights.light};
  height: 20px;

  p {
    margin: 0;
  }
`

const Lesson = styled.button<{
  lessonType: "beginner" | "advanced" | "kids" | string
}>`
  border: none;
  outline: none;
  height: 100%;
  border-radius: 5px;
  font-family: ${theme.fonts.primary};
  font-weight: ${theme.fontWeights.light};
  width: 100%;

  b {
    font-weight: ${theme.fontWeights.medium};
  }

  ${({ lessonType }) =>
    lessonType === "beginner" &&
    css`
      background-color: #ffbb009b;
    `};

  ${({ lessonType }) =>
    lessonType === "advanced" &&
    css`
      background-color: #774e9a51;
    `};

  ${({ lessonType }) =>
    lessonType === "kids" &&
    css`
      background-color: #14b91959;
    `};
`

const Categories = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 5px 10px;
  border: 1px solid ${theme.colors.grey_light};
  border-radius: 5px;

  cursor: pointer;
`

const SwitchContainer = styled.div`
  position: absolute;
  gap: 20px;
  right: -130px;
  top: -50px;
  width: fit-content;
`

const SelectList = styled.div`
  display: flex;
  flex-direction: column;
  height: 200px;
  margin-top: 10px;
  padding: 10px;
  background-color: white;
  border-radius: 10px;
  overflow: auto;
  box-shadow: 0px 8px 24px rgba(83, 45, 117, 0.1);
`

const Select = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`

const ButtonContainer = styled.div`
  position: absolute;
  top: 0%;
  left: -130px;
`

const ChangeWeekContainer = styled.div`
  position: absolute;
  width: 110%;
  display: flex;
  right: -50px;
  top: 25%;
  justify-content: space-between;

  button {
    border: none;
    background-color: transparent;
    cursor: pointer;
  }
`

export {
  Container,
  Column,
  ColumnContainer,
  HourColumn,
  ColumnItem,
  Lesson,
  SwitchContainer,
  Select,
  ButtonContainer,
  ChangeWeekContainer,
  Categories,
  SelectList,
}
