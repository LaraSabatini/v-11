import {
  createPartnerPayment,
  editPartnerPayment,
  getPartnerPaymentsById,
} from "services/Partners/PartnerPayments.service"
import PaymentInterface from "interfaces/partners/PaymentInterface"

export const createPartnerPaymentAction = async (payment: PaymentInterface) => {
  const handlePayment = await createPartnerPayment(payment)
  return handlePayment.message
}

export const editPartnerPaymentAction = async (payment: PaymentInterface) => {
  const editPayment = await editPartnerPayment(payment)
  return editPayment.message
}

export const getPartnerPaymentsByIdAction = async (id: number) => {
  const getPayment = await getPartnerPaymentsById(id)
  return getPayment.data
}
