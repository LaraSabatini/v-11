import axios from "axios"
import ClasesPurchasedInterface from "interfaces/trainers/ClasesPurchasedInterface"

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

export const getLessonsByDateAndShift = async (date: string, shift: string) => {
  const axiosHeader = {
    headers: {
      "Content-Type": "application/json",
    },
  }
  const res = await axios.get(
    `https://v-11-backend.vercel.app/lessonsPurchased/date=${date}&shift=${shift}`,
    axiosHeader,
  )
  return res.data
}

export const createLessonPurchase = async (body: ClasesPurchasedInterface) => {
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

export const editLessonDate = async (body: ClasesPurchasedInterface) => {
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