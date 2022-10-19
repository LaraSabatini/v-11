import axios from "axios"
import axiosHeader from "services/axiosHeader"
import PartnerInterface from "interfaces/partners/PartnerInterface"

const apiURL = `${process.env.NEXT_PUBLIC_API_HOST}/partners`

export const createPartner = async (body: PartnerInterface) => {
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

export const deletePartner = async (id: number) => {
  const res = await axios.delete(`${apiURL}/${id}`, axiosHeader)
  return res.data
}

export const editPartner = async (body: PartnerInterface) => {
  const res = await axios.put(`${apiURL}/${body.id}`, body, axiosHeader)
  return res.data
}

export const getPartners = async (page: number) => {
  const res = await axios.get(`${apiURL}?page=${page}`, axiosHeader)
  return res.data
}

export const searchPartner = async (search: string, page: number) => {
  const res = await axios.get(`${apiURL}/${search}?page=${page}`, axiosHeader)
  return res.data
}

export const searchPartnerById = async (id: number) => {
  const res = await axios.get(`${apiURL}/by-id/${id}`, axiosHeader)
  return res.data
}

export const getStudents = async (page: number) => {
  const res = await axios.get(`${apiURL}/students/SI?page=${page}`, axiosHeader)
  return res.data
}

export const getFreePassPartners = async (page: number) => {
  const res = await axios.get(`${apiURL}/free-pass/1?page=${page}`, axiosHeader)
  return res.data
}
