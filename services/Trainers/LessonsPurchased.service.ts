import axios from "axios"

export const getAllLessonsPurchased = async (page: number) => {
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

export const getLessonsByWeek = async (week_id: number) => {
  const axiosHeader = {
    headers: {
      "Content-Type": "application/json",
    },
  }
  const res = await axios.get(
    `https://v-11-backend.vercel.app/lessonsPurchased/week=${week_id}`,
    axiosHeader,
  )
  return res.data
}

export const createLessonPurchased = async (body: {
  id: number
  lessons_date: string
  shift: "AM" | "PM"
  partner_id: number
  parnter_name: string
  partner_last_name: string
  trainer_id: number
  trainer_name: string
  week_id: number
}) => {
  const axiosHeader = {
    headers: {
      "Content-Type": "application/json",
    },
  }

  const data = await axios
    .post("https://v-11-backend.vercel.app/lessonsPurchased", body, axiosHeader)
    .then(response => {
      const res = response.data
      return res
    })
    .catch(err => {
      const res = err.response
      return res
    })
  return data
}

export const editLessonDate = async (body: {
  id: number
  lessons_date: string
  shift: "AM" | "PM"
  partner_id: number
  parnter_name: string
  partner_last_name: string
  trainer_id: number
  trainer_name: string
  week_id: number
}) => {
  const res = await axios.put(
    `https://v-11-backend.vercel.app/lessonsPurchased/${body.id}`,
    body,
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  )
  return res.data
}
