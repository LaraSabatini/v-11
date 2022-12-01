import React, { useContext, useEffect } from "react"
import { Lessons } from "contexts/Lessons"
import { GeneralContext } from "contexts/GeneralContext"
import { paymentMethods, paymentUsers } from "const/finances"
import yesOrNoArr from "const/fixedVariables"
import trainerTexts from "strings/trainers.json"
import generalTexts from "strings/general.json"
import Autocomplete from "components/UI/Autocomplete"
import checkDiscountForPartners from "../../../Helpers/checkDiscountForPartners"
import setPriceWithoutDiscount from "../../../Helpers/setPriceWithoutDiscount"
import setPriceWithDiscount from "../../../Helpers/setPriceWithDiscount"
import { LessonsSubGroup, PriceContainer } from "./styles"

function PaymentSection() {
  const {
    paymentMethodSelected,
    setPaymentMethodSelected,
    clientSelected,
    paid,
    setPaid,
    finalPrice,
    setFinalPrice,
    setPaymentUserSelected,
    paysNowRef,
    paymentMethodRef,
    paymentUserRef,
    buyedCombo,
    setBuyedCombo,
    datesSelected,
    amountOfLessons,
    buyedComboRef,
  } = useContext(Lessons)
  const { prices } = useContext(GeneralContext)

  const setFinalPriceFunction = () => {
    const calcFinalPrice = setPriceWithoutDiscount(
      amountOfLessons,
      paymentMethodSelected.id,
      prices,
    )
    setFinalPrice(calcFinalPrice)
  }

  const calculatePrice = async () => {
    const lessonDiscounts = await checkDiscountForPartners(
      clientSelected.id,
      datesSelected,
    )

    const withDiscount = lessonDiscounts.filter(lesson => lesson.hasDiscount)
    const withoutDiscount = lessonDiscounts.filter(
      lesson => !lesson.hasDiscount,
    )
    const priceWithoutDiscount = setPriceWithoutDiscount(
      withoutDiscount.length,
      paymentMethodSelected.id,
      prices,
    )
    const priceWithDiscount = setPriceWithDiscount(
      withDiscount.length,
      paymentMethodSelected,
      prices,
    )

    setFinalPrice(priceWithDiscount + priceWithoutDiscount)
  }

  useEffect(() => {
    if (paid && paymentMethodSelected !== null) {
      if (clientSelected !== null && clientSelected.free_pass === 1) {
        calculatePrice()
      } else {
        setFinalPriceFunction()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentMethodSelected, paid])

  return (
    <LessonsSubGroup>
      {clientSelected !== null && (
        <Autocomplete
          options={yesOrNoArr}
          label={trainerTexts.createPurchase.buyed_combo}
          required
          ref={buyedComboRef}
          width={100}
          onChangeProps={(e: { id: number; display_name: string }) => {
            if (e.id === 1) {
              setBuyedCombo(true)
              setFinalPrice(0)
              setPaid(null)
              setPaymentMethodSelected(null)
            } else {
              setBuyedCombo(false)
              setPaid(null)
              setPaymentMethodSelected(null)
            }
          }}
        />
      )}
      {(!buyedCombo || clientSelected === null) && (
        <Autocomplete
          options={yesOrNoArr}
          label={trainerTexts.createPurchase.paysNow}
          required
          ref={paysNowRef}
          width={100}
          onChangeProps={(e: { id: number; display_name: string }) => {
            if (e.id === 1) {
              setPaid(true)
            } else {
              setPaid(false)
              setFinalPrice(0)
              setPaymentUserSelected(null)
              setPaymentMethodSelected(null)
            }
          }}
        />
      )}
      {((clientSelected !== null && paid && !buyedCombo) ||
        (clientSelected === null && paid)) && (
        <Autocomplete
          options={paymentMethods}
          label={trainerTexts.createPurchase.paymentMethod}
          required
          ref={paymentMethodRef}
          width={100}
          onChangeProps={(e: { id: number; display_name: string }) => {
            setPaymentMethodSelected(e)
            if (e.id === 1) {
              setPaymentUserSelected(null)
            }
          }}
        />
      )}
      {paymentMethodSelected !== null &&
        paymentMethodSelected.id === 2 &&
        paid !== null && (
          <Autocomplete
            options={paymentUsers}
            label={generalTexts.payments.digital_user}
            required
            ref={paymentUserRef}
            width={150}
            onChangeProps={(e: { id: number; display_name: string }) =>
              setPaymentUserSelected(e)
            }
          />
        )}
      <PriceContainer>
        <p>{trainerTexts.createPurchase.total}</p>{" "}
        <p>
          <b>${finalPrice}</b>
        </p>
      </PriceContainer>
    </LessonsSubGroup>
  )
}

export default PaymentSection
