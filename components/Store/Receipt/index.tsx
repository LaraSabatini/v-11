/* eslint-disable no-await-in-loop */
import React, { useContext, useState, useEffect } from "react"
import texts from "strings/store.json"
import createPurchase from "services/Store/createPurchase.service"
import editProduct from "services/Store/editProduct.service"
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
    productsList,
    setModalSuccess,
    setModalError,
  } = useContext(StoreContext)

  const [finalPrice, setFinalPrice] = useState<number>(0)
  const [purchaseSuccess, setPurchaseSuccess] = useState<boolean>(false)

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

  const executePurchase = async () => {
    const today = new Date()
    const day = today.getDate() > 9 ? today.getDate() : `0${today.getDate()}`
    const month =
      today.getMonth() + 1 > 9
        ? today.getMonth() + 1
        : `0${today.getMonth() + 1}`
    const year = today.getFullYear()

    for (let i = 0; i < purchase.length; i += 1) {
      const bodyPurchase = {
        id: 0,
        date: `${day}/${month}/${year}`,
        item_id: purchase[i].product_id,
        amount_of_items: purchase[i].product_amount,
        cost: purchase[i].cost * purchase[i].product_amount,
        margin: purchase[i].margin,
        final_price: purchase[i].final_price,
      }
      // post purchase
      const execute = await createPurchase(bodyPurchase)
      if (execute.message === "purchase created successfully") {
        setPurchaseSuccess(true)
      } else {
        setPurchaseSuccess(false)
      }

      const filterProduct = productsList.filter(
        product => product.id === purchase[i].product_id,
      )
      const editStockBody = {
        id: purchase[i].product_id,
        stock: filterProduct[0].stock - purchase[i].product_amount,
        //
        name: filterProduct[0].name,
        brand_id: filterProduct[0].brand_id,
        category_id: filterProduct[0].category_id,
        price: filterProduct[0].price,
        margin: filterProduct[0].margin,
        cost: filterProduct[0].cost,
        sales_contact_name: filterProduct[0].sales_contact_name,
        sales_contact_information: filterProduct[0].sales_contact_information,
      }

      const editStock = await editProduct(editStockBody)
      if (editStock.message === "product updated successfully") {
        setPurchaseSuccess(true)
      } else {
        setPurchaseSuccess(false)
      }
    }

    if (purchaseSuccess) {
      setModalSuccess({
        status: "success",
        icon: "IconCheckModal",
        title: `${texts.purchase.success.title}`,
        content: `${texts.purchase.success.content}`,
      })
    } else {
      setModalError({
        status: "alert",
        icon: "IconExclamation",
        title: `${texts.purchase.error.title}`,
        content: `${texts.purchase.error.content}`,
      })
    }
  }

  return (
    <ReceiptContainer>
      <Title>{texts.purchase.receipt}</Title>
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
        {texts.purchase.total}
        <span>$ {finalPrice}</span>
      </Total>
      <ButtonContainer>
        <TextButton onClick={cleanPurchase} content={texts.purchase.cancel} />
        <TextButton
          onClick={executePurchase}
          cta
          content={texts.purchase.execute}
        />
      </ButtonContainer>
    </ReceiptContainer>
  )
}

export default Receipt
