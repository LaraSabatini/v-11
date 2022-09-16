export default interface PaymentHistoryInterface {
  id: number
  partner_id: number
  combo: number
  time_paid: number
  time_paid_unit: number
  clases_paid: number
  payment_method_id: number
  price_paid: number
  date: Date
}
