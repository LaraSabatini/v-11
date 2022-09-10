import axios from "axios"

const getCombos = async () => {
  const axiosHeader = {
    headers: {
      "Content-Type": "application/json",
    },
  }
  const res = await axios.get(
    `https://v-11-backend.vercel.app/combos`,
    axiosHeader,
  )
  return res.data
}

export default getCombos
