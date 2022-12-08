import React, { useContext, useEffect } from "react"
import { useRouter } from "next/router"
import { StoreContext } from "contexts/Store"
import {
  getCategoriesAction,
  getBrandsAction,
  getProductsAction,
} from "helpers/store"
import PartnersProvider from "contexts/Partners"
import DefaultInterface from "interfaces/components/DefaultInterface"
import OptionsInterface from "interfaces/store/OptionsInterface"
import Header from "components/UI/Header"
import Modals from "./GeneralContent/Modals"
import NoPermissionsView from "./GeneralContent/NoPermissionsView"
import CreateProduct from "./Forms/CreateProduct"
import HeadingContent from "./HeadingContent"
import Buy from "./Buy"
import Stock from "./Stock"
import Content from "./styles"
import CreateBrandForm from "./Forms/CreateBrand"

function StoreView() {
  const router = useRouter()

  const {
    setCategories,
    setBrands,
    createProductModal,
    setCreateProductModal,
    setAutoCompleteBrandsValues,
    setAutoCompleteCategoriesValues,
    setProductsList,
    currentPage,
    createBrandModal,
    setCreateBrandModal,
  } = useContext(StoreContext)

  const getPermissions = localStorage.getItem("permissions")
  const permissions = JSON.parse(getPermissions)[0].sections[2].sub_sections

  const buySection = permissions[0]
  const stockSection = permissions[1]
  const routeIsStore = Object.keys(router.query)[0] === "store"
  const routeIsStock = Object.keys(router.query)[0] === "stock"

  const setData = async () => {
    const getCategories = await getCategoriesAction()
    setCategories(getCategories)

    const getBrands = await getBrandsAction()
    setBrands(getBrands)

    const autocompleteBrands: DefaultInterface[] = []
    getBrands.map((brand: OptionsInterface) =>
      autocompleteBrands.push({ id: brand.id, display_name: brand.name }),
    )
    const autocompleteCategories: DefaultInterface[] = []
    getCategories.map((category: OptionsInterface) =>
      autocompleteCategories.push({
        id: category.id,
        display_name: category.name,
      }),
    )
    setAutoCompleteBrandsValues(autocompleteBrands)
    setAutoCompleteCategoriesValues(autocompleteCategories)

    const getProducts = await getProductsAction(currentPage)
    setProductsList(getProducts)
  }

  useEffect(() => {
    setData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage])

  useEffect(() => {
    setData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <PartnersProvider>
        <Header />
      </PartnersProvider>
      <Modals />
      <Content>
        {routeIsStore && !buySection.view && <NoPermissionsView />}

        {((routeIsStore && buySection.view) ||
          (routeIsStock && stockSection.view)) && (
          <>
            <HeadingContent
              section={routeIsStore ? "store" : "stock"}
              canView={routeIsStore ? buySection.view : stockSection.view}
            />
            {createProductModal && (
              <CreateProduct
                cancelCreate={() => setCreateProductModal(false)}
              />
            )}
            {createBrandModal && (
              <CreateBrandForm
                cancelCreate={() => setCreateBrandModal(false)}
              />
            )}
          </>
        )}
        {routeIsStore && buySection.view && (
          <Buy permits={buySection.actions} />
        )}
        {routeIsStock && stockSection.view && (
          <Stock editPermits={stockSection.actions.update} />
        )}
      </Content>
    </div>
  )
}

export default StoreView
