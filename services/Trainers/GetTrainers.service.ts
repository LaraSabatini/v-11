import axios from "axios"
import axiosHeader from "services/axiosHeader"

const getTrainers = async () => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_HOST}/trainers`,
    axiosHeader,
  )
  return res.data
}

export default getTrainers
