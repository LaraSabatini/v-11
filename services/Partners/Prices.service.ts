import axios from "axios"
import PricesInterface from "interfaces/partners/PricesInterface"

export const getPrices = async () => {
  const axiosHeader = {
    headers: {
      "Content-Type": "application/json",
    },
  }
  const res = await axios.get(
    `https://v-11-backend.vercel.app/prices`,
    axiosHeader,
  )
  return res.data
}

export const editPrices = async (body: PricesInterface) => {
  const res = await axios.put(
    `https://v-11-backend.vercel.app/prices/${body.id}`,
    body,
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  )
  return res.data
}
