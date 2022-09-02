import axios from "axios"

const getTrainers = async () => {
  const axiosHeader = {
    headers: {
      "Content-Type": "application/json",
    },
  }
  const res = await axios.get(
    `https://v-11-backend.vercel.app/trainers`,
    axiosHeader,
  )
  return res.data
}

export default getTrainers
