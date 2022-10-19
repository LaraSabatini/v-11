import axios from "axios"
import axiosHeader from "services/axiosHeader"

const getUsers = async () => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_HOST}/users`,
    axiosHeader,
  )
  return res.data
}

export default getUsers
