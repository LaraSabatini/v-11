import styled from "styled-components"
import theme from "theme/index"

const Form = styled.div`
  width: 655px;
  font-family: ${theme.fonts.primary};
`

const HorizontalGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export { Form, HorizontalGroup }
