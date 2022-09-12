/* eslint-disable no-await-in-loop */
import React, { useContext, useState, useEffect } from "react"
import texts from "strings/store.json"
import createPurchase from "services/Store/createPurchase.service"
import {
  getProductPurchasesByMonth,
  editProductPurchase,
  createProductPurchase,
} from "services/Store/productPurchases.service"
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
    months,
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

  const executePurchase = async () => {
    let success = false

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
        success = true
      } else {
        success = false
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
        success = true
      } else {
        success = false
      }

      //  CREAR PRODUCT PURCHASE
      const thisMonth = today.getMonth() + 1
      const checkIfHasMonths = await getProductPurchasesByMonth(
        thisMonth,
        purchase[i].product_id,
      )
      const finalPriceForProfit = purchase[i].final_price - bodyPurchase.cost // este valor esta multiplicado por la cantidad

      if (checkIfHasMonths.data.length) {
        const bodyProductPurchase = {
          id: checkIfHasMonths.data[0].id,
          month_name: checkIfHasMonths.data[0].month_name,
          month_id: checkIfHasMonths.data[0].month_id,
          product_id: checkIfHasMonths.data[0].product_id,
          product_name: checkIfHasMonths.data[0].product_name,
          amount_of_sales:
            checkIfHasMonths.data[0].amount_of_sales +
            purchase[i].product_amount,
          profit: checkIfHasMonths.data[0].profit + finalPriceForProfit,
        }
        await editProductPurchase(bodyProductPurchase)
      } else {
        const bodyProductPurchase = {
          id: 0,
          month_name: months.filter(m => m.id === thisMonth)[0].display_name,
          month_id: thisMonth,
          product_id: purchase[i].product_id,
          product_name: purchase[i].product_name,
          amount_of_sales: purchase[i].product_amount,
          profit: finalPriceForProfit,
        }
        await createProductPurchase(bodyProductPurchase)
      }
    }

    if (success) {
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
              <Item key={pur.product_id}>
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
