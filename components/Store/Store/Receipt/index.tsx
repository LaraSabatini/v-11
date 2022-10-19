/* eslint-disable no-await-in-loop */
import React, { useContext, useState, useEffect, useRef } from "react"
// SERVICES
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
// DATA STORAGE & TYPES
import { StoreContext } from "contexts/Store"
import storeTexts from "strings/store.json"
import generalTexts from "strings/general.json"
import ProductInterface from "interfaces/store/ProductInterface"
import { paymentUsers } from "const/finances"
import { months, day, month, year } from "const/time"
import TemporalPurchaseInterface from "interfaces/store/TemporalPurchase"
// COMPONENTS & STYLING
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
    paymentMethodSelected,
    setPaymentMethodSelected,
    paymentUserSelected,
    setPaymentUserSelected,
  } = useContext(StoreContext)

  const [finalPrice, setFinalPrice] = useState<number>(0)

  const paymentUserRef = useRef(null)

  const calculateFinalPurchasePrice = () => {
    let finalPricePaid = 0
    purchase.map((purchaseItem: TemporalPurchaseInterface) => {
      finalPricePaid += purchaseItem.final_price
      return finalPricePaid
    })
    setFinalPrice(finalPricePaid)
  }

  useEffect(() => {
    calculateFinalPurchasePrice()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [purchaseChange, executeCleanPurchase])

  const cleanPurchase = () => {
    setPurchase([])
    setExecuteCleanPurchase(executeCleanPurchase + 1)
  }

  const cleanInitialStates = () => {
    setPaymentMethodSelected(1)
    setPaymentUserSelected(null)
  }

  const executePurchase = async () => {
    let success = false

    for (let i = 0; i < purchase.length; i += 1) {
      const filterProduct = productsList.filter(
        (product: ProductInterface) => product.id === purchase[i].product_id,
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

      const editStockCall = await editProduct(editStockBody)
      success = editStockCall.message === "product updated successfully"

      //  CREAR PRODUCT PURCHASE
      const checkIfPurchasedToday = await getStorePurchasesByDateAndPaymentMethodAndProduct(
        `${day}-${month}-${year}`,
        purchase[i].product_id,
        paymentMethodSelected,
      )

      if (checkIfPurchasedToday.data.length > 0) {
        const editBody = {
          id: checkIfPurchasedToday.data[0].id,
          product_id: checkIfPurchasedToday.data[0].product_id,
          product_name: checkIfPurchasedToday.data[0].product_name,
          amount_of_items:
            checkIfPurchasedToday.data[0].amount_of_items +
            purchase[i].product_amount,
          profit:
            checkIfPurchasedToday.data[0].profit + purchase[i].final_price,
          payment_method_id: paymentMethodSelected,
          date: checkIfPurchasedToday.data[0].date,
        }
        const edit = await editStorePurchase(editBody)
        success = edit.message === "store_payments updated successfully"
      } else {
        const createBody = {
          id: 0,
          product_id: purchase[i].product_id,
          product_name: purchase[i].product_name,
          amount_of_items: purchase[i].product_amount,
          profit: purchase[i].final_price,
          payment_method_id: paymentMethodSelected,
          date: `${day}-${month}-${year}`,
        }

        const createCall = await createStorePurchase(createBody)
        success = createCall.message === "productPurchase created successfully"
      }
    }

    if (paymentMethodSelected === 2) {
      const searchIfExistsCall = await searchByUserAndDate(
        paymentUserSelected.id,
        `${day}-${month}-${year}`,
      )

      if (searchIfExistsCall.data.length > 0) {
        const digitalPaymentBody = {
          id: searchIfExistsCall.data[0].id,
          user_id: searchIfExistsCall.data[0].user_id,
          user_name: searchIfExistsCall.data[0].user_name,
          date: searchIfExistsCall.data[0].date,
          month: searchIfExistsCall.data[0].month,
          month_id: searchIfExistsCall.data[0].month_id,
          total_profit: searchIfExistsCall.data[0].total_profit + finalPrice,
        }

        const editDigitalPaymentCall = await updateDigitalPayment(
          digitalPaymentBody,
        )
        success =
          editDigitalPaymentCall.message === "payment updated successfully"
      } else {
        const digitalPaymentBody = {
          id: 0,
          user_id: paymentUserSelected.id,
          user_name: paymentUserSelected.display_name,
          date: `${day}-${month}-${year}`,
          month: months.filter(m => m.id === parseInt(`${month}`, 10))[0]
            .display_name,
          month_id: parseInt(`${month}`, 10),
          total_profit: finalPrice,
        }

        const createDigitalCall = await createDigitalPayment(digitalPaymentBody)
        success = createDigitalCall.message === "payment created successfully"
      }
    }

    const checkIfProductsAreDailyPass = purchase.filter(
      (product: TemporalPurchaseInterface) =>
        product.product_id === 1 || product.product_id === 2,
    )

    if (checkIfProductsAreDailyPass.length > 0) {
      const paymentBody = {
        id: 0,
        partner_id: 258,
        partner_name: `${storeTexts.daily_pass}`,
        partner_last_name: `${storeTexts.do_not_delete}`,
        combo: 0,
        time_paid: checkIfProductsAreDailyPass[0].product_amount,
        time_paid_unit: 1,
        payment_method_id:
          checkIfProductsAreDailyPass[0].product_id === 1 ? 1 : 2,
        payment_method_name:
          checkIfProductsAreDailyPass[0].product_id === 1
            ? `${generalTexts.payments.cash}`
            : `${generalTexts.payments.digital_abv}`,
        price_paid: checkIfProductsAreDailyPass[0].final_price,
        date: `${day}-${month}-${year}`,
        payment_expire_date: "",
      }

      const createPurchaseCall = await createPartnerPayment(paymentBody)
      success =
        createPurchaseCall.message === "partnerPayment created successfully"
    }

    if (success) {
      setModalSuccess({
        status: "success",
        icon: "IconCheckModal",
        title: `${generalTexts.modalTitles.success}`,
        content: `${storeTexts.purchase.success.content}`,
      })
      cleanInitialStates()
    } else {
      setModalError({
        status: "alert",
        icon: "IconExclamation",
        title: `${generalTexts.modalTitles.error}`,
        content: `${storeTexts.purchase.error.content}`,
      })
      cleanInitialStates()
    }
  }

  useEffect(() => {
    const check = purchase.filter(
      (pur: TemporalPurchaseInterface) => pur.product_id === 2,
    )
    if (check.length > 0) {
      setPaymentMethodSelected(2)
    } else {
      setPaymentMethodSelected(1)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [purchase])

  return (
    <ReceiptContainer>
      <Title>{storeTexts.purchase.receipt}</Title>
      <Products>
        <ScrollView height={190}>
          {purchase &&
            purchase.map((pur: TemporalPurchaseInterface) => (
              <Item key={pur.product_id}>
                <p>{pur.product_name}</p>
                <p>x {pur.product_amount}</p>
              </Item>
            ))}
        </ScrollView>
      </Products>
      <PaymentMethods>
        <RadioButtonsContainer>
          <RadioContainer>
            <RadioButton
              disabled={
                purchase.filter(
                  (product: TemporalPurchaseInterface) =>
                    product.product_id === 2,
                ).length > 0
              }
              value={3}
              checked={paymentMethodSelected === 1}
              onChange={() => {
                setPaymentMethodSelected(1)
                setPaymentUserSelected(null)
              }}
            />
            <span>{generalTexts.payments.cash}</span>
          </RadioContainer>
          <RadioContainer>
            <RadioButton
              disabled={
                purchase.filter(
                  (product: TemporalPurchaseInterface) =>
                    product.product_id === 1,
                ).length > 0
              }
              value={3}
              checked={paymentMethodSelected === 2}
              onChange={() => {
                setPaymentMethodSelected(2)
              }}
            />
            <span>{generalTexts.payments.digital}</span>
          </RadioContainer>
        </RadioButtonsContainer>
        {paymentMethodSelected === 2 && (
          <Autocomplete
            required
            label={generalTexts.payments.digital_user}
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
        {storeTexts.purchase.total}
        <span>$ {finalPrice}</span>
      </Total>
      <ButtonContainer>
        <TextButton
          onClick={cleanPurchase}
          content={generalTexts.actions.cancel}
        />
        <TextButton
          onClick={executePurchase}
          cta
          disabled={paymentMethodSelected === 2 && paymentUserSelected === null}
          content={storeTexts.purchase.execute}
        />
      </ButtonContainer>
    </ReceiptContainer>
  )
}

export default Receipt
