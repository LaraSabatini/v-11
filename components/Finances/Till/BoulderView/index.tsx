import React, { useContext, useState, useEffect } from "react"
// DATA STORAGE & TYPES
import { Finances } from "contexts/Finances"
import financesTexts from "strings/finances.json"
import generalTexts from "strings/general.json"
import reestructureDataForDays from "./helpers/reestructureDataForDays"
import setLessonsData from "./helpers/setLessonsData"
import fillDataForOtherThanDays from "./helpers/fillDataForOtherThanDays"
import fillDataForRentedShoes from "./helpers/fillDataForRentedShoes"
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

  const setDataForDays = () => {
    const data = reestructureDataForDays(
      partnerPaymentsByDate,
      boulderProductsPurchasedByDate,
      boulderPurchasesViewData,
    )
    setDayPacks(data.dayPacks)
    setDaysPurchased(data.daysPurchased)
  }

  const setFinalData = () => {
    const finalData = fillDataForRentedShoes(
      boulderProductsPurchasedByDate,
      boulderPurchasesViewData,
    )

    setFinalEargninsBoulder(finalData.finalEarningsBoulder)
    setBoulderPurchasesViewData(finalData.boulderPurchasesViewData)
  }

  useEffect(() => {
    setBoulderPurchasesViewData(
      fillDataForOtherThanDays(partnerPaymentsByDate, boulderPurchasesViewData),
    )
    setFinalData()
    setDataForDays()
    setLessonPacks(setLessonsData(partnerPaymentsByDate))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boulderProductsPurchasedByDate, partnerPaymentsByDate])

  useEffect(() => {
    setBoulderPurchasesViewData(
      fillDataForOtherThanDays(partnerPaymentsByDate, boulderPurchasesViewData),
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [partnerPaymentsByDate, boulderPurchasesViewData])

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
