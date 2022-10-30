import { getPartnerPaymentsById } from "services/Partners/PartnerPayments.service"
import { day, month, year } from "const/time"

const checkDiscount = async (clientId: number) => {
  const checkPayment = await getPartnerPaymentsById(clientId) // clientSelected.id

  if (checkPayment.data.length) {
    const expirationDate =
      checkPayment.data[checkPayment.data.length - 1].payment_expire_date

    const expirationDay = expirationDate.slice(0, 2)
    const expirationMonth = expirationDate.slice(3, 5)
    const expirationYear = expirationDate.slice(6, 10)

    const expirationDateCleaned = new Date(
      `${expirationYear}-${expirationMonth}-${expirationDay}`,
    )
    const todayDate = new Date(`${year}-${month}-${day}`)

    return expirationDateCleaned > todayDate
  }
  return false
}

export default checkDiscount
