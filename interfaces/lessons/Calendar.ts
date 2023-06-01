export type LessonType = "kids" | "beginner" | "advanced" | string

export interface LessonTypesInterface {
  id?: number
  value: string
  name: string
  color: string
  colorSecondary: string
  unit_price_mp: number
  unit_price_cash: number
  four_price_mp: number
  four_price_cash: number
  eight_price_mp: number
  eight_price_cash: number
  quota: number
  hours: number[] | string
}

export interface CalendarInterface {
  id: number
  date: string
  weekId: number
  hourRange: number | string
  type: LessonType
  purchaseIds: number[] | string
}

export interface LessonPurchaseInterface {
  id: number
  clientId: number
  paidDay: string
  paymentMethod: number
  pricePaid: number
  paymentExpireDate: string
  createdBy: number
}

export interface TableInterface {
  startingDate: Date
  dateList: string[]
  goNext: (arg?: any) => void
  goPrev: (arg?: any) => void
  weekId: number
}
