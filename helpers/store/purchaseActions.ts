import {
  getStorePurchasesByDateAndPaymentMethodAndProduct,
  getStorePurchasesByDate,
  createStorePurchase,
  editStorePurchase,
} from "services/Store/storePurchases.service"
import StorePurchaseInterface from "interfaces/store/StorePurchase"

export const getStorePurchasesByDatePMAndProductAction = async (
  date: string,
  productId: number,
  paymentMethodId: number,
) => {
  const getData = await getStorePurchasesByDateAndPaymentMethodAndProduct(
    date,
    productId,
    paymentMethodId,
  )

  return getData.data
}

export const getStorePurchasesByDateAction = async (date: string) => {
  const getData = await getStorePurchasesByDate(date)
  return getData.data
}

export const createStorePurchaseAction = async (
  body: StorePurchaseInterface,
) => {
  const handleCreatePurchase = await createStorePurchase(body)
  return handleCreatePurchase.message === "productPurchase created successfully"
}

export const editStorePurchaseAction = async (body: StorePurchaseInterface) => {
  const handleEditPurchase = await editStorePurchase(body)
  return handleEditPurchase.message === "store_payments updated successfully"
}
