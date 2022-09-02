import styled from "styled-components"
import theme from "theme/index"

const ProductCard = styled.div`
  font-family: ${theme.fonts.primary};
  width: 200px;
  /* height: 200px; */
  padding: 15px;
  border-radius: 10px;
  display: flex;
  justify-content: space-around;
  /* flex-direction: column; */
  box-shadow: 0px 3px 9px 0px rgba(45, 54, 61, 0.13);
  -webkit-box-shadow: 0px 3px 9px 0px rgba(45, 54, 61, 0.13);
  -moz-box-shadow: 0px 3px 9px 0px rgba(45, 54, 61, 0.13);
`

const ProductName = styled.p`
  /* margin-left: 10px; */
`

const Description = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 150px;
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
  cursor: pointer;
`

const Amount = styled.p`
  font-size: 25px;
`

export {
  ProductCard,
  ProductName,
  Description,
  ProductPrice,
  IconContainer,
  Amount,
}
