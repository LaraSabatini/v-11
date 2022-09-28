import styled from "styled-components"
import theme from "theme/index"

const ReceiptContainer = styled.div`
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 300px;
  padding: 25px;
  box-shadow: -1px 7px 10px -2px rgba(45, 54, 61, 0.22);
  -webkit-box-shadow: -1px 7px 10px -2px rgba(45, 54, 61, 0.22);
  -moz-box-shadow: -1px 7px 10px -2px rgba(45, 54, 61, 0.22);
`

const Title = styled.h4`
  margin: 0;
  padding-bottom: 10px;
`

const Total = styled.p`
  margin: 0;
  font-weight: ${theme.fontWeights.semiBlack};
  display: flex;
  justify-content: space-between;

  span {
    font-weight: ${theme.fontWeights.regular};
  }
`

const Products = styled.div`
  height: 190px;
`

const Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  p {
    margin: 10px 0;
  }
`

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
`

const RadioContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
  span {
    font-weight: ${theme.fontWeights.light};
    font-size: 15px;
  }
`

const RadioButtonsContainer = styled.div`
  display: flex;
  gap: 20px;
`

const PaymentMethods = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 120px;
`

export {
  ReceiptContainer,
  Title,
  Total,
  Products,
  Item,
  ButtonContainer,
  RadioContainer,
  RadioButtonsContainer,
  PaymentMethods,
}
