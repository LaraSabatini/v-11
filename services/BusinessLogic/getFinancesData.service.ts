import axios from "axios"
import axiosHeader from "services/axiosHeader"

const getFinancesData = async (date: string) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_HOST}/businessLogic/finances/date=${date}`,
    axiosHeader,
  )
  return res.data
}

export default getFinancesData
