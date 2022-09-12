import styled from "styled-components"
import theme from "theme/index"

const ProductCard = styled.div`
  font-family: ${theme.fonts.primary};
  width: 260px;
  padding: 15px;
  border-radius: 10px;
  display: flex;
  justify-content: space-around;
  box-shadow: 0px 3px 9px 0px rgba(45, 54, 61, 0.13);
  -webkit-box-shadow: 0px 3px 9px 0px rgba(45, 54, 61, 0.13);
  -moz-box-shadow: 0px 3px 9px 0px rgba(45, 54, 61, 0.13);

  img {
    width: 90px;
  }
`

const ProductName = styled.p``

const Description = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 150px;
  margin-left: 10px;
  width: 150px;
`

const ProductPrice = styled.p`
  font-size: 25px;
  margin: 0;
`

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${theme.colors.grey_lighter};
  height: 30px;
  margin-top: 25px;
  border-radius: 5px;
  padding: 5px;
  button {
    cursor: pointer;
    border: none;
    background: none;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

const Amount = styled.p`
  font-size: 25px;
`

const ComponentContainer = styled.div`
  margin-top: 10px;
`

export {
  ProductCard,
  ProductName,
  Description,
  ProductPrice,
  IconContainer,
  Amount,
  ComponentContainer,
}