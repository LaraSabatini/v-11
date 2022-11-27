import React, { useContext } from "react"
import { Finances } from "contexts/Finances"
import generalTexts from "strings/general.json"
import ProductsView from "./ProductsView"
import BoulderView from "./BoulderView"
import TillByUser from "./TillByUser"
import TotalEarnings from "./styles"

function Till() {
  const { tillFilterSelected, totalEarnings } = useContext(Finances)

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
