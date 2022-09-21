import styled, { css } from "styled-components"
import theme from "theme/index"

const Radio = styled.div<{ isChecked: boolean; isDisabled: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${theme.colors.grey};
  background-color: transparent;
  border-radius: 50%;
  width: 19px;
  height: 19px;
  cursor: pointer;
  ${({ isChecked }) =>
    isChecked &&
    css`
      border: 1px solid ${theme.colors.secondary} !important;
    `}
  ${({ isDisabled }) =>
    isDisabled &&
    css`
      border: 1px solid #c8c8c8 !important; /* Not in the theme */
    `}
  input[type="radio"]:after {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    margin-top: -1.5px;
    margin-left: -1.5px;
    position: relative;
    background-color: ${theme.colors.white};
    content: "";
    display: inline-block;
    visibility: visible;
    border: 1px solid ${theme.colors.white};
    cursor: pointer;
  }
  input[type="radio"]:checked::after {
    width: 13px;
    height: 13px;
    border-radius: 50%;
    margin: 0 !important;
    position: relative;
    background-color: ${theme.colors.secondary} !important;
    content: "";
    display: inline-block;
    visibility: visible;
    border: none;
  }
  & > input[type="radio"] {
    margin: auto !important;
  }
  input[type="radio"]:disabled:checked::after {
    background-color: #c8c8c8 !important; /* Not in the theme */
  }
`

export default Radio
