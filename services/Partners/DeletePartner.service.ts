import axios from "axios"

const deletePartner = async (id: number) => {
  const axiosHeader = {
    headers: {
      "Content-Type": "application/json",
    },
  }
  const res = await axios.delete(
    `https://v-11-backend.vercel.app/partners/${id}`,
    axiosHeader,
  )
  return res.data
}

export default deletePartner
