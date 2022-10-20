import axios from "axios"
import axiosHeader from "services/axiosHeader"

const defaultGetSearch = async (
  apiURL: string,
  search: string,
  page: number,
) => {
  const res = await axios.get(`${apiURL}/${search}?page=${page}`, axiosHeader)
  return res.data
}

export default defaultGetSearch
