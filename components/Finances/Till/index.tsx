/* eslint-disable no-console */
import React, { useContext, useEffect } from "react"
// DATA STORAGE & TYPES
import {
  getBoulderPurchaseByDateAction,
  searchDigitalPaymentByDateAction,
} from "helpers/payments"
import { getProductsAction, getStorePurchasesByDateAction } from "helpers/store"
import { Finances } from "contexts/Finances"
import generalTexts from "strings/general.json"
import ProductsPurchasedByDateInterface from "interfaces/finances/StorePurchases"
import PartnerPaymentsHistoryInterface from "interfaces/finances/PartnerPaymentsHistory"
// COMPONENTS & STYLING
import ProductsView from "./ProducstView"
import BoulderView from "./BoulderView"
import TillByUser from "./TillByUser"
import TotalEarnings from "./styles"

function Till() {
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
    const productPurchasesCall = await getStorePurchasesByDateAction(
      tillDateSelected,
    )

    const filterProducts =
      productPurchasesCall.length > 0
        ? productPurchasesCall.filter(
            (purchase: ProductsPurchasedByDateInterface) =>
              purchase.product_id !== 1 &&
              purchase.product_id !== 2 &&
              purchase.product_id !== 3,
          )
        : []
    setProductsPurchasedByDate(filterProducts)

    const filterBoulderProducts =
      productPurchasesCall.length > 0
        ? productPurchasesCall.filter(
            (purchase: ProductsPurchasedByDateInterface) =>
              purchase.product_id === 1 ||
              purchase.product_id === 2 ||
              purchase.product_id === 3,
          )
        : []

    setBoulderProductsPurchasedByDate(filterBoulderProducts)

    const getBoulderPaymentsCall = await getBoulderPurchaseByDateAction(
      tillDateSelected,
    )

    setPartnerPaymentsByDate(getBoulderPaymentsCall)

    const digitalPaymentByDateCall = await searchDigitalPaymentByDateAction(
      tillDateSelected,
    )

    setDigitalPaymentsList(digitalPaymentByDateCall)

    const cashEarningsFromStore = productPurchasesCall.filter(
      (purchase: ProductsPurchasedByDateInterface) =>
        purchase.payment_method_id === 1,
    )
    let cashEarningsFinal = 0
    cashEarningsFromStore.map(p => {
      cashEarningsFinal += p.profit
      return 0
    })
    const cashEarningsFromBoulderPayments = getBoulderPaymentsCall.filter(
      (purchase: PartnerPaymentsHistoryInterface) =>
        purchase.payment_method_id === 1,
    )

    let cashEarningsFinalFromBoulder = 0
    cashEarningsFromBoulderPayments.map(p => {
      cashEarningsFinalFromBoulder += p.profit
      return 0
    })

    let mpEarningsFinal = 0
    digitalPaymentByDateCall.map(p => {
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
    const getProductsCall = await getProductsAction(1)
    setProductList(getProductsCall)
  }

  useEffect(() => {
    fillProducts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      {
        {
          1: <ProductsView />,
          2: <BoulderView />,
          3: <TillByUser />,
          4: (
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
          ),
        }[tillFilterSelected.id]
      }
    </div>
  )
}

export default Till
