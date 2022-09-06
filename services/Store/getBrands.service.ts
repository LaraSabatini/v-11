import axios from "axios"

const getBrands = async () => {
  const axiosHeader = {
    headers: {
      "Content-Type": "application/json",
    },
  }
  const res = await axios.get(
    `https://v-11-backend.vercel.app/brands`,
    axiosHeader,
  )
  return res.data
}

export default getBrands
