export default interface ClasesPurchasedInterface {
  id: number
  lesson_date: string
  shift: "AM" | "PM"
  partner_id: number
  partner_name: string
  partner_last_name: string
  trainer_id: number
  trainer_name: string
  week_id: number
  paid: "SI" | "NO" | string
  day_id: number
  final_price: number
  payment_method_id: number
  paid_day: string
}
