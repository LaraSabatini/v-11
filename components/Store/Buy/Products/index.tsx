import React, { useContext, useEffect } from "react"
import { StoreContext } from "contexts/Store"
import { productByCategory } from "services/Store/Products.service"
import generalTexts from "strings/general.json"
import ProductInterface from "interfaces/store/ProductInterface"
import Tooltip from "components/UI/Tooltip"
import Icon from "components/UI/Assets/Icon"
import ScrollView from "components/UI/ScrollView"
import ProductCard from "./ProductCard"
import { ProductsContainer, Paginator, Navigate } from "./styles"

function Products() {
  const {
    currentPage,
    productsList,
    setCurrentPage,
    filterSelected,
    setProductsList,
    setUpdateData,
    updateData,
  } = useContext(StoreContext)

  const goPrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const goNext = () => {
    if (productsList.length > 0) {
      setCurrentPage(currentPage + 1)
    }
  }

  const filterProducts = async () => {
    const productByCategoryReq = await productByCategory(filterSelected, 1)
    setProductsList(productByCategoryReq.data)
  }

  useEffect(() => {
    if (filterSelected !== null) {
      filterProducts()
    } else {
      setUpdateData(updateData + 1)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterSelected])

  return (
    <div>
      <ScrollView height={400}>
        <ProductsContainer>
          {productsList &&
            productsList.map((product: ProductInterface) => (
              <ProductCard data={product} key={product.id} />
            ))}
        </ProductsContainer>
      </ScrollView>

      <Paginator>
        <Navigate onClick={() => goPrev()}>
          <Tooltip title={generalTexts.pagination.prev}>
            <Icon icon="IconArrowLeft" />
          </Tooltip>
        </Navigate>
        {currentPage}
        <Navigate onClick={() => goNext()}>
          <Tooltip title={generalTexts.pagination.next} placement="top-start">
            <Icon icon="IconArrowRight" />
          </Tooltip>
        </Navigate>
      </Paginator>
    </div>
  )
}

export default Products
