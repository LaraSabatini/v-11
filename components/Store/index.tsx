import React, { useState, useEffect, useContext } from "react"
import { productByCategory } from "services/Store/searchProduct.service"
import getProducts from "services/Store/getProducts.service"
import getCategories from "services/Store/getCategories.service"
import getBrands from "services/Store/getBrands.service"
import { StoreContext } from "contexts/Store"
import texts from "strings/store.json"
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
  } = useContext(StoreContext)
  const [createModal, setCreateModal] = useState<boolean>(false)

  const [sectionSelected, setSectionSelected] = useState<{
    section: string
    id: number
  }>({
    section: `${texts.sells}`,
    id: 1,
  })

  const setData = async () => {
    const categoriesList = await getCategories()
    setCategories(categoriesList.data)

    const brandsList = await getBrands()
    setBrands(brandsList.data)
  }

  useEffect(() => {
    setData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getListOfProducts = async () => {
    if (filterSelected === null) {
      const data = await getProducts(currentPage)
      setProductsList(data.data)
    } else {
      const data = await productByCategory(filterSelected, 1)
      setProductsList(data.data)
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
            onClick={() =>
              setSectionSelected({ section: `${texts.sells}`, id: 1 })
            }
            selected={sectionSelected.id === 1}
          >
            {texts.sells}
          </Section>
          <Section
            onClick={() =>
              setSectionSelected({ section: `${texts.purchases}`, id: 2 })
            }
            selected={sectionSelected.id === 2}
          >
            {texts.purchases}
          </Section>
          <Section
            onClick={() =>
              setSectionSelected({ section: `${texts.stock}`, id: 3 })
            }
            selected={sectionSelected.id === 3}
          >
            {texts.stock}
          </Section>
        </SectionsButtons>
        <HeadContent>
          <Title>
            {texts.title} <span> / {sectionSelected.section}</span>
          </Title>
          {sectionSelected.id === 1 && <Filters />}
          {sectionSelected.id === 3 && (
            <SearchBar
              searchValue={searchValueForStock}
              onChangeSearch={e => setSearchValueForStock(e.target.value)}
              width={250}
            />
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
        <MainButton>
          <Tooptip title={texts.mainButton}>
            <CreateProduct onClick={() => setCreateModal(true)}>
              <Icon color={theme.colors.white} icon="IconAdd" />
            </CreateProduct>
          </Tooptip>
        </MainButton>
      </Content>
      {createModal && (
        <CreateProductForm cancelCreate={() => setCreateModal(false)} />
      )}
    </Container>
  )
}

export default StoreView
