import React, { useState, useEffect, useContext } from "react"
import { useRouter } from "next/router"
// DATA STORAGE & TYPES
import {
  getBrandsAction,
  getCategoriesAction,
  getProductsAction,
  searchProductsAction,
  getproductByCategoryAction,
} from "helpers/store"
import PartnersProvider from "contexts/Partners"
import { StoreContext } from "contexts/Store"
import storeTexts from "strings/store.json"
import generalTexts from "strings/general.json"
import RowsInterface from "interfaces/store/RowsInterface"
import ProductInterface from "interfaces/store/ProductInterface"
import OptionsInterface from "interfaces/store/OptionsInterface"
import cleanMargin from "utils/cleanMargin"
// COMPONENTS & STYLING
import theme from "theme/index"
import NoPermissionsView from "components/UI/NoPermitsView"
import Tooptip from "components/UI/Tooltip"
import PopOver from "components/UI/PopOver"
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
  HeadContent,
  CreateProduct,
  MainButton,
  ProductsAndReceiptContainer,
  NoPermissionsViewContainer,
  HelpContainer,
  SearchBarContainer,
  Title,
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
    brands,
    categories,
    setRows,
  } = useContext(StoreContext)

  const [createProductModal, setCreateProductModal] = useState<boolean>(false)
  const [popOverView, setPopOverView] = useState<boolean>(false)

  const router = useRouter()

  const getPermissions = localStorage.getItem("permissions")
  const permissions = JSON.parse(getPermissions)[0].sections[2].sub_sections

  const getStaticData = async () => {
    const categoriesListCall = await getCategoriesAction()
    setCategories(categoriesListCall)

    const brandsListCall = await getBrandsAction()
    setBrands(brandsListCall)
  }

  useEffect(() => {
    getStaticData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getListOfProducts = async () => {
    if (filterSelected === null) {
      const productListCall = await getProductsAction(currentPage)
      setProductsList(productListCall)
    } else {
      const productListByCategoryCall = await getproductByCategoryAction(
        filterSelected,
        1,
      )
      setProductsList(productListByCategoryCall)
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

  const searchInDB = async () => {
    const search = await searchProductsAction(searchValueForStock, 1)
    setProductsList(search)
    const rowsCleaned: RowsInterface[] = []

    search.map((product: ProductInterface) => {
      const marginString = `${product.margin}`
      const cleanIt = cleanMargin(marginString.split("."))
      const finalMargin = cleanIt.includes(".")
        ? parseFloat(cleanIt)
        : parseInt(cleanIt, 10)

      rowsCleaned.push({
        id: product.id,
        item: product.name,
        brand: brands.filter(
          (brand: OptionsInterface) => brand.id === product.brand_id,
        )[0]?.name,
        category: categories.filter(
          (category: OptionsInterface) => category.id === product.category_id,
        )[0]?.name,
        stock: product.stock,
        price: product.price,
        margin: finalMargin,
        cost: product.cost,
        sales_contact_name: product.sales_contact_name,
        sales_contact_information: product.sales_contact_information,
      })
      return 0
    })

    setRows({
      success: true,
      rows: rowsCleaned,
    })
  }

  useEffect(() => {
    // console.log("cambio ruta", Object.keys(router.query)[0])
    getListOfProducts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Object.keys(router.query)[0]])

  return (
    <Container>
      <Modals />
      <PartnersProvider>
        <Header />
      </PartnersProvider>
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
          {(Object.keys(router.query)[0] === "stock" && permissions[1].view) ||
            (Object.keys(router.query)[0] === "store" &&
              permissions[0].view && <Filters />)}

          {Object.keys(router.query)[0] === "stock" && permissions[1].view && (
            <button
              className="btn-search"
              type="button"
              onClick={() => {
                if (stockChanges) {
                  setModalStockHasChanges(true)
                }
              }}
            >
              <SearchBarContainer>
                <HelpContainer onClick={() => setPopOverView(!popOverView)}>
                  <PopOver
                    title={generalTexts.search.title}
                    description={generalTexts.search.description}
                    view={popOverView}
                  />
                  <Icon icon="IconHelp" />
                </HelpContainer>
                <SearchBar
                  searchValue={searchValueForStock}
                  onChangeSearch={e => {
                    if (e.target.value === "") {
                      setSearchValueForStock("")
                    } else {
                      setSearchValueForStock(e.target.value)
                    }
                  }}
                  width={250}
                  enterSearch={searchInDB}
                />
              </SearchBarContainer>
            </button>
          )}
        </HeadContent>
        {((Object.keys(router.query)[0] === "store" && !permissions[0].view) ||
          (Object.keys(router.query)[0] === "stock" &&
            !permissions[1].view)) && (
          <NoPermissionsViewContainer>
            <NoPermissionsView />
          </NoPermissionsViewContainer>
        )}
        {Object.keys(router.query)[0] === "store" && permissions[0].view && (
          <ProductsAndReceiptContainer>
            <ProductsView goNext={goNext} goPrev={goPrev} data={productsList} />
            <Receipt purchasePermits={permissions[0].actions.create_purchase} />
          </ProductsAndReceiptContainer>
        )}
        {Object.keys(router.query)[0] === "stock" && (
          <Stock editPermits={permissions[1].actions.update} />
        )}
        {(Object.keys(router.query)[0] === "store" ||
          Object.keys(router.query)[0] === "stock") &&
          permissions[0].actions.create_product && (
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
