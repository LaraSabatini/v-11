import {
  createPartner,
  editPartner,
  searchPartner,
  deletePartner,
  getPartners,
  getStudents,
  getFreePassPartners,
} from "services/Partners/Partner.service"
import PartnerInterface from "interfaces/partners/PartnerInterface"

export const createPartnerAction = async (partnerData: PartnerInterface) => {
  const handlePost = await createPartner(partnerData)
  return handlePost.message
}

export const editPartnerAction = async (partnerData: PartnerInterface) => {
  const handleEdit = await editPartner(partnerData)
  return handleEdit.message
}

export const searchPartnerAction = async (searchValue: string) => {
  const handleSearch = await searchPartner(searchValue, 1)
  return handleSearch
}

export const deletePartnerAction = async (id: number) => {
  const handleDelete = await deletePartner(id)
  return handleDelete.message
}

export const getPartnersAction = async (page: number) => {
  const getData = await getPartners(page)
  return getData
}

export const getStudentsAction = async (page: number) => {
  const getData = await getStudents(page)
  return getData
}

export const getFreePassPartnersAction = async (page: number) => {
  const getData = await getFreePassPartners(page)
  return getData
}
