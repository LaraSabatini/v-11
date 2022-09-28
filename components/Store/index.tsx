import React, { useState, useEffect, useContext } from "react"
// SERVICES
import { getProducts, productByCategory } from "services/Store/Products.service"
import getCategories from "services/Store/getCategories.service"
import getBrands from "services/Store/getBrands.service"
// DATA STORAGE & TYPES
import { StoreContext } from "contexts/Store"
import texts from "strings/store.json"
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
import Purchases from "./Purchases"
import Stock from "./Stock"
import {
  Container,
  Content,
  Title,
  HeadContent,
  SectionsButtons,
  Section,
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

  const [sectionSelected, setSectionSelected] = useState<{
    section: string
    id: number
  }>({
    section: `${texts.sells}`,
    id: 1,
  })

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
        <SectionsButtons>
          <Section
            onClick={() => {
              if (stockChanges) {
                setModalStockHasChanges(true)
              } else {
                setSectionSelected({ section: `${texts.sells}`, id: 1 })
              }
            }}
            selected={sectionSelected.id === 1}
          >
            {texts.sells}
          </Section>
          {/* <Section
            onClick={() => {
              if (stockChanges) {
                setModalStockHasChanges(true)
              } else {
                setSectionSelected({ section: `${texts.purchases}`, id: 2 })
              }
            }}
            selected={sectionSelected.id === 2}
          >
            {texts.purchases}
          </Section> */}
          <Section
            onClick={() => {
              if (stockChanges) {
                setModalStockHasChanges(true)
              } else {
                setSectionSelected({ section: `${texts.stock}`, id: 3 })
              }
            }}
            selected={sectionSelected.id === 3}
          >
            {texts.stock}
          </Section>
        </SectionsButtons>
        <HeadContent>
          <Title>
            {texts.title} <span> / {sectionSelected.section}</span>
          </Title>
          <Filters section={sectionSelected.id} />
          {sectionSelected.id === 3 && (
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
        {sectionSelected.id === 1 && (
          <ProductsAndReceiptContainer>
            <ProductsView goNext={goNext} goPrev={goPrev} data={productsList} />
            <Receipt />
          </ProductsAndReceiptContainer>
        )}
        {sectionSelected.id === 2 && <Purchases />}
        {sectionSelected.id === 3 && <Stock />}
        {(sectionSelected.id === 1 || sectionSelected.id === 3) && (
          <MainButton>
            <Tooptip title={texts.mainButton}>
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
