import {
  createPartner,
  editPartner,
  searchPartner,
} from "services/Partners/Partner.service"
import PartnerInterface from "interfaces/partners/PartnerInterface"

export const createPartnerAction = async (partnerData: PartnerInterface) => {
  const handlePost = await createPartner(partnerData)

  const response = {
    success: handlePost.message === "partner created successfully",
    partnerId: handlePost.partnerId,
  }
  return response
}

export const editPartnerAction = async (partnerData: PartnerInterface) => {
  const handleEdit = await editPartner(partnerData)

  return handleEdit.message === "partner updated successfully"
}

export const searchPartnerAction = async (searchValue: string) => {
  const handleSearch = await searchPartner(searchValue, 1)

  return handleSearch
}
