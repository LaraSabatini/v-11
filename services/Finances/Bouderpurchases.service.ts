import axios from "axios"
import axiosHeader from "services/axiosHeader"
import PartnerPaymentsHistoryInterface from "interfaces/finances/PartnerPaymentsHistory"
import defaultPost from "services/defaultPost"

const apiURL = `${process.env.NEXT_PUBLIC_API_HOST}/boulderPurchases`

export const getBoulderPurchaseByDate = async (date: string) => {
  const res = await axios.get(`${apiURL}/date=${date}`, axiosHeader)
  return res.data
}

export const createBoulderPurchase = async (
  body: PartnerPaymentsHistoryInterface,
) => {
  const res = await defaultPost(apiURL, body)
  return res
}
