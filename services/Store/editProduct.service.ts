import axios from "axios"

const editProduct = async (body: {
  id: number
  name: string
  brand_id: number
  category_id: number
  stock: number
  price: number
  margin: number
  cost: number
  sales_contact_name: string
  sales_contact_information: string
}) => {
  const res = await axios.put(
    `https://v-11-backend.vercel.app/products/${body.id}`,
    body,
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  )
  return res.data
}

export default editProduct
