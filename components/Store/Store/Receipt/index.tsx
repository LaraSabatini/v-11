/* eslint-disable no-await-in-loop */
import React, { useContext, useState, useEffect, useRef } from "react"
import texts from "strings/store.json"
import {
  getStorePurchasesByDateAndPaymentMethodAndProduct,
  createStorePurchase,
  editStorePurchase,
} from "services/Store/storePurchases.service"
import {
  searchByUserAndDate,
  updateDigitalPayment,
  createDigitalPayment,
} from "services/Finances/DigitalPayments.service"
import { createPartnerPayment } from "services/Partners/PartnerPayments.service"
import { editProduct } from "services/Store/Products.service"
import { StoreContext } from "contexts/Store"
import TextButton from "components/UI/TextButton"
import Autocomplete from "components/UI/Autocomplete"
import ScrollView from "components/UI/ScrollView"
import RadioButton from "components/UI/RadioButton"
import {
  ReceiptContainer,
  Title,
  Total,
  Products,
  Item,
  ButtonContainer,
  RadioContainer,
  RadioButtonsContainer,
  PaymentMethods,
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

  const [paymentMethodSelected, setPaymentMethodSelected] = useState<number>(1)
  const [paymentUserSelected, setPaymentUserSelected] = useState<{
    id: number
    display_name: string
  }>(null)

  const paymentUserRef = useRef(null)

  const paymentUsers = [
    { id: 1, display_name: "Roman" },
    { id: 2, display_name: "Federico" },
    { id: 3, display_name: "Tobias" },
    { id: 4, display_name: "Guillermo" },
    { id: 5, display_name: "Joaco" },
  ]

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
      const filterProduct = productsList.filter(
        product => product.id === purchase[i].product_id,
      )
      const editStockBody = {
        id: purchase[i].product_id,
        stock: filterProduct[0].stock - purchase[i].product_amount,

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
      const checkIfExists = await getStorePurchasesByDateAndPaymentMethodAndProduct(
        `${day}-${month}-${year}`,
        purchase[i].product_id,
        paymentMethodSelected,
      )

      if (checkIfExists.data.length > 0) {
        // editar
        const editBody = {
          id: checkIfExists.data[0].id,
          product_id: checkIfExists.data[0].product_id,
          product_name: checkIfExists.data[0].product_name,
          amount_of_items:
            checkIfExists.data[0].amount_of_items + purchase[i].product_amount,
          profit: checkIfExists.data[0].profit + purchase[i].final_price,
          payment_method_id: paymentMethodSelected,
          date: checkIfExists.data[0].date,
        }
        const edit = await editStorePurchase(editBody)
        if (edit.message === "store_payments updated successfully") {
          success = true
        } else {
          success = false
        }
      } else {
        // crear
        const createBody = {
          id: 0,
          product_id: purchase[i].product_id,
          product_name: purchase[i].product_name,
          amount_of_items: purchase[i].product_amount,
          profit: purchase[i].final_price,
          payment_method_id: paymentMethodSelected,
          date: `${day}-${month}-${year}`,
        }

        const create = await createStorePurchase(createBody)
        if (create.message === "productPurchase created successfully") {
          success = true
        } else {
          success = false
        }
      }

      const checkProducts = purchase.filter(
        product => product.product_id === 12 || product.product_id === 13,
      )

      if (checkProducts.length > 0) {
        for (let num = 0; num < checkProducts.length; num += 1) {
          const paymentBody = {
            id: 0,
            partner_id: 258,
            partner_name: "Pase diario",
            partner_last_name: "No borrar",
            combo: 0,
            time_paid: checkProducts[num].product_amount,
            time_paid_unit: 1,
            clases_paid: 0,
            payment_method_id: checkProducts[num].product_id === 12 ? 1 : 2,
            payment_method_name:
              checkProducts[num].product_id === 12 ? "Efectivo" : "MP",
            price_paid: checkProducts[num].final_price,
            date: `${day}-${month}-${year}`,
            payment_expire_date: "",
            days_and_hours: "",
          }
          const createPurchase = await createPartnerPayment(paymentBody)

          if (
            createPurchase.message === "partnerPayment created successfully"
          ) {
            success = true
          } else {
            success = false
          }
        }
      }

      if (paymentMethodSelected === 2) {
        const searchIfExists = await searchByUserAndDate(
          paymentUserSelected.id,
          `${day}-${month}-${year}`,
        )

        if (searchIfExists.data.length > 0) {
          const digitalPaymentBody = {
            id: searchIfExists.data[0].id,
            user_id: searchIfExists.data[0].user_id,
            user_name: searchIfExists.data[0].user_name,
            date: searchIfExists.data[0].date,
            month: searchIfExists.data[0].month,
            month_id: searchIfExists.data[0].month_id,
            total_profit: searchIfExists.data[0].total_profit + finalPrice,
          }
          const editDigitalPayment = await updateDigitalPayment(
            digitalPaymentBody,
          )
          if (editDigitalPayment.message === "payment updated successfully") {
            success = true
          } else {
            success = false
          }
        } else {
          const digitalPaymentBody = {
            id: 0,
            user_id: paymentUserSelected.id,
            user_name: paymentUserSelected.display_name,
            date: `${day}-${month}-${year}`,
            month: months.filter(m => m.id === today.getMonth() + 1)[0]
              .display_name,
            month_id: today.getMonth() + 1,
            total_profit: finalPrice,
          }
          const createDigital = await createDigitalPayment(digitalPaymentBody)

          if (createDigital.message === "payment created successfully") {
            success = true
          } else {
            success = false
          }
        }
      }

      if (success) {
        setModalSuccess({
          status: "success",
          icon: "IconCheckModal",
          title: `${texts.purchase.success.title}`,
          content: `${texts.purchase.success.content}`,
        })
        setPaymentMethodSelected(1)
        setPaymentUserSelected(null)
      } else {
        setModalError({
          status: "alert",
          icon: "IconExclamation",
          title: `${texts.purchase.error.title}`,
          content: `${texts.purchase.error.content}`,
        })
        setPaymentMethodSelected(1)
        setPaymentUserSelected(null)
      }
    }
  }

  useEffect(() => {
    const check = purchase.filter(p => p.product_id === 13)
    if (check.length > 0) {
      setPaymentMethodSelected(2)
    } else {
      setPaymentMethodSelected(1)
    }
  }, [purchase])

  return (
    <ReceiptContainer>
      <Title>{texts.purchase.receipt}</Title>
      <Products>
        <ScrollView height={190}>
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
        </ScrollView>
      </Products>
      <PaymentMethods>
        <RadioButtonsContainer>
          <RadioContainer>
            <RadioButton
              value={3}
              checked={paymentMethodSelected === 1}
              onChange={() => {
                setPaymentMethodSelected(1)
                setPaymentUserSelected(null)
              }}
            />
            <span>Efectivo</span>
          </RadioContainer>
          <RadioContainer>
            <RadioButton
              value={3}
              checked={paymentMethodSelected === 2}
              onChange={() => {
                setPaymentMethodSelected(2)
              }}
            />
            <span>Mercado Pago</span>
          </RadioContainer>
        </RadioButtonsContainer>
        {paymentMethodSelected === 2 && (
          <Autocomplete
            required
            label="MP User"
            width={150}
            options={paymentUsers}
            ref={paymentUserRef}
            onChangeProps={(e: { id: number; display_name: string }) =>
              setPaymentUserSelected(e)
            }
          />
        )}
      </PaymentMethods>
      <Total>
        {texts.purchase.total}
        <span>$ {finalPrice}</span>
      </Total>
      <ButtonContainer>
        <TextButton onClick={cleanPurchase} content={texts.purchase.cancel} />
        <TextButton
          onClick={executePurchase}
          cta
          disabled={paymentMethodSelected === 2 && paymentUserSelected === null}
          content={texts.purchase.execute}
        />
      </ButtonContainer>
    </ReceiptContainer>
  )
}

export default Receipt
