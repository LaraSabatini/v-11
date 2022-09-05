import React from "react"
import Icon from "components/UI/Assets/Icon"
import Magnesiera from "components/UI/Assets/images/Magnesiera"
import {
  ProductCard,
  ProductName,
  Description,
  ProductPrice,
  IconContainer,
  Amount,
  ComponentContainer,
} from "./styles"

interface ProductCardInterface {
  name: string
  category_id: number
  price: number
}

const Product = ({ name, category_id, price }: ProductCardInterface) => {
  return (
    <ProductCard>
      {category_id === 1 && <img src="/beer.png" alt="beer" />}
      {category_id === 2 && (
        <ComponentContainer>
          <Magnesiera />
        </ComponentContainer>
      )}
      {/* merch */}

      <Description>
        <ProductName>{name}</ProductName>
        <ProductPrice>$ {price}</ProductPrice>
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
