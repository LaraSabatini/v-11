import styled from "styled-components"
import theme from "theme/index"

const Details = styled.div``

const PartnerData = styled.div`
  padding-top: 0px;
  display: flex;
  gap: 15px;
`

const CheckboxContainer = styled.div`
  font-family: ${theme.fonts.primary};
  display: flex;
  align-items: center;
  gap: 5px;
  margin-top: -10px;

  p {
    margin: 0;
    font-size: 15px;
    font-weight: ${theme.fontWeights.light};
  }
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`

export { Details, PartnerData, CheckboxContainer, ButtonContainer }
