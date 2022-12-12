import styled, { css } from "styled-components"
import theme from "theme/index"

const MainContainer = styled.div`
  background: #fffffe;
  box-shadow: 0px 8px 24px rgba(83, 45, 117, 0.1);
  border-radius: 10px;
  width: 940px;
  height: 427px;
  display: flex;
  div:last-child {
    border-right: none;
  }
  position: relative;
`

const SectionContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: fit-content;
  margin: 24px auto;
`

const ShiftColumn = styled.div`
  width: 104px;
  height: 95.5%;
  padding-top: 20px;
  border-right: 0.5px solid rgba(83, 45, 117, 0.4);
  font-size: 15px;
  display: flex;
  flex-direction: column;

  div:last-child {
    border-bottom: none;
  }
`

const Row = styled.div`
  height: 186px;
  border-bottom: 0.5px solid rgba(83, 45, 117, 0.4);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Title = styled.p`
  margin: 0;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3px;
  height: 16px;
  padding-bottom: 20px;
  border-bottom: 0.5px solid rgba(83, 45, 117, 0.4);
`

const DayColumn = styled.div`
  height: 95.5%;
  padding-top: 20px;
  border-right: 0.5px solid rgba(83, 45, 117, 0.4);
  width: 167px;

  div:last-child {
    border-bottom: none;
  }

  p {
    margin: 0;
  }

  .day,
  .month {
    font-weight: ${theme.fontWeights.light};
    font-size: 13px;
  }

  .number {
    font-size: 16px;
  }
`

const ArrowsContainer = styled.div`
  position: absolute;
  width: 110%;
  display: flex;
  justify-content: space-between;
  left: -48px;
  top: 50%;
`
const ButtonNavigate = styled.button`
  border: none;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-family: ${theme.fonts.primary};
`

const Student = styled.button<{ paid: boolean; selected?: boolean }>`
  font-family: ${theme.fonts.primary};
  border: 1px solid transparent;
  font-weight: ${theme.fontWeights.light};
  font-size: 15px;
  padding: 3px 7px;
  border-radius: 3px;
  text-align: left;

  ${props =>
    props.selected &&
    css`
      border: 1px solid ${theme.colors.primary};
    `};

  ${props =>
    props.paid
      ? css`
          background-color: rgba(72, 171, 162, 0.25); ;
        `
      : css`
          background-color: rgba(255, 99, 99, 0.25);
        `};
`

const StudentsContainer = styled.div`
  width: 130px;
  height: 170px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 5px 0 5px 5px;
`

export {
  MainContainer,
  SectionContainer,
  ShiftColumn,
  Title,
  DayColumn,
  Row,
  ArrowsContainer,
  ButtonNavigate,
  Student,
  StudentsContainer,
}
