import axios from "axios"

export const getSchedule = async () => {
  const axiosHeader = {
    headers: {
      "Content-Type": "application/json",
    },
  }
  const res = await axios.get(
    `https://v-11-backend.vercel.app/schedule`,
    axiosHeader,
  )
  return res.data
}

export const editSchedule = async (body: { id: number; day_and_hour }) => {
  const res = await axios.put(
    `https://v-11-backend.vercel.app/schedule/${body.id}`,
    body,
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  )
  return res.data
}

export const createShedule = async (body: { id: number; day_and_hour }) => {
  const axiosHeader = {
    headers: {
      "Content-Type": "application/json",
    },
  }

  const data = await axios
    .post("https://v-11-backend.vercel.app/schedule", body, axiosHeader)
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
