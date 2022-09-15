import axios from "axios"

const editPartner = async (body: {
  id: number
  name: string
  last_name: string
  identification_number: string
  birth_date: string
  email: string
  membership_start_date: string
  created_by: number
  is_student: string
  free_pass: number
}) => {
  const res = await axios.put(
    `https://v-11-backend.vercel.app/partners/${body.id}`,
    body,
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  )
  return res.data
}

export default editPartner
