export default interface PaymentInterface {
  id: number
  partner_id: number
  partner_name: string
  partner_last_name: string
  combo: number
  time_paid: number
  time_paid_unit: number
  payment_method_id: number
  payment_method_name: string
  price_paid: number
  date: string
  payment_expire_date: string
}
