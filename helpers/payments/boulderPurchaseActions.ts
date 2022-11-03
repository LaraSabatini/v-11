import {
  createBoulderPurchase,
  getBoulderPurchaseByDate,
} from "services/Finances/Boulderpurchases.service"
import PartnerPaymentsHistoryInterface from "interfaces/finances/PartnerPaymentsHistory"

export const createBoulderPurchaseAction = async (
  purchase: PartnerPaymentsHistoryInterface,
) => {
  const handlePurchase = await createBoulderPurchase(purchase)
  return handlePurchase.message === "bouderPayment created successfully"
}

export const getBoulderPurchaseByDateAction = async (date: string) => {
  const getPurchases = await getBoulderPurchaseByDate(date)
  return getPurchases.data
}
