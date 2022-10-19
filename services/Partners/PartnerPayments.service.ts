import axios from "axios"
import axiosHeader from "services/axiosHeader"
import PaymentInterface from "interfaces/partners/PaymentInterface"
import defaultPost from "services/defaultPost"

const apiURL = `${process.env.NEXT_PUBLIC_API_HOST}/partnersPayment`

export const getPartnerPayments = async (page: number) => {
  const res = await axios.get(`${apiURL}?page=${page}`, axiosHeader)
  return res.data
}

export const getPartnerPaymentsById = async (id: number) => {
  const res = await axios.get(
    `${apiURL}/payment_by_partner_id/${id}`,
    axiosHeader,
  )
  return res.data
}

export const getClasesPaid = async () => {
  const res = await axios.get(`${apiURL}/clases/0`, axiosHeader)
  return res.data
}

export const createPartnerPayment = async (body: PaymentInterface) => {
  const res = await defaultPost(apiURL, body)
  return res
}

export const editPartnerPayment = async (body: PaymentInterface) => {
  const res = await axios.put(`${apiURL}/${body.id}`, body, axiosHeader)
  return res.data
}

export const getPaymentByPartner = async (partner: string, page: number) => {
  const res = await axios.get(
    `${apiURL}/${partner}?page=${page}`,

    axiosHeader,
  )
  return res.data
}

export const getPaymentByDate = async (date: string) => {
  const res = await axios.get(
    `${apiURL}/date/${date}`,

    axiosHeader,
  )
  return res.data
}

export const getEarningsByDate = async (date: string) => {
  const res = await axios.get(
    `${apiURL}/cards/${date}`,

    axiosHeader,
  )
  return res.data
}
