import styled, { css } from "styled-components"
import theme from "theme/index"

const Button = styled.button<{ disabledButton: boolean }>`
  background-color: ${theme.colors.primary};
  cursor: pointer;

  ${props =>
    props.disabledButton &&
    css`
      opacity: 0.7;
      cursor: not-allowed;
    `};
`

export default Button
