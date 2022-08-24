export default interface UserInterface {
  id: number
  name: string
  last_name: string
  identification_number: string
  bith_date: string
  email: string
  membership_start_date: string
  membership_time_paid: string
  payment_expire_date: string
  payment_is_active: boolean
  created_by: number
  trainer_id: number
}
