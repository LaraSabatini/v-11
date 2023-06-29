import axios from "axios"
import axiosHeader from "services/axiosHeader"

const apiURL = `${process.env.NEXT_PUBLIC_API_HOST}/lessonStudents`

const getLessonsByStudent = async (id: number) => {
  const res = await axios.get(`${apiURL}/?id=${id}`, axiosHeader)
  return res.data
}

export default getLessonsByStudent
