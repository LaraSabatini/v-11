import axios from "axios"

const searchPartner = async (search: string, page: number) => {
  const axiosHeader = {
    headers: {
      "Content-Type": "application/json",
    },
  }
  const res = await axios.get(
    `https://v-11-backend.vercel.app/partners/${search}?page=${page}`,
    axiosHeader,
  )
  return res.data
}

export default searchPartner
