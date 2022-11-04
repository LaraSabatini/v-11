import React, { useContext, useEffect } from "react"
// DATA STORAGE & TYPES
import { getProductsAction } from "helpers/store"
import { Finances } from "contexts/Finances"
import generalTexts from "strings/general.json"
import fillDataForTotalEarnings from "./helpers/fillDataForTotalEarnings"
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
    const getAllData = await fillDataForTotalEarnings(tillDateSelected)
    setProductsPurchasedByDate(getAllData.productsPurchasedByDate)
    setBoulderProductsPurchasedByDate(getAllData.boulderProductsPurchasedByDate)
    setPartnerPaymentsByDate(getAllData.partnerPaymentsByDate)
    setDigitalPaymentsList(getAllData.digitalPaymentsList)
    setTotalEarnings(getAllData.totalEarnings)
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
