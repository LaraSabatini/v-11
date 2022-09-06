import axios from "axios"

const createPurchase = async (body: {
  id: number
  date: string
  item_id: number
  amount_of_items: number
  cost: number
  margin: number
  final_price: number
}) => {
  const axiosHeader = {
    headers: {
      "Content-Type": "application/json",
    },
  }

  const data = await axios
    .post("https://v-11-backend.vercel.app/purchases", body, axiosHeader)
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

export default createPurchase
