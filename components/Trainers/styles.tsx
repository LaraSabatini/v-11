import styled, { css } from "styled-components"
import theme from "theme/index"

const Container = styled.div`
  width: 90%;
  margin: 0 auto;
  padding-top: 30px;
  position: relative;
  height: 83vh;
`

const Title = styled.h4`
  font-family: ${theme.fonts.primary};
  font-size: 25px;
  margin: 0;
  margin-top: 20px;
  display: flex;
  align-items: center;
  gap: 5px;
  justify-content: space-between;
  width: 98%;

  span {
    font-weight: ${theme.fontWeights.regular};
    font-size: 20px;
  }
`

const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  position: absolute;
  bottom: 0;
  right: 0;

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: none;
    box-shadow: 0px 4px 20px 4px rgba(83, 45, 117, 0.1);
  }
`

const PurchaseButton = styled.button`
  background-color: ${theme.colors.primary};
  cursor: pointer;
`

const EditButton = styled.button<{ disabled: boolean }>`
  background-color: ${theme.colors.secondary};
  cursor: pointer;

  ${props =>
    props.disabled &&
    css`
      opacity: 0.7;
      cursor: not-allowed;
    `};
`

export { Container, Title, PurchaseButton, ButtonContainer, EditButton }
