import styled, { css } from "styled-components"
import theme from "theme/index"

const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  position: absolute;
  /* bottom: 10px; */
  /* top: 93%; */
  right: 0;

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 45px;
    height: 45px;
    border-radius: 50%;
    border: none;
    box-shadow: 0px 4px 20px 4px rgba(83, 45, 117, 0.1);

    svg {
      width: 20px;
      height: 20px;
    }
  }
`

const Button = styled.button<{
  disabledButton: boolean
  color: "primary" | "secondary"
}>`
  cursor: pointer;

  ${props =>
    props.disabledButton &&
    css`
      opacity: 0.7;
      cursor: not-allowed;
    `};

  ${props =>
    props.color === "primary"
      ? css`
          background-color: ${theme.colors.secondary};
        `
      : css`
          background-color: ${theme.colors.primary};
        `};
`

export { ButtonContainer, Button }
