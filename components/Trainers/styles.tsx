import styled, { css } from "styled-components"
import theme from "theme/index"

const Container = styled.div`
  width: 90%;
  margin: 0 auto;
  padding-top: 30px;
`

const Title = styled.h4`
  font-family: ${theme.fonts.primary};
  font-size: 25px;
  margin: 0;
  margin-top: 20px;
  display: flex;
  align-items: center;
  gap: 5px;
  justify-content: space-between;
  width: 98%;

  span {
    font-weight: ${theme.fontWeights.regular};
    font-size: 20px;
  }
`

const SectionsButtons = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
`

const Section = styled.button<{ selected: boolean }>`
  font-family: ${theme.fonts.primary};
  border: 1px solid ${theme.colors.grey_lighter};
  background: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;

  ${props =>
    props.selected &&
    css`
      font-weight: ${theme.fontWeights.semiBlack};
      border: 1px solid ${theme.colors.black};
    `};
`

const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 20px;
  margin-left: 10px;
  padding-bottom: 10px;
`

const ScheduleHelper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 10px;
  font-family: ${theme.fonts.primary};

  div {
    display: flex;
    gap: 15px;
    border: 2px solid ${theme.colors.primary};
    padding: 10px;
    border-radius: 10px;

    p {
      margin: 0;
    }
  }
`

const FiltersContainer = styled.div`
  display: flex;
  gap: 10px;
`

const FilterButton = styled.button<{ selected }>`
  background: none;
  border: none;
  outline: none;
  padding: 5px;
  font-family: ${theme.fonts.primary};
  font-weight: ${theme.fontWeights.light};
  cursor: pointer;

  ${props =>
    props.selected &&
    css`
      background-color: ${theme.colors.primary_light};
      border-radius: 5px;
      color: white;
    `};
`

export {
  Container,
  Title,
  SectionsButtons,
  Section,
  CardsContainer,
  ScheduleHelper,
  FiltersContainer,
  FilterButton,
}
