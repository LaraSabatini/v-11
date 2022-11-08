import PartnerPaymentsHistoryInterface from "interfaces/finances/PartnerPaymentsHistory"

const setLessonsData = (
  partnerPaymentsByDate: PartnerPaymentsHistoryInterface[],
) => {
  const filterLessons = partnerPaymentsByDate.filter(
    purchase => purchase.item_id === 4,
  )
  const filterFourPack = filterLessons.filter(
    lesson => lesson.amount_of_items === 4,
  )
  const filterEightPack = filterLessons.filter(
    lesson => lesson.amount_of_items === 8,
  )
  return [filterFourPack.length, filterEightPack.length]
}

export default setLessonsData
