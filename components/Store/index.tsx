import React, { useState, useEffect, useContext } from "react"
import getProducts from "services/Store/getProducts.service"
import getCategories from "services/Store/getCategories.service"
import getBrands from "services/Store/getBrands.service"
import { StoreContext } from "contexts/Store"
import texts from "strings/store.json"
import theme from "theme/index"
import ModalAlert from "components/UI/ModalAlert"
import Tooptip from "components/UI/Tooltip"
import Icon from "components/UI/Assets/Icon"
import Header from "components/UI/Header"
// import Product from "./Product"
import CreateProductForm from "./CreateProductForm"
import {
  Container,
  Content,
  Title,
  HeadContent,
  FiltersContainer,
  Select,
  Selector,
  Option,
  IconContainer,
  SectionsButtons,
  Section,
  ProductsContainer,
  CreateProduct,
  MainButton,
} from "./styles"

function StoreView() {
  const {
    setCategories,
    setBrands,
    categories,
    brands,
    modalSuccess,
    setModalSuccess,
    modalError,
    setModalError,
    productsList,
    setProductsList,
    currentPage,
    // setCurrentPage,
  } = useContext(StoreContext)
  const [createModal, setCreateModal] = useState<boolean>(false)
  const [triggerListUpdate, setTriggerListUpdate] = useState<number>(1)

  const [openTypeMenu, setOpenTypeMenu] = useState<boolean>(false)
  const [openBrandMenu, setOpenBrandMenu] = useState<boolean>(false)

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

  // use effect con triggerListUpdate

  const getListOfProducts = async () => {
    const data = await getProducts(currentPage)
    setProductsList(data.data)
  }

  useEffect(() => {
    getListOfProducts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerListUpdate, currentPage])

  return (
    <Container>
      {modalSuccess !== null && (
        <ModalAlert
          success
          message={modalSuccess}
          closeRefresh={() => {
            setTriggerListUpdate(triggerListUpdate + 1)
            setModalSuccess(null)
          }}
        />
      )}
      {modalError !== null && (
        <ModalAlert
          success={false}
          message={modalError}
          closeRefresh={() => {
            setModalError(null)
          }}
        />
      )}
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
          {sectionSelected.id === 1 && (
            <FiltersContainer>
              <Select
                onClick={() => {
                  setOpenTypeMenu(!openTypeMenu)
                  setOpenBrandMenu(false)
                }}
              >
                <p>
                  {texts.type}
                  <IconContainer>
                    <Icon icon="IconArrowLeft" />
                  </IconContainer>
                </p>
                {openTypeMenu && (
                  <Selector>
                    {categories.length &&
                      categories.map(
                        (category: { id: number; name: string }) => (
                          <Option key={category.id}>{category.name}</Option>
                        ),
                      )}
                  </Selector>
                )}
              </Select>
              <Select
                onClick={() => {
                  setOpenBrandMenu(!openBrandMenu)
                  setOpenTypeMenu(false)
                }}
              >
                <p>
                  {texts.brand}
                  <IconContainer>
                    <Icon icon="IconArrowLeft" />
                  </IconContainer>
                </p>
                {openBrandMenu && (
                  <Selector>
                    {brands.length &&
                      brands.map((brand: { id: number; name: string }) => (
                        <Option key={brand.id}>{brand.name}</Option>
                      ))}
                  </Selector>
                )}
              </Select>
            </FiltersContainer>
          )}
        </HeadContent>
        <ProductsContainer>
          {/* <Product /> */}
          {productsList && productsList.map(product => <p>{product.name}</p>)}
        </ProductsContainer>
        <MainButton>
          <Tooptip title="Crear producto">
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
