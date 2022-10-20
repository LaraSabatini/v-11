import axios from "axios"
import axiosHeader from "services/axiosHeader"

const getBrands = async () => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_HOST}/brands`,
    axiosHeader,
  )
  return res.data
}

export default getBrands
