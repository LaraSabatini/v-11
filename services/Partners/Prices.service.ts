import axios from "axios"
import axiosHeader from "services/axiosHeader"
import PricesInterface from "interfaces/partners/PricesInterface"

const apiURL = `${process.env.NEXT_PUBLIC_API_HOST}/prices`

export const getPrices = async () => {
  const res = await axios.get(`${apiURL}`, axiosHeader)
  return res.data
}

export const editPrices = async (body: PricesInterface) => {
  const res = await axios.put(`${apiURL}/${body.id}`, body, axiosHeader)
  return res.data
}
