import axios from "axios"
import axiosHeader from "services/axiosHeader"
import MPUserPayment from "interfaces/finances/MPUserPayments"
import defaultPost from "services/defaultPost"

const apiURL = `${process.env.NEXT_PUBLIC_API_HOST}/digitalPayments`

export const getAllDigitalPayments = async (page: number) => {
  const res = await axios.get(`${apiURL}?page=${page}`, axiosHeader)
  return res.data
}

export const searchDigitalPaymentByUserAndDate = async (
  user_id: number,
  date: string,
) => {
  const res = await axios.get(
    `${apiURL}/by-user-date/user_id=${user_id}&date=${date}`,
    axiosHeader,
  )
  return res.data
}

export const searchDigitalPaymentByUser = async (
  user_id: number,
  page: number,
) => {
  const res = await axios.get(
    `${apiURL}/by-user/user_id=${user_id}&page=${page}`,
    axiosHeader,
  )
  return res.data
}

export const searchDigitalPaymentByMonth = async (
  month_id: number,
  page: number,
) => {
  const res = await axios.get(
    `${apiURL}/by-month/month_id=${month_id}&page=${page}`,
    axiosHeader,
  )
  return res.data
}

export const searchDigitalPaymentByDate = async (date: string) => {
  const res = await axios.get(`${apiURL}/by-date/date=${date}`, axiosHeader)
  return res.data
}

export const createDigitalPayment = async (body: MPUserPayment) => {
  const res = await defaultPost(apiURL, body)
  return res
}

export const updateDigitalPayment = async (body: MPUserPayment) => {
  const res = await axios.put(`${apiURL}/${body.id}`, body, axiosHeader)
  return res.data
}
