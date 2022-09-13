import axios from "axios"

export const getProductPurchases = async (page: number) => {
  const axiosHeader = {
    headers: {
      "Content-Type": "application/json",
    },
  }
  const res = await axios.get(
    `https://v-11-backend.vercel.app/productPurchases?page=${page}`,
    axiosHeader,
  )
  return res.data
}

export const getProductPurchasesByMonthAndProduct = async (
  month_id: number,
  product_id: number,
) => {
  const axiosHeader = {
    headers: {
      "Content-Type": "application/json",
    },
  }
  const res = await axios.get(
    `https://v-11-backend.vercel.app/productPurchases/month=${month_id}&product=${product_id}`,
    axiosHeader,
  )
  return res.data
}

export const getProductPurchasesByMonth = async (month_id: number) => {
  const axiosHeader = {
    headers: {
      "Content-Type": "application/json",
    },
  }
  const res = await axios.get(
    `https://v-11-backend.vercel.app/productPurchases/month=${month_id}`,
    axiosHeader,
  )
  return res.data
}

export const createProductPurchase = async (body: {
  id: number
  month_name: string
  month_id: number
  product_id: number
  product_name: string
  amount_of_sales: number
  profit: number
}) => {
  const axiosHeader = {
    headers: {
      "Content-Type": "application/json",
    },
  }

  const data = await axios
    .post("https://v-11-backend.vercel.app/productPurchases", body, axiosHeader)
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

export const editProductPurchase = async (body: {
  id: number
  month_name: string
  month_id: number
  product_id: number
  product_name: string
  amount_of_sales: number
  profit: number
}) => {
  const res = await axios.put(
    `https://v-11-backend.vercel.app/productPurchases/${body.id}`,
    body,
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  )
  return res.data
}
