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
  border: 1px solid red;
`

export { Container, Title, SectionsButtons, Section, CardsContainer }
