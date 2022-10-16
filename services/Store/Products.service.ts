import axios from "axios"
import ProductInterface from "interfaces/store/ProductInterface"

export const createProduct = async (body: ProductInterface) => {
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

export const editProduct = async (body: ProductInterface) => {
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

export const getProducts = async (page: number) => {
  const axiosHeader = {
    headers: {
      "Content-Type": "application/json",
    },
  }
  const res = await axios.get(
    `https://v-11-backend.vercel.app/products?page=${page}`,
    axiosHeader,
  )
  return res.data
}

export const searchProducts = async (search: string, page: number) => {
  const axiosHeader = {
    headers: {
      "Content-Type": "application/json",
    },
  }
  const res = await axios.get(
    `https://v-11-backend.vercel.app/products/${search}?page=${page}`,
    axiosHeader,
  )
  return res.data
}

export const productByCategory = async (category_id: string, page: number) => {
  const axiosHeader = {
    headers: {
      "Content-Type": "application/json",
    },
  }
  const res = await axios.get(
    `https://v-11-backend.vercel.app/products/category/${category_id}?page=${page}`,
    axiosHeader,
  )
  return res.data
}
