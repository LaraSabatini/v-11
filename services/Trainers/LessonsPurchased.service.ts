import axios from "axios"

const getAllLessonsPurchased = async (page: number) => {
  const axiosHeader = {
    headers: {
      "Content-Type": "application/json",
    },
  }
  const res = await axios.get(
    `https://v-11-backend.vercel.app/lessonsPurchased?page=${page}`,
    axiosHeader,
  )
  return res.data
}

export default getAllLessonsPurchased
