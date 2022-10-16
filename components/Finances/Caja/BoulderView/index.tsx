import React, { useContext, useState, useEffect } from "react"
// DATA STORAGE & TYPES
import { Finances } from "contexts/Finances"
import PartnerPaymentsHistoryInterface from "interfaces/finances/PartnerPaymentsHistory"
import ProductsPurchasedByDateInterface from "interfaces/finances/StorePurchases"
import financesTexts from "strings/finances.json"
import generalTexts from "strings/general.json"
// COMPONENTS & STYLING
import {
  Container,
  FinalProfit,
  Card,
  CardsContainer,
  Title,
  Earnings,
} from "./styles"

const BoulderView = () => {
  const {
    boulderProductsPurchasedByDate,
    partnerPaymentsByDate,
    boulderPurchasesViewData,
    setBoulderPurchasesViewData,
    finalEargninsBoulder,
    setFinalEargninsBoulder,
  } = useContext(Finances)

  const [daysPurchased, setDaysPurchased] = useState({
    store: 0,
    partner: 0,
  })

  const reestructureDataForDays = () => {
    let individualEarningsCash: number = 0
    let individualEarningsMP: number = 0
    let individualDaysSold: number = 0

    const filterIndividualPayments = partnerPaymentsByDate.filter(
      (partnerPayment: PartnerPaymentsHistoryInterface) =>
        partnerPayment.item_id === 2,
    )

    filterIndividualPayments.map((payment: PartnerPaymentsHistoryInterface) => {
      individualDaysSold += payment.amount_of_items
      if (payment.payment_method_id === 1) {
        individualEarningsCash += payment.profit
      } else {
        individualEarningsMP += payment.profit
      }
      return 0
    })

    let storeEarningsCash: number = 0
    let storeEarningsMP: number = 0
    let storeDaysSold: number = 0
    const filterStorePayments = boulderProductsPurchasedByDate.filter(
      (storePayment: ProductsPurchasedByDateInterface) =>
        storePayment.product_id === 1 || storePayment.product_id === 2,
    )

    filterStorePayments.map((payment: ProductsPurchasedByDateInterface) => {
      storeDaysSold += payment.amount_of_items
      if (payment.payment_method_id === 1) {
        storeEarningsCash += payment.profit
      } else {
        storeEarningsMP += payment.profit
      }

      return 0
    })

    const newArray = boulderPurchasesViewData
    newArray[0] = {
      name: `${financesTexts.day_pass}`,
      earnings_cash: individualEarningsCash + storeEarningsCash,
      earnings_mp: individualEarningsMP + storeEarningsMP,
      amount_of_days_sold: individualDaysSold + storeDaysSold,
    }

    setDaysPurchased({
      store: storeDaysSold,
      partner: individualDaysSold,
    })
  }

  const fillData = (id: number) => {
    let individualEarningsCash: number = 0
    let individualEarningsMP: number = 0
    let individualUnitsSold: number = 0

    const filterIndividualPayments = partnerPaymentsByDate.filter(
      (partnerPayment: PartnerPaymentsHistoryInterface) =>
        partnerPayment.item_id === id,
    )

    filterIndividualPayments.map((payment: PartnerPaymentsHistoryInterface) => {
      individualUnitsSold += payment.amount_of_items
      if (payment.payment_method_id === 1) {
        individualEarningsCash += payment.profit
      } else {
        individualEarningsMP += payment.profit
      }
      return 0
    })

    return {
      individualEarningsCash,
      individualEarningsMP,
      individualUnitsSold,
    }
  }

  const fillDataForOtherThanDays = () => {
    const forMonths = fillData(3)
    const forCombos = fillData(1)
    const forLessons = fillData(4)

    const newArray = boulderPurchasesViewData
    newArray[1] = {
      name: `${financesTexts.month}`,
      earnings_cash: forMonths.individualEarningsCash,
      earnings_mp: forMonths.individualEarningsMP,
      amount_of_months_sold: forMonths.individualUnitsSold,
    }

    newArray[2] = {
      name: `${financesTexts.combo}`,
      earnings_cash: forCombos.individualEarningsCash,
      earnings_mp: forCombos.individualEarningsMP,
      amount_of_combos_sold: forCombos.individualUnitsSold,
    }

    newArray[3] = {
      name: `${financesTexts.lessons}`,
      earnings_cash: forLessons.individualEarningsCash,
      earnings_mp: forLessons.individualEarningsMP,
      amount_of_lessons_sold: forLessons.individualUnitsSold,
    }

    setBoulderPurchasesViewData(newArray)
  }

  const fillDataForRentedShoes = () => {
    let storeEarningsCash: number = 0
    let storeEarningsMP: number = 0
    let storeShoesRented: number = 0
    const filterStorePayments = boulderProductsPurchasedByDate.filter(
      (storePayment: ProductsPurchasedByDateInterface) =>
        storePayment.product_id === 3,
    )

    filterStorePayments.map((payment: ProductsPurchasedByDateInterface) => {
      storeShoesRented += payment.amount_of_items
      if (payment.payment_method_id === 1) {
        storeEarningsCash += payment.profit
      } else {
        storeEarningsMP += payment.profit
      }

      return 0
    })

    const newArray = boulderPurchasesViewData
    newArray[4] = {
      name: `${financesTexts.shoes}`,
      earnings_cash: storeEarningsCash,
      earnings_mp: storeEarningsMP,
      amount_of_shoes_rented: storeShoesRented,
    }

    setBoulderPurchasesViewData(newArray)

    setFinalEargninsBoulder({
      cash:
        newArray[0].earnings_cash +
        newArray[1].earnings_cash +
        newArray[2].earnings_cash +
        newArray[3].earnings_cash +
        newArray[4].earnings_cash,
      mp:
        newArray[0].earnings_mp +
        newArray[1].earnings_mp +
        newArray[2].earnings_mp +
        newArray[3].earnings_mp +
        newArray[4].earnings_mp,
    })
  }

  useEffect(() => {
    reestructureDataForDays()
    fillDataForOtherThanDays()
    fillDataForRentedShoes()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boulderProductsPurchasedByDate, partnerPaymentsByDate])

  return (
    <Container>
      <FinalProfit>
        <p>
          <span>{generalTexts.payments.cash}:</span>{" "}
          <b>$ {finalEargninsBoulder.cash}</b>
        </p>
        <p>
          <span>{generalTexts.payments.digital}:</span>{" "}
          <b>$ {finalEargninsBoulder.mp}</b>
        </p>
      </FinalProfit>
      <CardsContainer>
        <Card>
          <Title>{financesTexts.day_pass}.toUpperCase()</Title>
          <Earnings>
            <p>
              {generalTexts.payments.cash}:{" "}
              <b>$ {boulderPurchasesViewData[0].earnings_cash}</b>
            </p>
            <p>
              {generalTexts.payments.digital}:{" "}
              <b>$ {boulderPurchasesViewData[0].earnings_mp}</b>
            </p>
          </Earnings>
          <Earnings>
            <p>
              {financesTexts.sold_pases}:{" "}
              <b>{boulderPurchasesViewData[0].amount_of_days_sold}</b>
            </p>
          </Earnings>
          <Earnings>
            <p>
              • {financesTexts.through_store}: <b>{daysPurchased.store}</b>
            </p>
            <p>
              • {financesTexts.through_clients}: <b>{daysPurchased.partner}</b>
            </p>
          </Earnings>
        </Card>
        <Card>
          <Title>{financesTexts.month}.toUpperCase()</Title>
          <Earnings>
            <p>
              {generalTexts.payments.cash}:{" "}
              <b>$ {boulderPurchasesViewData[1].earnings_cash}</b>
            </p>
            <p>
              {generalTexts.payments.digital}:{" "}
              <b>$ {boulderPurchasesViewData[1].earnings_mp}</b>
            </p>
          </Earnings>
          <Earnings>
            <p>
              {financesTexts.sells}:{" "}
              <b>{boulderPurchasesViewData[1].amount_of_months_sold}</b>
            </p>
          </Earnings>
        </Card>
        <Card>
          <Title>{financesTexts.combo}.toUpperCase()</Title>
          <Earnings>
            <p>
              {generalTexts.payments.cash}:{" "}
              <b>$ {boulderPurchasesViewData[2].earnings_cash}</b>
            </p>
            <p>
              {generalTexts.payments.digital}:{" "}
              <b>$ {boulderPurchasesViewData[2].earnings_mp}</b>
            </p>
          </Earnings>
          <Earnings>
            <p>
              {financesTexts.sells}:{" "}
              <b>{boulderPurchasesViewData[2].amount_of_combos_sold}</b>
            </p>
          </Earnings>
        </Card>
        <Card>
          <Title>{financesTexts.lessons}.toUpperCase()</Title>
          <Earnings>
            <p>
              {generalTexts.payments.cash}:{" "}
              <b>$ {boulderPurchasesViewData[3].earnings_cash}</b>
            </p>
            <p>
              {generalTexts.payments.digital}:{" "}
              <b>$ {boulderPurchasesViewData[3].earnings_mp}</b>
            </p>
          </Earnings>
          <Earnings>
            <p>
              {financesTexts.sells}:{" "}
              <b>{boulderPurchasesViewData[3].amount_of_lessons_sold}</b>
            </p>
          </Earnings>
        </Card>
        <Card>
          <Title className="shoes">{financesTexts.shoes}.toUpperCase()</Title>
          <Earnings>
            <p>
              {generalTexts.payments.cash}:{" "}
              <b>$ {boulderPurchasesViewData[4].earnings_cash}</b>
            </p>
            <p>
              {generalTexts.payments.digital}:{" "}
              <b>$ {boulderPurchasesViewData[4].earnings_mp}</b>
            </p>
          </Earnings>
          <Earnings>
            <p>
              {financesTexts.units_lend}:{" "}
              <b>{boulderPurchasesViewData[4].amount_of_shoes_rented}</b>
            </p>
          </Earnings>
        </Card>
      </CardsContainer>
    </Container>
  )
}

export default BoulderView
