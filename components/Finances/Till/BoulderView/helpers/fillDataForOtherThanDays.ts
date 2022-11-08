import PartnerPaymentsHistoryInterface from "interfaces/finances/PartnerPaymentsHistory"
import financesTexts from "strings/finances.json"
import fillData from "./fillData"

const fillDataForOtherThanDays = (
  partnerPaymentsByDate: PartnerPaymentsHistoryInterface[],
  boulderPurchasesViewData,
) => {
  const forMonths = fillData(3, partnerPaymentsByDate)
  const forCombos = fillData(1, partnerPaymentsByDate)
  const forLessons = fillData(4, partnerPaymentsByDate)

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

  return newArray
}

export default fillDataForOtherThanDays
