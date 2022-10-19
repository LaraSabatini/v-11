import axios from "axios"
import axiosHeader from "services/axiosHeader"
import ProductInterface from "interfaces/store/ProductInterface"
import defaultPost from "services/defaultPost"

const apiURL = `${process.env.NEXT_PUBLIC_API_HOST}/products`

export const createProduct = async (body: ProductInterface) => {
  const res = await defaultPost(apiURL, body)
  return res
}

export const editProduct = async (body: ProductInterface) => {
  const res = await axios.put(`${apiURL}/${body.id}`, body, axiosHeader)
  return res.data
}

export const getProducts = async (page: number) => {
  const res = await axios.get(`${apiURL}?page=${page}`, axiosHeader)
  return res.data
}

export const searchProducts = async (search: string, page: number) => {
  const res = await axios.get(`${apiURL}/${search}?page=${page}`, axiosHeader)
  return res.data
}

export const productByCategory = async (category_id: string, page: number) => {
  const res = await axios.get(
    `${apiURL}/category/${category_id}?page=${page}`,
    axiosHeader,
  )
  return res.data
}
