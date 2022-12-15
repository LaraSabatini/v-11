import styled, { css } from "styled-components"
import theme from "theme/index"

const MainButton = styled.div`
  position: absolute;
  right: 0px;
  bottom: 0;

  @media (max-width: 440px) {
    top: 65px;
  }
`

const AddPartner = styled.button<{ disabled: boolean }>`
  border-radius: 50%;
  width: 50px;
  height: 50px;

  @media (max-width: 440px) {
    width: 35px;
    height: 35px;
  }

  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${theme.colors.primary};
  cursor: pointer;
  box-shadow: 0px 10px 16px 0px rgba(83, 45, 117, 0.14);
  -webkit-box-shadow: 0px 10px 16px 0px rgba(83, 45, 117, 0.14);
  -moz-box-shadow: 0px 10px 16px 0px rgba(83, 45, 117, 0.14);

  ${props =>
    props.disabled &&
    css`
      opacity: 0.4;
      cursor: not-allowed;
    `};
`
export { MainButton, AddPartner }
