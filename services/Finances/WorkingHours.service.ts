import axios from "axios"
import axiosHeader from "services/axiosHeader"
import WorkingHoursInterface from "interfaces/finances/WorkingHours"

const apiURL = `${process.env.NEXT_PUBLIC_API_HOST}/workingHours`

export const getAllWorkingHours = async (page: number) => {
  const res = await axios.get(`${apiURL}?page=${page}`, axiosHeader)
  return res.data
}

export const getWokingHoursByWeek = async (week_id: number, page: number) => {
  const res = await axios.get(
    `${apiURL}/weekId=${week_id}page=${page}`,
    axiosHeader,
  )
  return res.data
}

export const createWorkingHours = async (body: WorkingHoursInterface) => {
  const data = await axios
    .post(`${apiURL}`, body, axiosHeader)
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

export const updateWorkingHours = async (body: WorkingHoursInterface) => {
  const res = await axios.put(`${apiURL}/${body.id}`, body, axiosHeader)
  return res.data
}

export const workingHoursPartner = async (id: number) => {
  const res = await axios.delete(`${apiURL}/${id}`, axiosHeader)
  return res.data
}
