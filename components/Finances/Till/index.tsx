/* eslint-disable no-console */
import React, { useContext, useEffect } from "react"
// SERVICES
import { getStorePurchasesByDate } from "services/Store/storePurchases.service"
import { getProducts } from "services/Store/Products.service"
import { searchByDate } from "services/Finances/DigitalPayments.service"
import { getBoulderPurchaseByDate } from "services/Finances/Bouderpurchases.service"
// DATA STORAGE & TYPES
import { Finances } from "contexts/Finances"
import generalTexts from "strings/general.json"
// import PaymentInterface from "interfaces/partners/PaymentInterface"
import ProductsPurchasedByDateInterface from "interfaces/finances/StorePurchases"
// COMPONENTS & STYLING
import ProductsView from "./ProducstView"
import BoulderView from "./BoulderView"
import TillByUser from "./TillByUser"
import TotalEarnings from "./styles"

const Till = () => {
  const {
    tillFilterSelected,
    tillDateSelected,
    setProductsPurchasedByDate,
    setProductList,
    setBoulderProductsPurchasedByDate,
    setPartnerPaymentsByDate,
    setDigitalPaymentsList,
    totalEarnings,
    setTotalEarnings,
  } = useContext(Finances)

  const fillData = async () => {
    const productPurchasesCall = await getStorePurchasesByDate(tillDateSelected)

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

    const getBoulderPaymentsCall = await getBoulderPurchaseByDate(
      tillDateSelected,
    )

    setPartnerPaymentsByDate(getBoulderPaymentsCall.data)

    const digitalPaymentByDateCall = await searchByDate(tillDateSelected)

    setDigitalPaymentsList(digitalPaymentByDateCall.data)

    const cashEarningsFromStore = productPurchasesCall.data.filter(
      purchase => purchase.payment_method_id === 1,
    )
    let cashEarningsFinal = 0
    cashEarningsFromStore.map(p => {
      cashEarningsFinal += p.profit
      return 0
    })
    const cashEarningsFromBoulderPayments = getBoulderPaymentsCall.data.filter(
      purchase => purchase.payment_method_id === 1,
    )
    let cashEarningsFinalFromBoulder = 0
    cashEarningsFromBoulderPayments.map(p => {
      cashEarningsFinalFromBoulder += p.profit
      return 0
    })

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
  }, [tillDateSelected])

  const fillProducts = async () => {
    const getProductsCall = await getProducts(1)
    setProductList(getProductsCall.data)
  }

  useEffect(() => {
    fillProducts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      {tillFilterSelected.id === 1 && <ProductsView />}
      {tillFilterSelected.id === 2 && <BoulderView />}
      {tillFilterSelected.id === 3 && <TillByUser />}
      {tillFilterSelected.id === 4 && (
        <TotalEarnings>
          <p>
            <span>{generalTexts.payments.cash.toUpperCase()}:</span>{" "}
            <b>$ {totalEarnings.cash}</b>
          </p>
          <p>
            <span>{generalTexts.payments.digital.toUpperCase()}:</span>{" "}
            <b>$ {totalEarnings.mp}</b>
          </p>
        </TotalEarnings>
      )}
    </div>
  )
}

export default Till
