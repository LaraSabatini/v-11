import axios from "axios"

const editPrices = async (body: {
  id: number
  name: string
  price_cash: number
  price_mp: number
}) => {
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

export default editPrices
