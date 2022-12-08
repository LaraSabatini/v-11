/* eslint-disable import/prefer-default-export */
import { getCategories } from "@services/Store/categories.service"

export const getCategoriesAction = async () => {
  const getCategoriesData = await getCategories()
  return getCategoriesData.data
}
