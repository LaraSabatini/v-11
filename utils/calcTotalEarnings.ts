import { getStorePurchasesByDate } from "services/Store/storePurchases.service"
import ProductsPurchasedByDateInterface from "interfaces/finances/StorePurchases"
import { getBoulderPurchaseByDate } from "services/Finances/Bouderpurchases.service"
import { searchDigitalPaymentByDate } from "services/Finances/DigitalPayments.service"
import PartnerPaymentsHistoryInterface from "interfaces/finances/PartnerPaymentsHistory"
import { day, month, year } from "const/time"

const calcTotalEarnings = async () => {
  const today = `${day}-${month}-${year}`
  const productPurchasesCall = await getStorePurchasesByDate(today)

  const getBoulderPaymentsCall = await getBoulderPurchaseByDate(today)

  const digitalPaymentByDateCall = await searchDigitalPaymentByDate(today)

  const cashEarningsFromStore = productPurchasesCall.data.filter(
    (purchase: ProductsPurchasedByDateInterface) =>
      purchase.payment_method_id === 1,
  )
  let cashEarningsFinal = 0
  cashEarningsFromStore.map(p => {
    cashEarningsFinal += p.profit
    return 0
  })
  const cashEarningsFromBoulderPayments = getBoulderPaymentsCall.data.filter(
    (purchase: PartnerPaymentsHistoryInterface) =>
      purchase.payment_method_id === 1,
  )

  let cashEarningsFinalFromBoulder = 0
  cashEarningsFromBoulderPayments.map(p => {
    cashEarningsFinalFromBoulder += p.profit
    return 0
  })

  let mpEarningsFinal = 0
  digitalPaymentByDateCall.data.map(p => {
    mpEarningsFinal += p.total_profit
    return 0
  })

  const earnings = {
    cash: cashEarningsFinal + cashEarningsFinalFromBoulder,
    mp: mpEarningsFinal,
  }

  return earnings
}

export default calcTotalEarnings
