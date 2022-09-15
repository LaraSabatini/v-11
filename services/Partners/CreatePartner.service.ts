import axios from "axios"

const createPartner = async (body: {
  id: number
  name: string
  last_name: string
  identification_number: string
  birth_date: string
  email: string
  phone: string
  subs: number
  membership_start_date: string
  created_by: number
  free_pass: number
  hours_and_days: number[]
}) => {
  const axiosHeader = {
    headers: {
      "Content-Type": "application/json",
    },
  }

  const data = await axios
    .post("https://v-11-backend.vercel.app/partners", body, axiosHeader)
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

export default createPartner
