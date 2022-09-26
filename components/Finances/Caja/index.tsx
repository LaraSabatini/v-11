import React, { useContext, useEffect } from "react"
// SERVICES
import { getStorePurchasesByDate } from "services/Store/storePurchases.service"
import { getProducts } from "services/Store/Products.service"
// DATA STORAGE & TYPES
import { Finances } from "contexts/Finances"
// COMPONENTS & STYLING
import ProductsView from "./ProducstView"
import BoulderView from "./BoulderView"
import CajaByUser from "./CajaByUser"

const Caja = () => {
  const {
    cajaFilterSelected,
    cajaDateSelected,
    setProductsPurchasedByDate,
    setProductList,
  } = useContext(Finances)

  const fillData = async () => {
    const productPurchasesCall = await getStorePurchasesByDate(cajaDateSelected)

    const filterProducts =
      productPurchasesCall.data.length > 0
        ? productPurchasesCall.data.filter(
            purchase =>
              purchase.product_id !== 1 &&
              purchase.product_id !== 2 &&
              purchase.product_id !== 3,
          )
        : []
    setProductsPurchasedByDate(filterProducts)

    const getProductsCall = await getProducts(1)
    setProductList(getProductsCall.data)
  }

  useEffect(() => {
    fillData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cajaDateSelected])

  return (
    <div>
      {cajaFilterSelected.id === 1 && <ProductsView />}
      {cajaFilterSelected.id === 2 && <BoulderView />}
      {cajaFilterSelected.id === 3 && <CajaByUser />}
      {cajaFilterSelected.id === 4 && <h1>CAJA COMPLETA</h1>}
    </div>
  )
}

export default Caja
