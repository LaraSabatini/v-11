import axios from "axios"
import axiosHeader from "services/axiosHeader"
import {
  CalendarInterface,
  LessonPurchaseInterface,
  LessonTypesInterface,
} from "interfaces/lessons/Calendar"
import defaultPost from "services/defaultPost"

const apiURL = `${process.env.NEXT_PUBLIC_API_HOST}/lessonSchedule`

const getLessonScheduleByDay = async (day: string) => {
  const res = await axios.get(`${apiURL}/schedule?day=${day}`, axiosHeader)
  return res.data
}

const getLessonScheduleByWeek = async (weekId: number) => {
  const res = await axios.get(
    `${apiURL}/schedule/by_week_id?weekId=${weekId}`,
    axiosHeader,
  )
  return res.data
}

const getByPurchaseId = async (id: number) => {
  const res = await axios.get(`${apiURL}/purchases?id=${id}`, axiosHeader)
  return res.data
}

const createLessonSchedule = async (body: CalendarInterface) => {
  const res = await defaultPost(`${apiURL}/schedule`, body)
  return res
}

const updateSchedule = async (body: CalendarInterface) => {
  const res = await axios.put(`${apiURL}/schedule`, body, axiosHeader)
  return res.data
}

const createLessonPurchase = async (body: LessonPurchaseInterface) => {
  const res = await defaultPost(`${apiURL}/purchases`, body)
  return res
}

const getLessonTypes = async () => {
  const res = await axios.get(`${apiURL}/type`, axiosHeader)
  return res.data
}

const createLessonType = async (body: LessonTypesInterface) => {
  const res = await defaultPost(`${apiURL}/type`, body)
  return res
}

const updateLessonType = async (body: LessonTypesInterface) => {
  const res = await axios.put(`${apiURL}/type/edit`, body, axiosHeader)
  return res.data
}

export const getClientsByPurchaseIds = async (body: {
  purchaseIds: number[]
  type: string
}) => {
  const res = await axios.put(`${apiURL}/students`, body, axiosHeader)

  return res.data
}

export {
  getLessonScheduleByDay,
  getByPurchaseId,
  createLessonSchedule,
  updateSchedule,
  createLessonPurchase,
  getLessonScheduleByWeek,
  createLessonType,
  getLessonTypes,
  updateLessonType,
}
