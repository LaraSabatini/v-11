import styled, { css } from "styled-components"
import theme from "theme/index"

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const Content = styled.div`
  width: 90vw;
  margin: 0 auto;
  padding-top: 30px;
`

const Title = styled.h4`
  font-family: ${theme.fonts.primary};
  font-size: 25px;
  margin: 0;
  padding-top: 31px;
  span {
    font-weight: ${theme.fontWeights.regular};
    font-size: 20px;
  }
`

const HeadContent = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  width: 83%;
`

const SectionButtonsContainer = styled.div`
  display: flex;
  gap: 10px;
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

export {
  SectionButtonsContainer,
  Section,
  MainContainer,
  Content,
  Title,
  HeadContent,
}
