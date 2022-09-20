import axios from "axios"

const editPartnerPayment = async (body: {
  id: number
  partner_id: number
  partner_name: string
  partner_last_name: string
  combo: number
  time_paid: number
  time_paid_unit: number
  clases_paid: number
  payment_method_id: number
  payment_method_name: string
  price_paid: number
  date: string
  payment_expire_date: string
  days_and_hours: number[] | string
}) => {
  const res = await axios.put(
    `https://v-11-backend.vercel.app/partnersPayment/${body.id}`,
    body,
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  )
  return res.data
}

export default editPartnerPayment
