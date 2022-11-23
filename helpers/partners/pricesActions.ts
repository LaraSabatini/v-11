import { getPrices, editPrices } from "services/Partners/Prices.service"
import PricesInterface from "interfaces/partners/PricesInterface"

export const getPricesAction = async () => {
  const getData = await getPrices()
  return getData.data
}

export const editPricesAction = async (body: PricesInterface) => {
  const editData = await editPrices(body)
  return editData.message
}
