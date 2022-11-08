import PartnerPaymentsHistoryInterface from "interfaces/finances/PartnerPaymentsHistory"

const fillData = (
  id: number,
  partnerPaymentsByDate: PartnerPaymentsHistoryInterface[],
) => {
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
export default fillData
