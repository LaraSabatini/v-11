import axios from "axios"

const createPartnerPayment = async (body: {
  id: number
  partner_id: number
  partner_name: string
  partner_last_name: string
  combo: number
  time_paid: number
  time_paid_unit: number
  clases_paid: number
  trainer_id: number
  trainer_name: string
  payment_method_id: number
  payment_method_name: string
  price_paid: number
  date: string
}) => {
  const axiosHeader = {
    headers: {
      "Content-Type": "application/json",
    },
  }

  const data = await axios
    .post("https://v-11-backend.vercel.app/partnersPayment", body, axiosHeader)
    .then(response => {
      const res = response.data
      return res
    })
    .catch(err => {
      const res = err.response
      return res
    })
  return data
}

export default createPartnerPayment
