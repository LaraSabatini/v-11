/* eslint-disable import/prefer-default-export */
import {
  updateDigitalPayment,
  createDigitalPayment,
  searchDigitalPaymentByUserAndDate,
  searchDigitalPaymentByDate,
} from "services/Finances/DigitalPayments.service"
import MPUserPayment from "interfaces/finances/MPUserPayments"
import { day, month, year } from "const/time"

export const updateDigitalPaymentAction = async (payment: MPUserPayment) => {
  const handleUpdate = await updateDigitalPayment(payment)

  return handleUpdate.message
}

export const createDigitalPaymentAction = async (payment: MPUserPayment) => {
  const handleCreate = await createDigitalPayment(payment)

  return handleCreate.message
}

export const searchDigitalPaymentByUserAndDateAction = async (
  digitalPaymentUser: number,
) => {
  const handleSearch = await searchDigitalPaymentByUserAndDate(
    digitalPaymentUser,
    `${day}-${month}-${year}`,
  )

  return handleSearch.data
}

export const searchDigitalPaymentByDateAction = async (date: string) => {
  const handleSearch = await searchDigitalPaymentByDate(date)
  return handleSearch.data
}

export const makeAppropiatePayment = async (
  digitalPaymentUser: number,
  finalPrice: number,
  newPayment: MPUserPayment,
) => {
  const checkIfThereIsAPayment = await searchDigitalPaymentByUserAndDateAction(
    digitalPaymentUser,
  )

  const makePayment =
    checkIfThereIsAPayment.length > 0
      ? await updateDigitalPaymentAction({
          id: checkIfThereIsAPayment[0].id,
          user_id: checkIfThereIsAPayment[0].user_id,
          user_name: checkIfThereIsAPayment[0].user_name,
          date: checkIfThereIsAPayment[0].date,
          month: checkIfThereIsAPayment[0].month,
          month_id: checkIfThereIsAPayment[0].month_id,
          total_profit: checkIfThereIsAPayment[0].total_profit + finalPrice,
          created_by: parseInt(localStorage.getItem("id"), 10),
        })
      : await createDigitalPaymentAction(newPayment)

  return makePayment
}
