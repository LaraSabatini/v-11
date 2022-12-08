import axios from "axios"
import axiosHeader from "services/axiosHeader"
import defaultPost from "services/defaultPost"

const apiURL = `${process.env.NEXT_PUBLIC_API_HOST}/categories`

export const getCategories = async () => {
  const res = await axios.get(`${apiURL}`, axiosHeader)
  return res.data
}

export const createCategory = async (body: { id: number; name: string }) => {
  const res = await defaultPost(apiURL, body)
  return res.message
}
