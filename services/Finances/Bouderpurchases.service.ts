import axios from "axios"
import PartnerPaymentsHistoryInterface from "interfaces/finances/PartnerPaymentsHistory"

export const getBoulderPurchaseByDate = async (date: string) => {
  const axiosHeader = {
    headers: {
      "Content-Type": "application/json",
    },
  }
  const res = await axios.get(
    `https://v-11-backend.vercel.app/boulderPurchases/date=${date}`,
    axiosHeader,
  )
  return res.data
}

export const createBoulderPurchase = async (
  body: PartnerPaymentsHistoryInterface,
) => {
  const axiosHeader = {
    headers: {
      "Content-Type": "application/json",
    },
  }

  const data = await axios
    .post("https://v-11-backend.vercel.app/boulderPurchases", body, axiosHeader)
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
