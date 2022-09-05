import React, { useContext } from "react"
import ProductInterface from "interfaces/store/ProductInterface"
import { StoreContext } from "contexts/Store"
import Tooltip from "components/UI/Tooltip"
import Icon from "components/UI/Assets/Icon"
import ScrollView from "components/UI/ScrollView"
import Product from "../Product"
import { Container, Paginator, Navigate, ProductsContainer } from "./styles"

interface ProductListInterface {
  data: ProductInterface[]
  goPrev: () => void
  goNext: () => void
}

const ProductsView = ({ data, goPrev, goNext }: ProductListInterface) => {
  const { currentPage } = useContext(StoreContext)

  return (
    <Container>
      <ScrollView height={400}>
        <ProductsContainer>
          {data &&
            data.map(product => (
              <Product
                key={product.id}
                name={product.name}
                category_id={product.category_id}
                price={product.price}
              />
            ))}
        </ProductsContainer>
      </ScrollView>

      <Paginator>
        <Navigate onClick={() => goPrev()}>
          <Tooltip title="Prev">
            <Icon icon="IconArrowLeft" />
          </Tooltip>
        </Navigate>
        {currentPage}
        <Navigate onClick={() => goNext()}>
          <Tooltip title="next" placement="top-start">
            <Icon icon="IconArrowRight" />
          </Tooltip>
        </Navigate>
      </Paginator>
    </Container>
  )
}

export default ProductsView
