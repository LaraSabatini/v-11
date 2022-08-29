import axios from "axios"

const createPartner = async (body: {
  id: number
  name: string
  last_name: string
  identification_number: string
  birth_date: string
  email: string
  membership_start_date: string
  membership_time_paid: string
  payment_expire_date: string
  payment_is_active: number
  created_by: number
  trainer_id: number | null
  free_pass: number
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
