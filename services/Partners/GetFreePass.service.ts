import axios from "axios"

const getFreePassPartners = async (page: number) => {
  const axiosHeader = {
    headers: {
      "Content-Type": "application/json",
    },
  }
  const res = await axios.get(
    `https://v-11-backend.vercel.app/partners/free-pass/1?page=${page}`,
    axiosHeader,
  )
  return res.data
}

export default getFreePassPartners
