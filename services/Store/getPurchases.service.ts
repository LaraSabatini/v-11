import axios from "axios"
import axiosHeader from "services/axiosHeader"

const apiURL = `${process.env.NEXT_PUBLIC_API_HOST}/purchases`

export const getPurchases = async (page: number) => {
  const res = await axios.get(
    `${apiURL}?page=${page}`,

    axiosHeader,
  )
  return res.data
}

export const getPurchasesByProduct = async (
  product_id: number,
  page: number,
) => {
  const res = await axios.get(
    `${apiURL}/item/${product_id}?page=${page}`,

    axiosHeader,
  )
  return res.data
}

export const getPurchasesByDate = async (date: string, page: number) => {
  const res = await axios.get(
    `${apiURL}/${date}?page=${page}`,

    axiosHeader,
  )
  return res.data
}
