import axios from "axios"

const getPrices = async () => {
  const axiosHeader = {
    headers: {
      "Content-Type": "application/json",
    },
  }
  const res = await axios.get(
    `https://v-11-backend.vercel.app/prices`,
    axiosHeader,
  )
  return res.data
}

export default getPrices
