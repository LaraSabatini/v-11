import axios from "axios"
import axiosHeader from "services/axiosHeader"
import ClasesPurchasedInterface from "interfaces/trainers/ClasesPurchasedInterface"
import defaultPost from "services/defaultPost"

const apiURL = `${process.env.NEXT_PUBLIC_API_HOST}/lessonsPurchased`

export const getAllLessonsPurchased = async (page: number) => {
  const res = await axios.get(`${apiURL}?page=${page}`, axiosHeader)
  return res.data
}

export const getLessonsByWeek = async (week_id: number) => {
  const res = await axios.get(`${apiURL}/week=${week_id}`, axiosHeader)
  return res.data
}

export const getLessonsByPartnerAndPaid = async (
  id: number,
  paid: "SI" | "NO" | string,
) => {
  const res = await axios.get(
    `${apiURL}/partner-paid/id=${id}&paid=${paid}`,
    axiosHeader,
  )
  return res.data
}

export const getLessonsByDateAndShift = async (date: string, shift: string) => {
  const res = await axios.get(
    `${apiURL}/date=${date}&shift=${shift}`,
    axiosHeader,
  )
  return res.data
}

export const createLessonPurchase = async (body: ClasesPurchasedInterface) => {
  const res = await defaultPost(apiURL, body)
  return res
}

export const editLesson = async (body: ClasesPurchasedInterface) => {
  const res = await axios.put(`${apiURL}/${body.id}`, body, axiosHeader)
  return res.data
}

export const deleteLessonPurchase = async (id: number) => {
  const res = await axios.delete(`${apiURL}/${id}`, axiosHeader)
  return res.data
}
