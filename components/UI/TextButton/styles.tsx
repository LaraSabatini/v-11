import styled, { css } from "styled-components"
import theme from "theme/index"
import { SButtonInterface } from "./index"

type StyledInt = Pick<
  SButtonInterface,
  | "cta"
  | "color"
  | "bgColor"
  | "borderColor"
  | "hoverColor"
  | "hoverBorderColor"
  | "hoverBgColor"
>

interface GlowInt extends StyledInt {
  glowWidth?: number
  glowHeight?: number
  disabled?: boolean
}

export const ButtonContainer = styled.div<StyledInt>`
  width: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`

export const ButtonGlow = styled.div<GlowInt>`
  background: ${theme.colors.secondary_light};
  width: ${({ glowWidth, cta, disabled }) => cta && !disabled && glowWidth}px;
  height: ${({ glowHeight, cta, disabled }) =>
    cta && !disabled && glowHeight}px;
  padding: 2px;
  border-radius: 6px;
  position: absolute;
  z-index: -1;
`

export const SButton = styled.button<StyledInt>`
  font: normal normal ${theme.fontWeights.medium} ${theme.fontSizes.s} /
    ${theme.fontSizes.m} ${theme.fonts.primary};
  border: 1px solid
    ${({ borderColor }) => borderColor || theme.colors.grey_light};
  color: ${({ color }) => color || theme.colors.grey};
  border-radius: 4px;
  padding: 10px 24px;
  background: ${({ bgColor }) => bgColor || theme.colors.white};
  background-clip: padding-box;
  cursor: pointer;
  outline: none;

  &:hover {
    border-color: ${({ hoverBorderColor, disabled }) =>
      hoverBorderColor && !disabled ? hoverBorderColor : theme.colors.primary};
    color: ${({ hoverColor, disabled }) =>
      hoverColor && !disabled ? hoverColor : theme.colors.primary};
    background: ${({ hoverBgColor, disabled }) =>
      hoverBgColor && !disabled ? hoverBgColor : theme.colors.grey_lighter};
    background-clip: padding-box;
  }

  ${({ cta, disabled }) =>
    cta &&
    !disabled &&
    css`
      background: ${theme.colors.secondary};
      border: 1px solid ${theme.colors.secondary};
      color: ${theme.colors.white};
      &:hover {
        color: ${theme.colors.white};
        border: 1px solid ${theme.colors.secondary};
        background: ${theme.colors.secondary};
      }
    `}

  ${({ disabled }) =>
    disabled &&
    css`
      /* Not in the theme */
      border: 1px solid #b1b7bb !important;
      background: ${theme.colors.neutral_light} !important;
      /* Not in the theme */
      color: #c8c8c8 !important;
      background-clip: padding-box;
      cursor: default;
    `}
`
