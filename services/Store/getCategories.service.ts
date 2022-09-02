import axios from "axios"

const getCategories = async () => {
  const axiosHeader = {
    headers: {
      "Content-Type": "application/json",
    },
  }
  const res = await axios.get(
    `https://v-11-backend.vercel.app/categories`,
    axiosHeader,
  )
  return res.data
}

export default getCategories
