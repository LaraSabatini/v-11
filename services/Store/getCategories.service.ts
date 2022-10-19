import axios from "axios"
import axiosHeader from "services/axiosHeader"

const getCategories = async () => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_HOST}/categories`,
    axiosHeader,
  )
  return res.data
}

export default getCategories
