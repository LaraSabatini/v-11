import axios from "axios"
import StorePurchaseInterface from "interfaces/store/StorePurchase"

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

export const createStorePurchase = async (body: StorePurchaseInterface) => {
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

export const editStorePurchase = async (body: StorePurchaseInterface) => {
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
