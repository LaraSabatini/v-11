import PartnerInterface from "interfaces/partners/PartnerInterface"
import defaultPost from "services/defaultPost"

const apiURL = `${process.env.NEXT_PUBLIC_API_HOST}/businessLogic/create-partner`

const createPartnerLogic = async (body: {
  partner: PartnerInterface
  partnerPayment: {
    combo: number
    time_paid: number
    time_paid_unit: number
    payment_method_id: number
    payment_method_name: string
    price_paid: number
    payment_expire_date: string
  }
  boulderPayment: {
    id: number
    item_id: number
    item_name: string
    amount_of_items: number
  }
}) => {
  const res = await defaultPost(apiURL, body)
  return res
}

export default createPartnerLogic
