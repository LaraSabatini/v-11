import PaymentInterface from "interfaces/partners/PaymentInterface"
import formatDescendingDate from "components/Trainers/Helpers/formatDescendingDate"
import { day, month, year } from "const/time"

const checkIfCanUpdatePayment = (initialPayment: PaymentInterface) => {
  const allFalse = { days: false, months: false, combos: false }
  const allTrue = { days: true, months: true, combos: true }

  let canUpdatePayment = allFalse

  if (
    initialPayment.time_paid === 0 &&
    (initialPayment.time_paid_unit === 1 ||
      initialPayment.time_paid_unit === 0) &&
    initialPayment.combo === 0
  ) {
    canUpdatePayment = allTrue
  }

  if (
    initialPayment.time_paid >= 1 &&
    initialPayment.time_paid_unit === 1 &&
    initialPayment.combo === 0
  ) {
    canUpdatePayment = {
      days: true,
      months: false,
      combos: false,
    }
  }

  const todayDate = new Date(`${year}-${month}-${day}`)

  if (
    initialPayment.time_paid >= 1 &&
    initialPayment.time_paid_unit === 2 &&
    initialPayment.combo === 0
  ) {
    if (initialPayment.payment_expire_date !== "") {
      const expirationDateCleaned = new Date(
        formatDescendingDate(initialPayment.payment_expire_date),
      )

      if (expirationDateCleaned > todayDate) {
        canUpdatePayment = allFalse
      } else {
        canUpdatePayment = allTrue
      }
    } else {
      canUpdatePayment = allTrue
    }
  }

  if (initialPayment.combo > 0) {
    if (initialPayment.payment_expire_date !== "") {
      const expirationDateCleaned = new Date(
        formatDescendingDate(initialPayment.payment_expire_date),
      )

      if (expirationDateCleaned > todayDate) {
        canUpdatePayment = allFalse
      } else {
        canUpdatePayment = allTrue
      }
    } else {
      canUpdatePayment = allTrue
    }
  }
  return canUpdatePayment
}

export default checkIfCanUpdatePayment
