import React, { useContext, useState, useEffect } from "react"
import { StoreContext } from "contexts/Store"
import TextButton from "components/UI/TextButton"
import {
  ReceiptContainer,
  Title,
  Total,
  Products,
  Item,
  ButtonContainer,
} from "./styles"

const Receipt = () => {
  const {
    purchaseChange,
    purchase,
    setPurchase,
    executeCleanPurchase,
    setExecuteCleanPurchase,
  } = useContext(StoreContext)

  const [finalPrice, setFinalPrice] = useState<number>(0)

  const calculatePrice = () => {
    let final = 0
    purchase.map(product => {
      final += product.final_price
      return final
    })
    setFinalPrice(final)
  }

  useEffect(() => {
    calculatePrice()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [purchaseChange, executeCleanPurchase])

  const cleanPurchase = () => {
    setPurchase([])
    setExecuteCleanPurchase(executeCleanPurchase + 1)
  }

  const executePurchase = () => {
    // post purchase
    // restar stock
    // modal success
    // limpiar purchase
    // setExecuteCleanPurchase(executeCleanPurchase + 1)
  }

  return (
    <ReceiptContainer>
      <Title>Recibo</Title>
      <Products>
        {purchase &&
          purchase.map(
            (pur: {
              product_id: number
              product_name: string
              product_amount: number
              final_price: number
            }) => (
              <Item>
                <p>{pur.product_name}</p>
                <p>x {pur.product_amount}</p>
              </Item>
            ),
          )}
      </Products>
      <Total>
        Total:
        <span>$ {finalPrice}</span>
      </Total>
      <ButtonContainer>
        <TextButton onClick={cleanPurchase} content="Cancelar" />
        <TextButton onClick={executePurchase} cta content="Realizar" />
      </ButtonContainer>
    </ReceiptContainer>
  )
}

export default Receipt
