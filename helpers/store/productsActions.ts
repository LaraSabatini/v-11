import {
  createProduct,
  editProduct,
  getProducts,
  searchProducts,
  productByCategory,
} from "services/Store/Products.service"
import ProductInterface from "interfaces/store/ProductInterface"

export const createProductAction = async (body: ProductInterface) => {
  const handleCreateProduct = await createProduct(body)
  return handleCreateProduct.message
}

export const editProductAction = async (body: ProductInterface) => {
  const handleEditProduct = await editProduct(body)
  return handleEditProduct.message
}

export const getProductsAction = async (page: number) => {
  const getProductsData = await getProducts(page)
  return getProductsData.data
}

export const searchProductsAction = async (
  searchValue: string,
  page: number,
) => {
  const getProductsData = await searchProducts(searchValue, page)
  return getProductsData.data
}

export const getproductByCategoryAction = async (
  category: string,
  page: number,
) => {
  const getProductsData = await productByCategory(category, page)
  return getProductsData.data
}
