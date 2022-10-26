import React, { useContext, useState, useEffect } from "react"
// DATA STORAGE & TYPES
import { Finances } from "contexts/Finances"
import PartnerPaymentsHistoryInterface from "interfaces/finances/PartnerPaymentsHistory"
import ProductsPurchasedByDateInterface from "interfaces/finances/StorePurchases"
import financesTexts from "strings/finances.json"
import generalTexts from "strings/general.json"
// COMPONENTS & STYLING
import FreePassCard from "./FreePassCard"
import LessonsCard from "./LessonsCard"
import {
  Container,
  FinalProfit,
  Card,
  CardsContainer,
  Title,
  Earnings,
} from "./styles"

function BoulderView() {
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

  const [dayPacks, setDayPacks] = useState<number[]>([])
  const [lessonPacks, setLessonPacks] = useState<number[]>([])

  const reestructureDataForDays = () => {
    const finalEarningsForDays = {
      individualEarningsCash: 0,
      individualEarningsMP: 0,
      individualDaysSold: 0,
    }

    const filterIndividualPayments = partnerPaymentsByDate.filter(
      (partnerPayment: PartnerPaymentsHistoryInterface) =>
        partnerPayment.item_id === 2,
    )

    setDayPacks([
      filterIndividualPayments.filter(
        purchase => purchase.amount_of_items === 4,
      ).length,
      filterIndividualPayments.filter(
        purchase => purchase.amount_of_items === 8,
      ).length,
    ])

    filterIndividualPayments.map((payment: PartnerPaymentsHistoryInterface) => {
      finalEarningsForDays.individualDaysSold += payment.amount_of_items
      if (payment.payment_method_id === 1) {
        finalEarningsForDays.individualEarningsCash += payment.profit
      } else {
        finalEarningsForDays.individualEarningsMP += payment.profit
      }
      return 0
    })

    const finalEarningsForDaysIndividual = {
      storeEarningsCash: 0,
      storeEarningsMP: 0,
      storeDaysSold: 0,
    }

    const filterStorePayments = boulderProductsPurchasedByDate.filter(
      (storePayment: ProductsPurchasedByDateInterface) =>
        storePayment.product_id === 1 || storePayment.product_id === 2,
    )

    filterStorePayments.map((payment: ProductsPurchasedByDateInterface) => {
      finalEarningsForDaysIndividual.storeDaysSold += payment.amount_of_items
      if (payment.payment_method_id === 1) {
        finalEarningsForDaysIndividual.storeEarningsCash += payment.profit
      } else {
        finalEarningsForDaysIndividual.storeEarningsMP += payment.profit
      }

      return 0
    })

    const newArray = boulderPurchasesViewData
    newArray[0] = {
      name: `${financesTexts.day_pass}`,
      earnings_cash:
        finalEarningsForDays.individualEarningsCash +
        finalEarningsForDaysIndividual.storeEarningsCash,
      earnings_mp:
        finalEarningsForDays.individualEarningsMP +
        finalEarningsForDaysIndividual.storeEarningsMP,
      amount_of_days_sold:
        finalEarningsForDaysIndividual.storeDaysSold +
        finalEarningsForDays.individualDaysSold,
    }

    setDaysPurchased({
      store: finalEarningsForDaysIndividual.storeDaysSold,
      partner: finalEarningsForDays.individualDaysSold,
    })
  }

  const setLessonsData = () => {
    const filterLessons = partnerPaymentsByDate.filter(
      purchase => purchase.item_id === 4,
    )
    const filterFourPack = filterLessons.filter(
      lesson => lesson.amount_of_items === 4,
    )
    const filterEightPack = filterLessons.filter(
      lesson => lesson.amount_of_items === 8,
    )

    setLessonPacks([filterFourPack.length, filterEightPack.length])
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
    const finalEarningsForRentedShoes = {
      storeEarningsCash: 0,
      storeEarningsMP: 0,
      storeShoesRented: 0,
    }

    const filterStorePayments = boulderProductsPurchasedByDate.filter(
      (storePayment: ProductsPurchasedByDateInterface) =>
        storePayment.product_id === 3,
    )

    filterStorePayments.map((payment: ProductsPurchasedByDateInterface) => {
      finalEarningsForRentedShoes.storeShoesRented += payment.amount_of_items
      if (payment.payment_method_id === 1) {
        finalEarningsForRentedShoes.storeEarningsCash += payment.profit
      } else {
        finalEarningsForRentedShoes.storeEarningsMP += payment.profit
      }

      return 0
    })

    const newArray = boulderPurchasesViewData
    newArray[4] = {
      name: `${financesTexts.shoes}`,
      earnings_cash: finalEarningsForRentedShoes.storeEarningsCash,
      earnings_mp: finalEarningsForRentedShoes.storeEarningsMP,
      amount_of_shoes_rented: finalEarningsForRentedShoes.storeShoesRented,
    }

    setBoulderPurchasesViewData(newArray)

    let finalCash = 0
    newArray.map(item => {
      finalCash += item.earnings_cash
      return 0
    })

    let finalDigital = 0
    newArray.map(item => {
      finalDigital += item.earnings_mp
      return 0
    })

    setFinalEargninsBoulder({
      cash: finalCash,
      mp: finalDigital,
    })
  }

  useEffect(() => {
    reestructureDataForDays()
    fillDataForOtherThanDays()
    fillDataForRentedShoes()
    setLessonsData()
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
        <FreePassCard
          earningsCash={boulderPurchasesViewData[0].earnings_cash}
          earningsDigital={boulderPurchasesViewData[0].earnings_mp}
          amountOfSells={boulderPurchasesViewData[0].amount_of_days_sold}
          byStore={daysPurchased.store}
          byClient={daysPurchased.partner}
          packs={dayPacks}
          people={partnerPaymentsByDate.length + daysPurchased.store}
        />
        <LessonsCard
          earningsCash={boulderPurchasesViewData[3].earnings_cash}
          earningsDigital={boulderPurchasesViewData[3].earnings_mp}
          amountOfSells={boulderPurchasesViewData[3].amount_of_lessons_sold}
          packs={lessonPacks}
          nonPacks={
            boulderPurchasesViewData[3].amount_of_lessons_sold -
            (lessonPacks[0] * 4 + lessonPacks[1] * 8)
          }
        />

        <Card>
          <Title className="month">{financesTexts.month.toUpperCase()}</Title>
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
          <Title className="combo">{financesTexts.combo.toUpperCase()}</Title>
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
          <Title className="shoes">{financesTexts.shoes.toUpperCase()}</Title>
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
            <p className="asistencies">
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
