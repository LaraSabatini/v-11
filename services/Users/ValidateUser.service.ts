import axios from "axios"

interface CredentialsInterface {
  name: string
  password: string
}
const validateUser = async (user: CredentialsInterface) => {
  const axiosHeader = {
    headers: {
      "Content-Type": "application/json",
    },
  }
  const res = await axios.get(
    `https://v-11-backend.vercel.app/users/name='${user.name}'&password='${user.password}'`,
    axiosHeader,
  )
  return res.data
}

export default validateUser
