import PaymentInterface from "interfaces/partners/PaymentInterface"
import formatDescDate from "components/Trainers/helpers/formatDescDate"
import { day, month, year } from "const/time"

const checkIfCanUpdatePayment = (initialPayment: PaymentInterface) => {
  let canUpdatePayment = {
    days: false,
    months: false,
    combos: false,
  }

  if (
    initialPayment.time_paid === 0 &&
    (initialPayment.time_paid_unit === 1 ||
      initialPayment.time_paid_unit === 0) &&
    initialPayment.combo === 0
  ) {
    canUpdatePayment = {
      days: true,
      months: true,
      combos: true,
    }
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
        formatDescDate(initialPayment.payment_expire_date),
      )

      if (expirationDateCleaned > todayDate) {
        canUpdatePayment = {
          days: false,
          months: false,
          combos: false,
        }
      } else {
        canUpdatePayment = {
          days: true,
          months: true,
          combos: true,
        }
      }
    } else {
      canUpdatePayment = {
        days: true,
        months: true,
        combos: true,
      }
    }
  }

  if (initialPayment.combo > 0) {
    if (initialPayment.payment_expire_date !== "") {
      const expirationDateCleaned = new Date(
        formatDescDate(initialPayment.payment_expire_date),
      )

      if (expirationDateCleaned > todayDate) {
        canUpdatePayment = {
          days: false,
          months: false,
          combos: false,
        }
      } else {
        canUpdatePayment = {
          days: true,
          months: true,
          combos: true,
        }
      }
    } else {
      canUpdatePayment = {
        days: true,
        months: true,
        combos: true,
      }
    }
  }
  return canUpdatePayment
}

export default checkIfCanUpdatePayment
