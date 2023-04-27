import styled from "styled-components"
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

const PurchaseForm = styled.div``

export { PurchaseButton, PurchaseForm }
