import axios from "axios"

const editPartner = async (body: {
  id: number
  name: string
  producer: string
  price: number
  cost: number
  margin: number
  units: string
  category: string
  sub_category: string
  active: number
}) => {
  const res = await axios.put(
    `https://v-11-backend.vercel.app/partners/${body.id}`,
    body,
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  )
  return res.data
}

export default editPartner
