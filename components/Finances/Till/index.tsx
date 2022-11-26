import React, { useContext, useEffect, useState } from "react"
// DATA STORAGE & TYPES
import { getProductsAction, getStorePurchasesByDateAction } from "helpers/store"
import { searchDigitalPaymentByDateAction } from "helpers/payments"
import getFinancesData from "services/BusinessLogic/getFinancesData.service"
import { Finances } from "contexts/Finances"
import generalTexts from "strings/general.json"
// COMPONENTS & STYLING
import ProductsView from "./ProducstView"
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

  const [financialData, setFinancialData] = useState<{
    tillEarnings: {
      cash: number
      mp: number
    }
    boulder: {
      earnings: {
        cash: number
        mp: number
      }
      freePass: {
        earnings: {
          cash: number
          mp: number
        }
        individual: number
        packFour: number
        packEight: number
        total: number
        amountOfPeople: number
      }
      lessons: {
        earnings: {
          cash: number
          mp: number
        }
        individual: number
        packFour: number
        packEight: number
        total: number
      }
      month: {
        earnings: {
          cash: number
          mp: number
        }
        total: number
      }
      combo: {
        earnings: {
          cash: number
          mp: number
        }
        total: number
      }
      shoes: {
        earnings: {
          cash: number
          mp: number
        }
        total: number
      }
      freePassWithDiscount: {
        earnings: {
          cash: number
          mp: number
        }
        total: number
      }
    }
    store: {
      earnings: {
        cash: number
        mp: number
      }
    }
  }>({
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
          1: <ProductsView profits={financialData.store.earnings} />,
          2: <BoulderView data={financialData.boulder} />,
          3: <TillByUser />,
          4: (
            <TotalEarnings>
              <p>
                <span>{generalTexts.payments.cash.toUpperCase()}:</span>{" "}
                <b>$ {financialData.tillEarnings?.cash}</b>
              </p>
              <p>
                <span>{generalTexts.payments.digital.toUpperCase()}:</span>{" "}
                <b>$ {financialData.tillEarnings?.mp}</b>
              </p>
            </TotalEarnings>
          ),
        }[tillFilterSelected.id]
      }
    </div>
  )
}

export default Till
