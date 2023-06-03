import styled, { css } from "styled-components"
import theme from "theme"

const PurchaseButton = styled.button`
  border: none;
  background-color: ${theme.colors.primary};

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: pointer;
`

const PurchaseForm = styled.div`
  margin-top: -20px;
  width: 450px;

  .horizontal {
    display: flex;
    gap: 10px;
    align-items: center;
  }

  .add-date {
    background-color: ${theme.colors.primary_light};
    border: none;
    border-radius: 50%;
    width: 35px;
    height: 35px;
    display: flex;
    padding: 10px;
    align-items: center;
    justify-content: center;
    margin-top: -10px;
  }

  .display-vertical {
    display: flex;
    gap: 10px;
    padding-top: 15px;
  }

  .lesson-data {
    background-color: ${theme.colors.grey_lighter};
    padding: 5px;
    border-radius: 5px;
    width: 100%;
    height: 125px;

    p {
      margin: 0;
      font-family: ${theme.fonts.primary};
      font-weight: ${theme.fontWeights.light};
      font-size: 14px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      button {
        border: none;
        background-color: transparent;
        cursor: pointer;

        display: flex;
        align-items: center;
        justify-content: center;

        width: 21px;
        height: 21px;
      }
    }
  }
`

const Results = styled.div`
  margin-top: 20px;
  padding: 10px;
  width: 90%;
  background-color: ${theme.colors.grey_lighter};
  height: 100px;
  overflow: auto;
`

const Client = styled.p<{ selected?: boolean }>`
  margin: 0;
  font-family: ${theme.fonts.primary};
  font-weight: ${theme.fontWeights.light};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;

  ${props =>
    props.selected &&
    css`
      font-weight: ${theme.fontWeights.medium};
    `};

  b {
    font-weight: ${theme.fontWeights.medium};
  }

  button {
    border: none;
    background-color: transparent;
    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: center;

    width: 21px;
    height: 21px;
  }
`

const PaymentContainer = styled.div`
  .error {
    color: red;
    font-family: ${theme.fonts.primary};
    font-size: 14px;
  }

  .price {
    font-family: ${theme.fonts.primary};
  }
`

const ErrorMessage = styled.p`
  margin: 0;
  color: red;
  font-family: ${theme.fonts.primary};
  padding-left: 10px;
`

export {
  PurchaseButton,
  PurchaseForm,
  Results,
  Client,
  PaymentContainer,
  ErrorMessage,
}
