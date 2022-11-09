import styled, { css } from "styled-components"
import theme from "theme/index"

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

export { SectionButtonsContainer, Section }
