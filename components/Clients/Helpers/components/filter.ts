import {
  getPartnersAction,
  getStudentsAction,
  getFreePassPartnersAction,
} from "helpers/partners"
import PartnerInterface from "interfaces/partners/PartnerInterface"

const setPartnerList = async (filterSelected: string, currentPage: number) => {
  let list: PartnerInterface[]
  let numberOfPages: number = 0

  if (filterSelected === "all") {
    const data = await getPartnersAction(currentPage)
    list = data.data
    numberOfPages = data.meta.totalPages
  } else if (filterSelected === "students") {
    const data = await getStudentsAction(currentPage)
    list = data.data
    numberOfPages = data.meta.totalPages
  } else {
    const data = await getFreePassPartnersAction(currentPage)
    list = data.data
    numberOfPages = data.meta.totalPages
  }

  return {
    list,
    numberOfPages,
  }
}

export default setPartnerList
