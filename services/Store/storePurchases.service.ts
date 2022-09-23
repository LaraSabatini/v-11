import axios from "axios"

export const getProductPurchases = async (page: number) => {
  const axiosHeader = {
    headers: {
      "Content-Type": "application/json",
    },
  }
  const res = await axios.get(
    `https://v-11-backend.vercel.app/storePayments?page=${page}`,
    axiosHeader,
  )
  return res.data
}

export const getStorePurchasesByDateAndPaymentMethodAndProduct = async (
  date: string,
  product_id: number,
  payment_method_id: number,
) => {
  const axiosHeader = {
    headers: {
      "Content-Type": "application/json",
    },
  }
  const res = await axios.get(
    `https://v-11-backend.vercel.app/storePayments/month=${date}&product=${product_id}&payment=${payment_method_id}`,
    axiosHeader,
  )
  return res.data
}

export const getStorePurchasesByDate = async (date: string) => {
  const axiosHeader = {
    headers: {
      "Content-Type": "application/json",
    },
  }
  const res = await axios.get(
    `https://v-11-backend.vercel.app/storePayments/date=${date}`,
    axiosHeader,
  )
  return res.data
}

export const createStorePurchase = async (body: {
  id: number
  product_id: number
  product_name: string
  amount_of_items: number
  profit: number
  payment_method_id: number
  date: string
}) => {
  const axiosHeader = {
    headers: {
      "Content-Type": "application/json",
    },
  }

  const data = await axios
    .post("https://v-11-backend.vercel.app/storePayments", body, axiosHeader)
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

export const editStorePurchase = async (body: {
  id: number
  product_id: number
  product_name: string
  amount_of_items: number
  profit: number
  payment_method_id: number
  date: string
}) => {
  const res = await axios.put(
    `https://v-11-backend.vercel.app/storePayments/${body.id}`,
    body,
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  )
  return res.data
}
