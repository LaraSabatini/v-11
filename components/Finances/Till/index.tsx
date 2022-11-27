import React, { useContext, useEffect, useState } from "react"
import { Finances } from "contexts/Finances"
import { getProductsAction, getStorePurchasesByDateAction } from "helpers/store"
import { searchDigitalPaymentByDateAction } from "helpers/payments"
import getFinancesData from "services/BusinessLogic/getFinancesData.service"
import FinancialDataInterface from "interfaces/finances/FinancialData"
import generalTexts from "strings/general.json"
import ProductsView from "./ProductsView"
import BoulderView from "./BoulderView"
import TillByUser from "./TillByUser"
import TotalEarnings from "./styles"

function Till() {
  const {
    tillFilterSelected,
    tillDateSelected,
    setProductList,
    setDigitalPaymentsList,
    setProductsPurchasedByDate,
  } = useContext(Finances)

  const [financialData, setFinancialData] = useState<FinancialDataInterface>({
    tillEarnings: {
      cash: 0,
      mp: 0,
    },
    boulder: {
      earnings: {
        cash: 0,
        mp: 0,
      },
      freePass: {
        earnings: {
          cash: 0,
          mp: 0,
        },
        individual: 0,
        packFour: 0,
        packEight: 0,
        total: 0,
        amountOfPeople: 0,
      },
      lessons: {
        earnings: {
          cash: 0,
          mp: 0,
        },
        individual: 0,
        packFour: 0,
        packEight: 0,
        total: 0,
      },
      month: {
        earnings: {
          cash: 0,
          mp: 0,
        },
        total: 0,
      },
      combo: {
        earnings: {
          cash: 0,
          mp: 0,
        },
        total: 0,
      },
      shoes: {
        earnings: {
          cash: 0,
          mp: 0,
        },
        total: 0,
      },
      freePassWithDiscount: {
        earnings: {
          cash: 0,
          mp: 0,
        },
        total: 0,
      },
    },
    store: {
      earnings: {
        cash: 0,
        mp: 0,
      },
    },
  })

  const fillData = async () => {
    const getData = await getFinancesData(tillDateSelected)
    setFinancialData(getData.data)
    const getStorePurchases = await getStorePurchasesByDateAction(
      tillDateSelected,
    )

    const filterProducts = getStorePurchases.filter(
      item =>
        item.product_id !== 1 && item.product_id !== 2 && item.product_id !== 3,
    )
    setProductsPurchasedByDate(filterProducts)

    const getDigitalPayments = await searchDigitalPaymentByDateAction(
      tillDateSelected,
    )
    setDigitalPaymentsList(getDigitalPayments)
  }

  const fillProducts = async () => {
    const getProductsCall = await getProductsAction(1)
    setProductList(getProductsCall)
  }

  useEffect(() => {
    fillProducts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    fillData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tillDateSelected])

  return (
    <div>
      {
        {
          1: <ProductsView profits={financialData.store.earnings} />,
          2: <BoulderView data={financialData.boulder} />,
          3: <TillByUser />,
          4: (
            <TotalEarnings>
              <p>
                <span>{generalTexts.payments.cash.toUpperCase()}:</span>{" "}
                <b>$ {financialData.tillEarnings.cash}</b>
              </p>
              <p>
                <span>{generalTexts.payments.digital.toUpperCase()}:</span>{" "}
                <b>$ {financialData.tillEarnings.mp}</b>
              </p>
            </TotalEarnings>
          ),
        }[tillFilterSelected.id]
      }
    </div>
  )
}

export default Till
