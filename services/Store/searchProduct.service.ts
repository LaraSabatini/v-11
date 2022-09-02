import axios from "axios"

export const searchProducts = async (search: string, page: number) => {
  const axiosHeader = {
    headers: {
      "Content-Type": "application/json",
    },
  }
  const res = await axios.get(
    `https://v-11-backend.vercel.app/products/${search}?page=${page}`,
    axiosHeader,
  )
  return res.data
}

export const productByCategory = async (category_id: string, page: number) => {
  const axiosHeader = {
    headers: {
      "Content-Type": "application/json",
    },
  }
  const res = await axios.get(
    `https://v-11-backend.vercel.app/products/${category_id}?page=${page}`,
    axiosHeader,
  )
  return res.data
}
