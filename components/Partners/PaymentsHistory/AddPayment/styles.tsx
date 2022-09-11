import styled, { css } from "styled-components"
import theme from "theme/index"

const Form = styled.div`
  font-family: ${theme.fonts.primary};
`

const PartnerList = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 15px;
  gap: 2px;
  width: 292px;
`

const Partner = styled.p<{ selected: boolean }>`
  margin: 0;
  font-weight: ${theme.fontWeights.light};
  border: 1px solid transparent;
  padding: 5px;
  &:hover {
    font-weight: ${theme.fontWeights.regular};
    background-color: ${theme.colors.grey_lighter};
    border-radius: 5px;
  }
  cursor: pointer;

  ${props =>
    props.selected &&
    css`
      font-weight: ${theme.fontWeights.regular};
      background-color: ${theme.colors.grey_lighter};
      border-radius: 5px;
    `};
`

const HorizontalGroup = styled.div`
  display: flex;
  gap: 10px;
`

const CheckboxContainer = styled.div`
  font-family: ${theme.fonts.primary};
  display: flex;
  align-items: center;
  gap: 5px;

  p {
    margin: 0;
    font-size: 15px;
    font-weight: ${theme.fontWeights.light};
  }
`

const SubContainer = styled.div`
  display: flex;
  gap: 5px;
`

export {
  Form,
  PartnerList,
  Partner,
  HorizontalGroup,
  CheckboxContainer,
  SubContainer,
}
