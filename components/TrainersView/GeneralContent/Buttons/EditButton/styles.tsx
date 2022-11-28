import styled, { css } from "styled-components"
import theme from "theme/index"

const Button = styled.button<{ disabled: boolean }>`
  background-color: ${theme.colors.secondary};
  cursor: pointer;

  ${props =>
    props.disabled &&
    css`
      opacity: 0.7;
      cursor: not-allowed;
    `};
`

export default Button
