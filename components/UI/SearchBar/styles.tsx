import styled, { css } from "styled-components"
import theme from "theme/index"

export const SearchStyled = styled.div<{ width?: number }>`
  background-color: ${theme.colors.white};
  position: relative;
  ${({ width }) =>
    width
      ? css`
          width: ${width}px;
        `
      : css`
          width: 100%;
        `}
  height: 36px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &:hover {
    background-color: ${theme.colors.grey_lighter};
  }
`

export const IconAbsolute = styled.div<{ isClickable: boolean }>`
  position: absolute;
  right: 11px;
  width: fit-content;
  height: 20.6px;
  ${({ isClickable }) =>
    isClickable &&
    css`
      cursor: pointer;
    `}
`

export const InputStyled = styled.input`
  padding-left: 10px;
  height: 100%;
  width: 100%;
  outline: none;
  border: none;
  font-size: ${theme.fontSizes.s};
  border: 1px solid ${theme.colors.focus};
  border-radius: 5px;
  background-color: default;
  position: relative;
  padding-right: 35px;
  &:hover {
    background-color: ${theme.colors.grey_lighter};
  }
  &:focus {
    border: 2px solid ${theme.colors.focus};
  }
`
