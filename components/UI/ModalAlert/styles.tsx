import styled, { css } from "styled-components"
import theme from "theme/index"

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(36, 38, 42, 0.9);
  z-index: 100;
`

export const Modal = styled.div`
  position: fixed;
  top: 14%;
  left: 50%;
  transform: translate(-50%, -14%);
  z-index: 100;
`

// Eventually replace it with a generic component
export const ModalCard = styled.div`
  background: ${theme.colors.white};
  border-radius: 10px;
  padding: 16px;
  box-shadow: 0px 3px 6px #00000029; /* Not includded in the "Theme" */
`

export const CardContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 328px;
`

export const Close = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #c8c8c8; /* Not includded in the "Theme" */
  cursor: pointer;
`

export const AlertContainer = styled.div<{ status: string }>`
  margin-top: 24px;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  ${({ status }) =>
    status === "success" &&
    css`
      background: ${theme.colors.success_light};
    `}
  ${({ status }) =>
    status === "alert" &&
    css`
      background: ${theme.colors.danger_light};
    `}
  ${({ status }) =>
    status === "notice" &&
    css`
      /* tbd with UX/UI */
      background: rgba(0, 51, 161, 0.21);
    `}
  display: flex;
  justify-content: center;
  align-items: center;
`

export const AlertIcon = styled.div<{ status: string }>`
  width: 74px;
  height: 74px;
  border-radius: 50%;
  ${({ status }) =>
    status === "success" &&
    css`
      background: ${theme.colors.success};
    `}
  ${({ status }) =>
    status === "alert" &&
    css`
      background: ${theme.colors.danger};
    `}
  ${({ status }) =>
    status === "notice" &&
    css`
      background: ${theme.colors.primary};
    `}
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${theme.colors.white};
`

export const ContentWrapper = styled.div<{ status: string }>`
  margin: 35px 0 8px;
  text-align: center;
  width: 312px;
  div {
    margin-top: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: ${theme.fonts.primary};
    font-size: ${theme.fontSizes.xs};
    font-weight: ${theme.fontWeights.regular};
    color: ${theme.colors.grey};
  }
  h3,
  p {
    margin: 0 auto;
    height: auto;
  }
  h3 {
    font-family: ${theme.fonts.primary};
    font-size: ${theme.fontSizes.m};
    line-height: 20px;
    font-weight: ${theme.fontWeights.semiBold};
    color: ${({ status }) =>
      status === "success" ? theme.colors.success : theme.colors.black};
  }
`

export const ButtonsWrapper = styled.div<{ singleAction }>`
  margin: 34px 0 8px;
  display: flex;
  ${({ singleAction }) =>
    singleAction
      ? css`
          justify-content: center;
        `
      : css`
          justify-content: space-between;
        `}
  align-items: center;
  width: 312px;
`
