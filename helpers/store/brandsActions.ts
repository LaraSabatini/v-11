/* eslint-disable import/prefer-default-export */
import { getBrands } from "@services/Store/brands.service"

export const getBrandsAction = async () => {
  const getBrandsData = await getBrands()
  return getBrandsData.data
}
