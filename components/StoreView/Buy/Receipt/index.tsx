/* eslint-disable no-await-in-loop */
import React, { useContext, useRef, useState, useEffect } from "react"
import { StoreContext } from "contexts/Store"
import TemporalPurchaseInterface from "interfaces/store/TemporalPurchase"
import ProductInterface from "interfaces/store/ProductInterface"
import {
  editProductAction,
  getStorePurchasesByDatePMAndProductAction,
  createStorePurchaseAction,
  editStorePurchaseAction,
} from "helpers/store"
import { makeAppropiatePayment } from "helpers/payments"
import { paymentUsers } from "const/finances"
import { months, day, month, year } from "const/time"
import storeTexts from "strings/store.json"
import generalTexts from "strings/general.json"
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

interface Permits {
  canPurchase: boolean
}

function Receipt({ canPurchase }: Permits) {
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
    triggerListUpdate,
    setTriggerListUpdate,
  } = useContext(StoreContext)

  const paymentUserRef = useRef(null)

  const [finalPrice, setFinalPrice] = useState<number>(0)
  const [disabledButton, setDisabledButton] = useState<boolean>(false)

  const cleanInitialStates = () => {
    setPaymentMethodSelected(1)
    setPaymentUserSelected(null)
    setTriggerListUpdate(triggerListUpdate + 1)
  }

  const cleanPurchase = () => {
    setPurchase([])
    setExecuteCleanPurchase(executeCleanPurchase + 1)
  }

  const executePurchase = async () => {
    let success = false
    setDisabledButton(true)

    for (let i = 0; i < purchase.length; i += 1) {
      const filterProduct = productsList.filter(
        (product: ProductInterface) => product.id === purchase[i].product_id,
      )

      const editStockCall = await editProductAction({
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
      })
      success = editStockCall.status === 200

      const checkIfPurchasedToday = await getStorePurchasesByDatePMAndProductAction(
        `${day}-${month}-${year}`,
        purchase[i].product_id,
        paymentMethodSelected,
      )

      if (checkIfPurchasedToday.length > 0) {
        const edit = await editStorePurchaseAction({
          id: checkIfPurchasedToday[0].id,
          product_id: checkIfPurchasedToday[0].product_id,
          product_name: checkIfPurchasedToday[0].product_name,
          amount_of_items:
            checkIfPurchasedToday[0].amount_of_items +
            purchase[i].product_amount,
          profit: checkIfPurchasedToday[0].profit + purchase[i].final_price,
          payment_method_id: paymentMethodSelected,
          date: checkIfPurchasedToday[0].date,
          created_by: parseInt(localStorage.getItem("id"), 10),
        })
        success = edit.status === 200
      } else {
        const createCall = await createStorePurchaseAction({
          id: 0,
          product_id: purchase[i].product_id,
          product_name: purchase[i].product_name,
          amount_of_items: purchase[i].product_amount,
          profit: purchase[i].final_price,
          payment_method_id: paymentMethodSelected,
          date: `${day}-${month}-${year}`,
          created_by: parseInt(localStorage.getItem("id"), 10),
        })
        success = createCall.status === 200
      }
    }

    if (paymentMethodSelected === 2) {
      const executePayment = await makeAppropiatePayment(
        paymentUserSelected.id,
        finalPrice,
        {
          id: 0,
          user_id: paymentUserSelected.id,
          user_name: paymentUserSelected.display_name,
          date: `${day}-${month}-${year}`,
          month: months.filter(m => m.id === parseInt(`${month}`, 10))[0]
            .display_name,
          month_id: parseInt(`${month}`, 10),
          total_profit: finalPrice,
          created_by: parseInt(localStorage.getItem("id"), 10),
        },
      )
      success = executePayment.status === 200
    }

    if (success) {
      setModalSuccess({
        status: "success",
        icon: "IconCheckModal",
        title: `${generalTexts.modalTitles.success}`,
        content: `${storeTexts.purchase.success.content}`,
      })
      cleanInitialStates()
      setDisabledButton(false)
    } else {
      setModalError({
        status: "alert",
        icon: "IconExclamation",
        title: `${generalTexts.modalTitles.error}`,
        content: `${storeTexts.purchase.error.content}`,
      })
      cleanInitialStates()
      setDisabledButton(false)
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
          onClick={() => {
            if (!disabledButton && canPurchase) {
              executePurchase()
            }
          }}
          cta
          disabled={
            (paymentMethodSelected === 2 && paymentUserSelected === null) ||
            disabledButton ||
            !canPurchase
          }
          content={storeTexts.purchase.execute}
        />
      </ButtonContainer>
    </ReceiptContainer>
  )
}

export default Receipt
