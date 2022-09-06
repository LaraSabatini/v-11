import axios from "axios"

export const getPurchases = async (page: number) => {
  const axiosHeader = {
    headers: {
      "Content-Type": "application/json",
    },
  }
  const res = await axios.get(
    `https://v-11-backend.vercel.app/purchases?page=${page}`,

    axiosHeader,
  )
  return res.data
}

export const getPurchasesByProduct = async (
  product_id: number,
  page: number,
) => {
  const axiosHeader = {
    headers: {
      "Content-Type": "application/json",
    },
  }
  const res = await axios.get(
    `https://v-11-backend.vercel.app/purchases/item/${product_id}?page=${page}`,

    axiosHeader,
  )
  return res.data
}

export const getPurchasesByDate = async (date: string, page: number) => {
  const axiosHeader = {
    headers: {
      "Content-Type": "application/json",
    },
  }
  const res = await axios.get(
    `https://v-11-backend.vercel.app/purchases/${date}?page=${page}`,

    axiosHeader,
  )
  return res.data
}
