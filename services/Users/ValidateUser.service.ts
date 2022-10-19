import axios from "axios"
import axiosHeader from "services/axiosHeader"

interface CredentialsInterface {
  name: string
  password: string
}
const validateUser = async (user: CredentialsInterface) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_HOST}/users/name='${user.name}'&password='${user.password}'`,
    axiosHeader,
  )
  return res.data
}

export default validateUser
