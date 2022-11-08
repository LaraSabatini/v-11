import { getPartnerPaymentsByIdAction } from "helpers/partners"
import { day, month, year } from "const/time"
import formatDescDate from "./formatDescDate"

const checkDiscount = async (clientId: number) => {
  const checkPayment = await getPartnerPaymentsByIdAction(clientId) // clientSelected.id

  if (checkPayment.length) {
    const expirationDate =
      checkPayment[checkPayment.length - 1].payment_expire_date

    const expirationDateCleaned = new Date(formatDescDate(expirationDate))
    const todayDate = new Date(`${year}-${month}-${day}`)

    return expirationDateCleaned > todayDate
  }
  return false
}

export default checkDiscount
