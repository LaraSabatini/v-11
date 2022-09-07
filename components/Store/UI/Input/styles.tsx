import styled from "styled-components"
import theme from "theme/index"

const InputStyled = styled.input<{ width?: number }>`
  padding: 10px 0 10px 13px;
  border: 1px solid ${theme.colors.focus};
  outline: none;
  border-radius: 5px;
  width: ${({ width }) => width - 2 || 50}px !important;
`

export default InputStyled
