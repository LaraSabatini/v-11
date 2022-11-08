/* eslint-disable import/prefer-default-export */
import { getStorePurchasesByDateAction } from "helpers/store"
import {
  getBoulderPurchaseByDateAction,
  searchDigitalPaymentByDateAction,
} from "helpers/payments"
import ProductsPurchasedByDateInterface from "interfaces/finances/StorePurchases"
import PartnerPaymentsHistoryInterface from "interfaces/finances/PartnerPaymentsHistory"
import { day, month, year } from "const/time"

export const calcTotalEarnings = async () => {
  const today = `${day}-${month}-${year}`
  const productPurchasesCall = await getStorePurchasesByDateAction(today)
  const getBoulderPaymentsCall = await getBoulderPurchaseByDateAction(today)
  const digitalPaymentByDateCall = await searchDigitalPaymentByDateAction(today)

  const cashEarningsFromStore = productPurchasesCall.filter(
    (purchase: ProductsPurchasedByDateInterface) =>
      purchase.payment_method_id === 1,
  )
  let cashEarningsFinal = 0
  cashEarningsFromStore.map(p => {
    cashEarningsFinal += p.profit
    return 0
  })
  const cashEarningsFromBoulderPayments = getBoulderPaymentsCall.filter(
    (purchase: PartnerPaymentsHistoryInterface) =>
      purchase.payment_method_id === 1,
  )

  let cashEarningsFinalFromBoulder = 0
  cashEarningsFromBoulderPayments.map(p => {
    cashEarningsFinalFromBoulder += p.profit
    return 0
  })

  let mpEarningsFinal = 0
  digitalPaymentByDateCall.map(p => {
    mpEarningsFinal += p.total_profit
    return 0
  })

  const earnings = {
    cash: cashEarningsFinal + cashEarningsFinalFromBoulder,
    mp: mpEarningsFinal,
  }

  return earnings
}
