import axios from "axios"
import axiosHeader from "services/axiosHeader"
import defaultPost from "services/defaultPost"
import { KidsInterface } from "interfaces/partners/Kids"
import defaultGetSearch from "services/defaultGetSearch"

const apiURL = `${process.env.NEXT_PUBLIC_API_HOST}/kids`

export const createKid = async (body: KidsInterface) => {
  const res = await defaultPost(apiURL, body)
  return res
}

export const editKid = async (body: KidsInterface) => {
  const res = await axios.put(`${apiURL}/${body.id}`, body, axiosHeader)
  return res.data
}

export const getKids = async (page: number) => {
  const res = await axios.get(`${apiURL}?page=${page}`, axiosHeader)
  return res.data
}

export const searchKid = async (search: string, page: number) => {
  const res = await defaultGetSearch(apiURL, search, page)
  return res
}
