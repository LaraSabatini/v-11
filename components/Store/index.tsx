import React, { useState, useEffect, useContext } from "react"
import { useRouter } from "next/router"
// SERVICES
import { getProducts, productByCategory } from "services/Store/Products.service"
import getCategories from "services/Store/getCategories.service"
import getBrands from "services/Store/getBrands.service"
// DATA STORAGE & TYPES
import { StoreContext } from "contexts/Store"
import storeTexts from "strings/store.json"
import generalTexts from "strings/general.json"
// COMPONENTS & STYLING
import theme from "theme/index"
import Tooptip from "components/UI/Tooltip"
import Icon from "components/UI/Assets/Icon"
import Header from "components/UI/Header"
import SearchBar from "components/UI/SearchBar"
import Modals from "./UI/Modals"
import ProductsView from "./Store/ProductList"
import Receipt from "./Store/Receipt"
import CreateProductForm from "./CreateProductForm"
import Filters from "./Store/Filters"
import Stock from "./Stock"
import {
  Container,
  Content,
  Title,
  HeadContent,
  CreateProduct,
  MainButton,
  ProductsAndReceiptContainer,
} from "./styles"

function StoreView() {
  const {
    setCategories,
    setBrands,
    productsList,
    setProductsList,
    currentPage,
    setCurrentPage,
    filterSelected,
    triggerListUpdate,
    searchValueForStock,
    setSearchValueForStock,
    setModalStockHasChanges,
    stockChanges,
  } = useContext(StoreContext)

  const [createProductModal, setCreateProductModal] = useState<boolean>(false)

  const router = useRouter()

  const getStaticData = async () => {
    const categoriesListCall = await getCategories()
    setCategories(categoriesListCall.data)

    const brandsListCall = await getBrands()
    setBrands(brandsListCall.data)
  }

  useEffect(() => {
    getStaticData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getListOfProducts = async () => {
    if (filterSelected === null) {
      const productListCall = await getProducts(currentPage)
      setProductsList(productListCall.data)
    } else {
      const productListByCategoryCall = await productByCategory(
        filterSelected,
        1,
      )
      setProductsList(productListByCategoryCall.data)
    }
  }

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

  useEffect(() => {
    getListOfProducts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerListUpdate, currentPage, filterSelected])

  return (
    <Container>
      <Modals />
      <Header />
      <Content>
        <HeadContent>
          <Title>
            {generalTexts.sections.store}{" "}
            <span>
              {" "}
              /{" "}
              {router.query.store === "true"
                ? `${generalTexts.sections.store}`
                : `${storeTexts.stock}`}
            </span>
          </Title>
          <Filters />
          {router.query.stock === "true" && (
            <button
              className="btn-search"
              type="button"
              onClick={() => {
                if (stockChanges) {
                  setModalStockHasChanges(true)
                }
              }}
            >
              <SearchBar
                searchValue={searchValueForStock}
                onChangeSearch={e => setSearchValueForStock(e.target.value)}
                width={250}
              />
            </button>
          )}
        </HeadContent>
        {router.query.store === "true" && (
          <ProductsAndReceiptContainer>
            <ProductsView goNext={goNext} goPrev={goPrev} data={productsList} />
            <Receipt />
          </ProductsAndReceiptContainer>
        )}
        {router.query.stock === "true" && <Stock />}
        {(router.query.store === "true" || router.query.stock === "true") && (
          <MainButton>
            <Tooptip title={storeTexts.mainButton}>
              <CreateProduct
                onClick={() => {
                  if (stockChanges) {
                    setModalStockHasChanges(true)
                  } else {
                    setCreateProductModal(true)
                  }
                }}
              >
                <Icon color={theme.colors.white} icon="IconAdd" />
              </CreateProduct>
            </Tooptip>
          </MainButton>
        )}
      </Content>
      {createProductModal && (
        <CreateProductForm cancelCreate={() => setCreateProductModal(false)} />
      )}
    </Container>
  )
}

export default StoreView
