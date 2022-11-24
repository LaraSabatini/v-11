import React, { useContext, useEffect } from "react"
import { useRouter } from "next/router"
import { StoreContext } from "contexts/Store"
import { getCategoriesAction, getBrandsAction } from "helpers/store"
import PartnersProvider from "contexts/Partners"
import Header from "components/UI/Header"
import Modals from "./GeneralContent/Modals"
import NoPermissionsView from "./GeneralContent/NoPermissionsView"
import HeadingContent from "./HeadingContent"
import Content from "./styles"

function StoreView() {
  const router = useRouter()

  const { setCategories, setBrands } = useContext(StoreContext)

  const getPermissions = localStorage.getItem("permissions")
  const permissions = JSON.parse(getPermissions)[0].sections[2].sub_sections

  const buySection = permissions[0]
  const stockSection = permissions[1]
  const routeIsStore = Object.keys(router.query)[0] === "store"
  const routeIsStock = Object.keys(router.query)[0] === "stock"

  const setCategoriesAndBrandsData = async () => {
    const getCategories = await getCategoriesAction()
    setCategories(getCategories)

    const getBrands = await getBrandsAction()
    setBrands(getBrands)
  }

  useEffect(() => {
    setCategoriesAndBrandsData()
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
          <HeadingContent
            section={routeIsStore ? "store" : "stock"}
            canView={routeIsStore ? buySection.view : stockSection.view}
          />
        )}
      </Content>
    </div>
  )
}

export default StoreView
