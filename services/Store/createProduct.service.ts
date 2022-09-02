import axios from "axios"

const createProduct = async (body: {
  name: string
  brand_id: number
  stock: number
  price: number
  margin: number
  cost: number
  sales_contact_name: string
  sales_contact_information: string
  image: string
  category_id: number
}) => {
  const axiosHeader = {
    headers: {
      "Content-Type": "application/json",
    },
  }

  const data = await axios
    .post("https://v-11-backend.vercel.app/products", body, axiosHeader)
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

export default createProduct
