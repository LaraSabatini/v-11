import axios from "axios"

export const getBoulderPurchaseByDate = async (date: string) => {
  const axiosHeader = {
    headers: {
      "Content-Type": "application/json",
    },
  }
  const res = await axios.get(
    `https://v-11-backend.vercel.app/boulderPurchases/date=${date}`,
    axiosHeader,
  )
  return res.data
}

export const createBoulderPurchase = async (body: {
  id: number
  date: string
  item_id: number
  item_name: string
  amount_of_items: number
  profit: number
  payment_method_id: number
}) => {
  const axiosHeader = {
    headers: {
      "Content-Type": "application/json",
    },
  }

  const data = await axios
    .post("https://v-11-backend.vercel.app/boulderPurchases", body, axiosHeader)
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
