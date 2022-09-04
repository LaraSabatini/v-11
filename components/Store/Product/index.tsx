import React from "react"
// import Image from "next/image"
import Icon from "components/UI/Assets/Icon"
import {
  ProductCard,
  ProductName,
  Description,
  ProductPrice,
  IconContainer,
  Amount,
} from "./styles"

const Product = () => {
  return (
    <ProductCard>
      {/* <Image src="/beer.png" alt="alo" width={50} height={155} /> */}
      <img src="/beer.png" alt="beer" />
      <Description>
        <ProductName>Corona 750ml</ProductName>
        <ProductPrice>$ 500</ProductPrice>
        <IconContainer>
          <Icon icon="IconLess" />
          <Amount>0</Amount>
          <Icon icon="IconAdd" />
        </IconContainer>
      </Description>
    </ProductCard>
  )
}

export default Product
