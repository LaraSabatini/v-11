import axios from "axios"
import axiosHeader from "services/axiosHeader"
import defaultPost from "services/defaultPost"
import ClosedTillInterface from "interfaces/finances/ClosedTill"

const apiURL = `${process.env.NEXT_PUBLIC_API_HOST}/closedTill`

export const getTillByDate = async (date: string) => {
  const res = await axios.get(`${apiURL}/date=${date}`, axiosHeader)
  return res.data
}

export const createTillClosure = async (body: ClosedTillInterface) => {
  const res = await defaultPost(apiURL, body)
  return res
}

export const updateDigitalPayment = async (body: ClosedTillInterface) => {
  const res = await axios.put(`${apiURL}/${body.id}`, body, axiosHeader)
  return res.data
}
