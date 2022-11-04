import PartnerPaymentsHistoryInterface from "interfaces/finances/PartnerPaymentsHistory"
import ProductsPurchasedByDateInterface from "interfaces/finances/StorePurchases"
import {
  getBoulderPurchaseByDateAction,
  searchDigitalPaymentByDateAction,
} from "helpers/payments"
import { getStorePurchasesByDateAction } from "helpers/store"

const fillDataForTotalEarnings = async (tillDateSelected: string) => {
  const productPurchasesCall = await getStorePurchasesByDateAction(
    tillDateSelected,
  )

  const filterProducts =
    productPurchasesCall.length > 0
      ? productPurchasesCall.filter(
          (purchase: ProductsPurchasedByDateInterface) =>
            purchase.product_id !== 1 &&
            purchase.product_id !== 2 &&
            purchase.product_id !== 3,
        )
      : []

  const filterBoulderProducts =
    productPurchasesCall.length > 0
      ? productPurchasesCall.filter(
          (purchase: ProductsPurchasedByDateInterface) =>
            purchase.product_id === 1 ||
            purchase.product_id === 2 ||
            purchase.product_id === 3,
        )
      : []

  const getBoulderPaymentsCall = await getBoulderPurchaseByDateAction(
    tillDateSelected,
  )

  const digitalPaymentByDateCall = await searchDigitalPaymentByDateAction(
    tillDateSelected,
  )

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

  const response = {
    totalEarnings: {
      cash: cashEarningsFinal + cashEarningsFinalFromBoulder,
      mp: mpEarningsFinal,
    },
    productsPurchasedByDate: filterProducts,
    boulderProductsPurchasedByDate: filterBoulderProducts,
    partnerPaymentsByDate: getBoulderPaymentsCall,
    digitalPaymentsList: digitalPaymentByDateCall,
  }

  return response
}

export default fillDataForTotalEarnings
