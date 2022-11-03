/* eslint-disable import/prefer-default-export */
import { createBoulderPurchase } from "services/Finances/Boulderpurchases.service"
import PartnerPaymentsHistoryInterface from "interfaces/finances/PartnerPaymentsHistory"

export const createBoulderPurchaseAction = async (
  purchase: PartnerPaymentsHistoryInterface,
) => {
  const handlePurchase = await createBoulderPurchase(purchase)

  return handlePurchase.message === "bouderPayment created successfully"
}
