import axios from "axios"

export const getBoulderPayments = async () => {
  const axiosHeader = {
    headers: {
      "Content-Type": "application/json",
    },
  }
  const res = await axios.get(
    `https://v-11-backend.vercel.app/boulderPayments`,
    axiosHeader,
  )
  return res.data
}

export const createBoulderPayment = async (body: {
  id: number
  partner_id: number
  combo: number
  time_paid: number
  time_paid_unit: number
  clases_paid: number
  payment_method_id: number
  price_paid: number
  date: Date
}) => {
  const axiosHeader = {
    headers: {
      "Content-Type": "application/json",
    },
  }

  const data = await axios
    .post("https://v-11-backend.vercel.app/boulderPayments", body, axiosHeader)
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
