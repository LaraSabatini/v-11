import axios from "axios"

const getUsers = async () => {
  const axiosHeader = {
    headers: {
      "Content-Type": "application/json",
    },
  }
  const res = await axios.get(
    `https://v-11-backend.vercel.app/users`,
    axiosHeader,
  )
  return res.data
}

export default getUsers
