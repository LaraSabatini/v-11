import axios from "axios"
import axiosHeader from "services/axiosHeader"
import PartnerPaymentsHistoryInterface from "interfaces/finances/PartnerPaymentsHistory"

const apiURL = `${process.env.NEXT_PUBLIC_API_HOST}/boulderPurchases`

export const getBoulderPurchaseByDate = async (date: string) => {
  const res = await axios.get(`${apiURL}/date=${date}`, axiosHeader)
  return res.data
}

export const createBoulderPurchase = async (
  body: PartnerPaymentsHistoryInterface,
) => {
  const data = await axios
    .post(`${apiURL}`, body, axiosHeader)
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
