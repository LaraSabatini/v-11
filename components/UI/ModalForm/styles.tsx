import styled from "styled-components"
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
  padding: 19px 25px 24px 25px;
  box-shadow: 0px 3px 6px #00000029; /* Not includded in the "Theme" */
`

export const CardContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: fit-content;
`

export const Title = styled.h3`
  font-family: ${theme.fonts.primary};
  align-self: flex-start;
  font-weight: ${theme.fontWeights.semiBold};
  font-size: ${theme.fontSizes.m};
  margin: 0;
  padding-bottom: 12px;
`

export const Content = styled.h3`
  font-family: ${theme.fonts.primary};
  align-self: flex-start;
  font-weight: ${theme.fontWeights.semiBold};
  font-size: ${theme.fontSizes.l};
  margin: 0;
`
export const FormMessage = styled.span`
  font-family: ${theme.fonts.primary};
  align-self: flex-start;
  color: ${theme.colors.primary};
  font-weight: ${theme.fontWeights.semiBold};
  font-size: ${theme.fontSizes.xs};
  margin: 0;
  padding: 13px 0 15px 0;
`

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
`
