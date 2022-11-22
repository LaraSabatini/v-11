import styled from "styled-components"
import theme from "theme/index"

const Form = styled.div``

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

export { HorizontalGroup, SubContainer, CheckboxContainer, Form }
