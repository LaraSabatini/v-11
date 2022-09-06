import axios from "axios"

const getStudents = async (page: number) => {
  const axiosHeader = {
    headers: {
      "Content-Type": "application/json",
    },
  }
  const res = await axios.get(
    `https://v-11-backend.vercel.app/partners/students/0?page=${page}`,
    axiosHeader,
  )
  return res.data
}

export default getStudents
