import styled, { css } from "styled-components"
import theme from "theme/index"

export const Container = styled.div`
  margin: 0px;
  padding: 0px;
  width: fit-content;
  position: relative;
  min-height: 74px;
`
export const Label = styled.p<{ error: boolean; backError: boolean }>`
  color: ${theme.colors.grey};
  font-family: ${theme.fonts.primary};
  font-size: ${theme.fontSizes.xs};
  font-weight: ${theme.fontWeights.regular};
  margin-top: 0;
  margin-bottom: 2.3px;
  ${({ error }) =>
    error
      ? css`
          color: ${theme.colors.danger} !important;
        `
      : css`
          color: ${theme.colors.grey};
        `}
  ${({ backError }) =>
    backError
      ? css`
          color: ${theme.colors.danger} !important;
        `
      : css`
          color: ${theme.colors.grey};
        `}
`

export const IconContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 100%;
  .iconControlling {
    position: absolute;
    opacity: 0;
    width: 100%;
    height: 100%;
  }
  & svg {
    position: absolute;
  }
`

export const InputContainer = styled.div<{
  error: boolean
  backError: boolean
  rotateIcon: boolean
  width?: number
  inputOnFocus: boolean
}>`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: relative;
  cursor: pointer;
  background-color: ${theme.colors.white};

  border: 1px solid ${theme.colors.focus};
  height: 38px;
  border-radius: 5px;
  ${({ width }) =>
    width
      ? css`
          width: ${width - 2}px;
        `
      : css`
          width: 310px;
        `}
  ${({ inputOnFocus }) =>
    inputOnFocus &&
    css`
      border: 2px solid ${theme.colors.focus} !important;
      height: 36px !important;
    `}
    ${({ inputOnFocus, width }) =>
    inputOnFocus &&
    width &&
    css`
      width: ${width - 4}px;
    `}
    ${({ inputOnFocus, width }) =>
    inputOnFocus &&
    !width &&
    css`
      width: 308px;
    `}
  //Styles Error
  ${({ error }) =>
    error
      ? css`
          border: 2px solid ${theme.colors.danger} !important;
          height: 36px !important;
        `
      : css`
          border: 1px solid ${theme.colors.focus};
        `}
        ${({ backError }) =>
    backError
      ? css`
          border: 2px solid ${theme.colors.danger} !important;
          height: 36px !important;
        `
      : css`
          border: 1px solid ${theme.colors.focus};
        `}
  &:hover,
  input:hover {
    background-color: ${theme.colors.grey_lighter};
    opacity: 1;
  }
  ${({ error, width }) =>
    error &&
    width &&
    css`
      width: ${width - 4}px;
    `}
  ${({ error, width }) =>
    error &&
    !width &&
    css`
      width: 308px;
    `}
    ${({ backError, width }) =>
    backError &&
    width &&
    css`
      width: ${width - 4}px;
    `}
  ${({ backError, width }) =>
    backError &&
    !width &&
    css`
      width: 308px;
    `}

  & svg {
    position: absolute;
    right: 12px;
    transform: ${props => props.rotateIcon && `rotate(180deg)`};
  }
`

export const Input = styled.input<{ width?: number }>`
  border: none;
  background-color: transparent;
  color: ${theme.colors.grey};
  font-family: ${theme.fonts.primary};
  font-weight: ${theme.fontWeights.semiBold};
  cursor: pointer;
  position: absolute;
  padding-right: 30px;
  ${({ width }) =>
    width
      ? css`
          width: ${width - 42}px;
        `
      : css`
          width: 270px;
        `}
  &:focus {
    outline: none;
  }
`
export const InputSelectDropdownOptions = styled.div<{
  width?: number
  position: string
}>`
  position: absolute;
  margin-top: 4px;
  background: ${theme.colors.white};
  border: 2px solid ${theme.colors.white};
  border-radius: 5px;
  box-sizing: border-box;
  z-index: 2;
  box-shadow: 0px 3px 6px #00000029;
  max-width: 900px;
  width: auto;
  height: fit-content;
  max-height: auto;
  padding: 10px 10px 10px 10px;
  ${({ width }) =>
    width
      ? css`
          min-width: ${width}px;
        `
      : css`
          min-width: 312px;
        `}
  ${({ position }) =>
    position === "bottom-right" &&
    css`
      right: 0;
    `};
  ${({ position }) =>
    position === "top-left" &&
    css`
      bottom: 0;
      margin-bottom: 80px;
      left: 0;
    `};
  ${({ position }) =>
    position === "top-right" &&
    css`
      bottom: 0;
      margin-bottom: 80px;
      right: 0;
    `};
`

export const DropdownOptionsList = styled.ul`
  margin: 0;
  padding: 0px 10px 0 0;
  color: ${theme.colors.grey};
  font-family: ${theme.fonts.primary};
  font-size: ${theme.fontSizes.m};
  font-weight: ${theme.fontWeights.regular};
  width: auto;
  max-height: 320px;
  overflow: auto;
  overflow-x: hidden;
  ::-webkit-scrollbar {
    width: 6px;
    background-color: ${theme.colors.grey_lighter};
    border-radius: 7px;
  }
  ::-webkit-scrollbar-thumb:vertical {
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

export const OptionListContent = styled.li`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: block;
  cursor: pointer;
  list-style: none;
  height: 40px;
  line-height: 40px;
  border-radius: 5px;
  padding: 0px 10px;
  font-size: ${theme.fontSizes.s};
  width: auto;
  &:hover {
    font-weight: ${theme.fontWeights.semiBold};
    background-color: ${theme.colors.grey_lighter};
  }
  &::before {
    display: block;
    content: attr(data-title);
    font-weight: ${theme.fontWeights.semiBold};
    height: 0;
    overflow: hidden;
    visibility: hidden;
  }
`

// Errors Styles
export const ErrorMessageContainer = styled.div<{ width?: number }>`
  display: flex;
  align-items: center;
  margin-top: 3px;
  min-height: 18px;
  width: ${({ width }) => width || 310}px !important;
`
