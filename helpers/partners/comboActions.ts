/* eslint-disable import/prefer-default-export */
import getCombos from "services/Partners/GetCombos.service"

export const getCombosAction = async () => {
  const data = await getCombos()
  return data.data
}
