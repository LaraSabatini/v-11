import PartnerPaymentsHistoryInterface from "interfaces/finances/PartnerPaymentsHistory"
import ProductsPurchasedByDateInterface from "interfaces/finances/StorePurchases"
import financesTexts from "strings/finances.json"

const reestructureDataForDays = (
  partnerPaymentsByDate: PartnerPaymentsHistoryInterface[],
  boulderProductsPurchasedByDate: ProductsPurchasedByDateInterface[],
  boulderPurchasesViewData?: any,
) => {
  const finalEarningsForDays = {
    individualEarningsCash: 0,
    individualEarningsMP: 0,
    individualDaysSold: 0,
  }

  const filterIndividualPayments = partnerPaymentsByDate.filter(
    (partnerPayment: PartnerPaymentsHistoryInterface) =>
      partnerPayment.item_id === 2,
  )

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

  return {
    dayPacks: [
      filterIndividualPayments.filter(
        purchase => purchase.amount_of_items === 4,
      ).length,
      filterIndividualPayments.filter(
        purchase => purchase.amount_of_items === 8,
      ).length,
    ],
    daysPurchased: {
      store: finalEarningsForDaysIndividual.storeDaysSold,
      partner: finalEarningsForDays.individualDaysSold,
    },
  }
}

export default reestructureDataForDays
