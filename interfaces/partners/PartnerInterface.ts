export default interface PartnerInterface {
  id: number
  name: string
  last_name: string
  identification_number: string
  birth_date: string
  email: string
  membership_start_date: string
  created_by: number
  trainer_id: number | null
  free_pass: number
}
