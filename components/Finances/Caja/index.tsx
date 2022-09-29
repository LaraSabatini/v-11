/* eslint-disable no-console */
import React, { useContext, useEffect } from "react"
// SERVICES
import { getStorePurchasesByDate } from "services/Store/storePurchases.service"
import { getProducts } from "services/Store/Products.service"
import { searchByDate } from "services/Finances/DigitalPayments.service"
import { getBoulderPurchaseByDate } from "services/Finances/Bouderpurchases.service"
// DATA STORAGE & TYPES
import { Finances } from "contexts/Finances"
// import PaymentInterface from "interfaces/partners/PaymentInterface"
import ProductsPurchasedByDateInterface from "interfaces/finances/StorePurchases"
// COMPONENTS & STYLING
import ProductsView from "./ProducstView"
import BoulderView from "./BoulderView"
import CajaByUser from "./CajaByUser"
import TotalEarnings from "./styles"

const Caja = () => {
  const {
    cajaFilterSelected,
    cajaDateSelected,
    setProductsPurchasedByDate,
    setProductList,
    setBoulderProductsPurchasedByDate,
    setPartnerPaymentsByDate,
    setDigitalPaymentsList,
    totalEarnings,
    setTotalEarnings,
  } = useContext(Finances)

  const fillData = async () => {
    const productPurchasesCall = await getStorePurchasesByDate(cajaDateSelected)

    const filterProducts =
      productPurchasesCall.data.length > 0
        ? productPurchasesCall.data.filter(
            (purchase: ProductsPurchasedByDateInterface) =>
              purchase.product_id !== 1 &&
              purchase.product_id !== 2 &&
              purchase.product_id !== 3,
          )
        : []
    setProductsPurchasedByDate(filterProducts)

    const filterBoulderProducts =
      productPurchasesCall.data.length > 0
        ? productPurchasesCall.data.filter(
            (purchase: ProductsPurchasedByDateInterface) =>
              purchase.product_id === 1 ||
              purchase.product_id === 2 ||
              purchase.product_id === 3,
          )
        : []

    setBoulderProductsPurchasedByDate(filterBoulderProducts)

    // TRAE TODO TIPO DE PAGO MENOS partner_id === 258
    const getBoulderPaymentsCall = await getBoulderPurchaseByDate(
      cajaDateSelected,
    )

    setPartnerPaymentsByDate(getBoulderPaymentsCall.data)

    const getProductsCall = await getProducts(1)
    setProductList(getProductsCall.data)

    const digitalPaymentByDateCall = await searchByDate(cajaDateSelected)

    setDigitalPaymentsList(digitalPaymentByDateCall.data)

    // console.log("productPurchasesCall", productPurchasesCall.data)
    // console.log("getBoulderPaymentsCall", getBoulderPaymentsCall.data)

    // CASH EARNIGS => STORE
    const cashEarningsFromStore = productPurchasesCall.data.filter(
      purchase => purchase.payment_method_id === 1,
    )
    let cashEarningsFinal = 0
    cashEarningsFromStore.map(p => {
      cashEarningsFinal += p.profit
      return 0
    })
    // => BOULDER PURCHASES
    const cashEarningsFromBoulderPayments = getBoulderPaymentsCall.data.filter(
      purchase => purchase.payment_method_id === 1,
    )
    let cashEarningsFinalFromBoulder = 0
    cashEarningsFromBoulderPayments.map(p => {
      cashEarningsFinalFromBoulder += p.profit
      return 0
    })

    // MP EARNIGS => STORE

    let mpEarningsFinal = 0
    digitalPaymentByDateCall.data.map(p => {
      mpEarningsFinal += p.total_profit
      return 0
    })

    setTotalEarnings({
      cash: cashEarningsFinal + cashEarningsFinalFromBoulder,
      mp: mpEarningsFinal,
    })
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
      {cajaFilterSelected.id === 4 && (
        <TotalEarnings>
          <p>
            <span>EFECTIVO:</span> <b>$ {totalEarnings.cash}</b>
          </p>
          <p>
            <span>MERCADO PAGO:</span> <b>$ {totalEarnings.mp}</b>
          </p>
        </TotalEarnings>
      )}
    </div>
  )
}

export default Caja
