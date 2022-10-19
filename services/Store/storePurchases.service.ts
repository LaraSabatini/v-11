import axios from "axios"
import axiosHeader from "services/axiosHeader"
import StorePurchaseInterface from "interfaces/store/StorePurchase"

const apiURL = `${process.env.NEXT_PUBLIC_API_HOST}/storePayments`

export const getProductPurchases = async (page: number) => {
  const res = await axios.get(`${apiURL}?page=${page}`, axiosHeader)
  return res.data
}

export const getStorePurchasesByDateAndPaymentMethodAndProduct = async (
  date: string,
  product_id: number,
  payment_method_id: number,
) => {
  const res = await axios.get(
    `${apiURL}/month=${date}&product=${product_id}&payment=${payment_method_id}`,
    axiosHeader,
  )
  return res.data
}

export const getStorePurchasesByDate = async (date: string) => {
  const res = await axios.get(`${apiURL}/date=${date}`, axiosHeader)
  return res.data
}

export const createStorePurchase = async (body: StorePurchaseInterface) => {
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

export const editStorePurchase = async (body: StorePurchaseInterface) => {
  const res = await axios.put(`${apiURL}/${body.id}`, body, axiosHeader)
  return res.data
}
