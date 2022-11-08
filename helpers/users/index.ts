import getUsers from "services/Users/GetUsers.service"
import validateUser from "services/Users/ValidateUser.service"

export const getUsersAction = async () => {
  const getData = await getUsers()
  return getData.data
}

export const validateUserAction = async (name: string, password: string) => {
  const getData = await validateUser({ name, password })
  return getData.data
}
