import axios from "axios"

export const getAllWorkingHours = async (page: number) => {
  const axiosHeader = {
    headers: {
      "Content-Type": "application/json",
    },
  }
  const res = await axios.get(
    `https://v-11-backend.vercel.app/workingHours?page=${page}`,
    axiosHeader,
  )
  return res.data
}

export const getByWeek = async (week_id: number, page: number) => {
  const axiosHeader = {
    headers: {
      "Content-Type": "application/json",
    },
  }
  const res = await axios.get(
    `https://v-11-backend.vercel.app/workingHours/weekId=${week_id}page=${page}`,
    axiosHeader,
  )
  return res.data
}

export const createWorkingHours = async (body: {
  id: number
  date: string
  user_id: number
  user_name: string
  working_hours_range: string
  amount_of_hours_worked: number
  week_id: number
}) => {
  const axiosHeader = {
    headers: {
      "Content-Type": "application/json",
    },
  }

  const data = await axios
    .post("https://v-11-backend.vercel.app/workingHours", body, axiosHeader)
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

export const updateWorkingHours = async (body: {
  id: number
  date: string
  user_id: number
  user_name: string
  working_hours_range: string
  amount_of_hours_worked: number
  week_id: number
}) => {
  const res = await axios.put(
    `https://v-11-backend.vercel.app/workingHours/${body.id}`,
    body,
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  )
  return res.data
}

export const workingHoursPartner = async (id: number) => {
  const axiosHeader = {
    headers: {
      "Content-Type": "application/json",
    },
  }
  const res = await axios.delete(
    `https://v-11-backend.vercel.app/workingHours/${id}`,
    axiosHeader,
  )
  return res.data
}
