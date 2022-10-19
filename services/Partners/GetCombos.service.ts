import axios from "axios"
import axiosHeader from "services/axiosHeader"

const getCombos = async () => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_HOST}/combos`,
    axiosHeader,
  )
  return res.data
}

export default getCombos
