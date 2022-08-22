import styled, { css } from "styled-components"
import theme from "theme/index"

export const FieldContainer = styled.div<{ width?: number; height?: number }>`
  display: flex;
  flex-direction: column;
  font-family: ${theme.fonts.primary};
  min-height: 78px;
  width: fit-content;
  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`

export const TextFieldContainer = styled.div<{
  error?: boolean
  width?: number
  height?: number
  backError?: boolean
  success?: boolean
  disabledAutocompleted?: boolean
  inputOnFocus?: boolean
}>`
  width: ${({ width }) => width - 2 || 310}px !important;
  height: ${({ height }) => height || 38}px;
  border-radius: 5px;
  background-color: ${theme.colors.white};
  border: 1px solid ${theme.colors.focus};
  &:hover {
    background-color: ${theme.colors.grey_lighter};
  }
  display: flex;
  align-items: center;
  ${props =>
    props.inputOnFocus &&
    css<{ width?: number; height?: number }>`
      border: 2px solid ${theme.colors.focus} !important;
      width: ${({ width }) => width - 4 || 308}px !important;
      height: ${({ height }) => height - 2 || 36}px !important;
    `}
  ${props =>
    props.error &&
    css<{ width?: number; height?: number }>`
      border: 2px solid ${theme.colors.danger} !important;
      width: ${({ width }) => width - 4 || 308}px !important;
      height: ${({ height }) => height - 2 || 36}px;
    `}
  ${props =>
    props.backError &&
    css<{ width?: number; height?: number }>`
      border: 2px solid ${theme.colors.danger} !important;
      width: ${({ width }) => width - 4 || 308}px !important;
      height: ${({ height }) => height - 2 || 36}px;
    `}
  ${props =>
    props.success &&
    css`
      border: 1px solid ${theme.colors.success} !important;
      &:hover {
        background-color: ${theme.colors.white};
      }
    `}
  ${props =>
    props.disabledAutocompleted &&
    css`
      border: 1px dashed ${theme.colors.grey} !important;
      /* opacity: 0.3 !important; */
    `}
`

export const Label = styled.label<{
  error?: boolean
  backError?: boolean
  disabledAutocompleted?: boolean
}>`
  font-weight: ${theme.fontWeights.regular};
  font-size: ${theme.fontSizes.xs};
  margin-left: 3px;
  margin-bottom: 2px;
  color: ${theme.colors.grey};
  ${props =>
    props.error &&
    css`
      color: ${theme.colors.danger};
    `}
  ${props =>
    props.backError &&
    css`
      color: ${theme.colors.danger};
    `}
  ${props =>
    props.disabledAutocompleted &&
    css`
      opacity: 0.3 !important;
    `}
`

export const InputContainer = styled.input<{
  width?: number
  error?: boolean
  noErrorMessage?: boolean
  backError?: boolean
  type?: "text" | "password" | "email" | "number" | "textarea"
  pass?: "pass"
}>`
  color: ${theme.colors.grey};
  font-weight: ${theme.fontWeights.semiBold};
  font-size: ${theme.fontSizes.s};
  font-family: ${theme.fonts.primary};
  outline: none;
  border: none;
  background: none;
  margin-left: 13px;
  width: ${({ width }) => width - 25 || 310}px !important;
  height: ${({ height }) => height || 38}px !important;
  margin-right: 13px;
  ${props =>
    props.pass === "pass" &&
    css<{ width?: number }>`
      width: ${({ width }) => width - 60 || 250}px !important;
    `}

  ::placeholder {
    color: #c8c8c8;
    font-size: ${theme.fontSizes.s};
    font-weight: ${theme.fontWeights.medium};
  }
`

export const InputPassword = styled.div<{
  width?: number
  height?: number
  error?: boolean
  backError?: boolean
  success?: boolean
  disabledAutocompleted?: boolean
  inputOnFocus?: boolean
}>`
  display: flex;
  align-items: center;
  position: relative;
  width: ${({ width }) => width || 310}px !important;
  height: ${({ height }) => height || 38}px;
  border-radius: 5px;
  border: 1px solid ${theme.colors.focus};
  &:hover {
    background-color: ${theme.colors.grey_lighter};
  }
  display: flex;
  align-items: center;
  ${props =>
    props.inputOnFocus &&
    css<{ width?: number; height?: number }>`
      border: 2px solid ${theme.colors.focus} !important;
      width: ${({ width }) => width - 4 || 308}px !important;
      height: ${({ height }) => height - 2 || 36}px !important;
    `}
  ${props =>
    props.error &&
    css<{ width?: number; height?: number }>`
      border: 2px solid ${theme.colors.danger} !important;
      width: ${({ width }) => width - 4 || 308}px !important;
      height: ${({ height }) => height - 2 || 36}px;
    `}
  ${props =>
    props.backError &&
    css<{ width?: number; height?: number }>`
      border: 2px solid ${theme.colors.danger} !important;
      width: ${({ width }) => width - 4 || 308}px !important;
      height: ${({ height }) => height - 2 || 36}px;
    `}
  ${props =>
    props.success &&
    css`
      border: 1px solid ${theme.colors.success} !important;
      &:hover {
        background-color: ${theme.colors.white};
      }
    `}
  ${props =>
    props.disabledAutocompleted &&
    css`
      border: 1px dashed ${theme.colors.grey} !important;
      opacity: 0.3 !important;
    `}
`

export const IconContainer = styled.button`
  border: none;
  display: flex;
  justify-content: center;
  background: none;
  align-items: center;
  position: absolute;
  right: 2px;
  outline: none;
`
export const ErrorMessageContainer = styled.div<{ width?: number }>`
  display: flex;
  align-items: center;
  margin-top: 3px;
  min-height: 18px;
  width: ${({ width }) => width || 310}px !important;
`

export const InputContainerTextarea = styled.textarea<{
  width?: number
  height?: number
  type?: "textarea"
  error?: boolean
  pattern?: string
  noErrorMessage?: boolean
  backError?: boolean
}>`
  color: ${theme.colors.grey};
  font-weight: ${theme.fontWeights.semiBold};
  font-size: ${theme.fontSizes.s};
  font-family: ${theme.fonts.primary};
  resize: none;
  margin-left: 10px;
  border-radius: 5px;
  border: none;
  background: transparent;
  outline: none;
  padding-right: 10px;
  height: ${({ height }) => height - 20 || 70}px;
  width: ${({ width }) => width || 310}px !important;
  list-style-type: none;
  margin: 1;
  width: auto;
  overflow-y: scroll;
  ::placeholder {
    color: #c8c8c8;
    font-size: ${theme.fontSizes.s};
    font-weight: ${theme.fontWeights.medium};
  }
  ::-webkit-scrollbar {
    width: 6px;
    background-color: ${theme.colors.grey_lighter};
    border-radius: 7px;
  }
  ::-webkit-scrollbar-thumb {
    height: 5px;
    background-clip: padding-box;
    background-color: ${theme.colors.grey};
    border-radius: 7px;
    -webkit-border-radius: 7px;
  }
  ::-webkit-scrollbar-button {
    display: none;
    width: 0;
    height: 0;
  }
  ::-webkit-scrollbar-corner {
    background-color: transparent;
  }
`

export const TextAreaContainer = styled.div<{
  width?: number
  height?: number
  error?: boolean
  backError?: boolean
  success?: boolean
  disabledAutocompleted?: boolean
  inputOnFocus?: boolean
}>`
  width: ${({ width }) => width || 310}px !important;
  height: ${({ height }) => height || 100}px;
  border-radius: 5px;
  border: 1px solid ${theme.colors.focus};
  &:hover {
    background-color: ${theme.colors.grey_lighter};
  }
  display: flex;
  align-items: center;
  ${props =>
    props.inputOnFocus &&
    css<{ width?: number; height?: number }>`
      border: 2px solid ${theme.colors.focus} !important;
      width: ${({ width }) => width - 4 || 308}px !important;
      height: ${({ height }) => height - 2 || 98}px !important;
    `}
  ${props =>
    props.error &&
    css<{ width?: number; height?: number }>`
      border: 2px solid ${theme.colors.danger} !important;
      width: ${({ width }) => width - 4 || 308}px !important;
      height: ${({ height }) => height - 2 || 98}px;
    `}
  ${props =>
    props.backError &&
    css<{ width?: number; height?: number }>`
      border: 2px solid ${theme.colors.danger} !important;
      width: ${({ width }) => width - 4 || 308}px !important;
      height: ${({ height }) => height - 2 || 98}px;
    `}
  ${props =>
    props.success &&
    css`
      border: 1px solid ${theme.colors.success} !important;
      &:hover {
        background-color: ${theme.colors.white};
      }
    `}
  ${props =>
    props.disabledAutocompleted &&
    css`
      border: 1px dashed ${theme.colors.grey} !important;
      opacity: 0.3 !important;
    `}
`
