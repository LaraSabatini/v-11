import axios from "axios"
import axiosHeader from "services/axiosHeader"

const apiURL = `${process.env.NEXT_PUBLIC_API_HOST}/sendEmail/send-email`

const sendEmail = async (body: {
  recipients: { email: string }[]
  subject: string
  text: string
  category: string
}) => {
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

export default sendEmail
