import DefaultInterface from "interfaces/components/DefaultInterface"

export const today = new Date()
const getDay = today.getDate()
const getMonth = today.getMonth()
export const year = today.getFullYear()

export const day = getDay > 9 ? getDay : `0${getDay}`
export const month = getMonth + 1 > 9 ? getMonth + 1 : `0${getMonth + 1}`

export const shifts: DefaultInterface[] = [
  { id: 1, display_name: "AM" },
  { id: 2, display_name: "PM" },
  { id: 3, display_name: "PM2" },
]

export const timeUnits: DefaultInterface[] = [
  {
    id: 1,
    display_name: "Dia/s",
  },
  {
    id: 2,
    display_name: "Mes/es",
  },
]

export const daysOfTheWeek: DefaultInterface[] = [
  { id: 1, display_name: "LUNES" },
  { id: 2, display_name: "MARTES" },
  { id: 3, display_name: "MIERCOLES" },
  { id: 4, display_name: "JUEVES" },
  { id: 5, display_name: "VIERNES" },
  { id: 6, display_name: "SABADO" },
  { id: 7, display_name: "DOMINGO" },
]

export const daysOfWeekAv: DefaultInterface[] = [
  {
    id: 1,
    display_name: "LUN",
  },
  {
    id: 2,
    display_name: "MAR",
  },
  {
    id: 3,
    display_name: "MIER",
  },
  {
    id: 4,
    display_name: "JUE",
  },
  {
    id: 5,
    display_name: "VIE",
  },
  {
    id: 6,
    display_name: "SAB",
  },
  {
    id: 7,
    display_name: "DOM",
  },
]

export const daysOfWeekWithoutWeekendAv: DefaultInterface[] = [
  {
    id: 1,
    display_name: "LUN",
  },
  {
    id: 2,
    display_name: "MAR",
  },
  {
    id: 3,
    display_name: "MIER",
  },
  {
    id: 4,
    display_name: "JUE",
  },
  {
    id: 5,
    display_name: "VIE",
  },
]

export const months: DefaultInterface[] = [
  {
    id: 1,
    display_name: "Enero",
  },
  {
    id: 2,
    display_name: "Febrero",
  },
  {
    id: 3,
    display_name: "Marzo",
  },
  {
    id: 4,
    display_name: "Abril",
  },
  {
    id: 5,
    display_name: "Mayo",
  },
  {
    id: 6,
    display_name: "Junio",
  },
  {
    id: 7,
    display_name: "Julio",
  },
  {
    id: 8,
    display_name: "Agosto",
  },
  {
    id: 9,
    display_name: "Septiembre",
  },
  {
    id: 10,
    display_name: "Octubre",
  },
  {
    id: 11,
    display_name: "Noviembre",
  },
  {
    id: 12,
    display_name: "Diciembre",
  },
]

export const abbreviatedMonth: DefaultInterface[] = [
  {
    id: 1,
    display_name: "Ene",
  },
  {
    id: 2,
    display_name: "Feb",
  },
  {
    id: 3,
    display_name: "Mar",
  },
  {
    id: 4,
    display_name: "Abr",
  },
  {
    id: 5,
    display_name: "May",
  },
  {
    id: 6,
    display_name: "Jun",
  },
  {
    id: 7,
    display_name: "Jul",
  },
  {
    id: 8,
    display_name: "Ago",
  },
  {
    id: 9,
    display_name: "Sept",
  },
  {
    id: 10,
    display_name: "Oct",
  },
  {
    id: 11,
    display_name: "Nov",
  },
  {
    id: 12,
    display_name: "Dic",
  },
]

export const hours = [
  { id: 1, value: "09.00" },
  { id: 2, value: "09.30" },
  { id: 3, value: "10.00" },
  { id: 4, value: "10.30" },
  { id: 5, value: "11.00" },
  { id: 6, value: "11.30" },
  { id: 7, value: "12.00" },
  { id: 8, value: "12.30" },
  { id: 9, value: "13.00" },
  { id: 10, value: "13.30" },
  { id: 11, value: "14.00" },
  { id: 12, value: "14.30" },
  { id: 13, value: "15.00" },
  { id: 14, value: "15.50" },
  { id: 15, value: "16.00" },
  { id: 16, value: "16.30" },
  { id: 17, value: "17.00" },
  { id: 18, value: "17.30" },
  { id: 19, value: "18.00" },
  { id: 20, value: "18.30" },
  { id: 21, value: "19.00" },
  { id: 22, value: "19.30" },
  { id: 23, value: "20.00" },
  { id: 24, value: "20.30" },
  { id: 25, value: "21.00" },
  { id: 26, value: "21.30" },
  { id: 27, value: "22.00" },
]

export const hoursForComboBox = [
  { id: 1, display_name: "09.00" },
  { id: 2, display_name: "09.30" },
  { id: 3, display_name: "10.00" },
  { id: 4, display_name: "10.30" },
  { id: 5, display_name: "11.00" },
  { id: 6, display_name: "11.30" },
  { id: 7, display_name: "12.00" },
  { id: 8, display_name: "12.30" },
  { id: 9, display_name: "13.00" },
  { id: 10, display_name: "13.30" },
  { id: 11, display_name: "14.00" },
  { id: 12, display_name: "14.30" },
  { id: 13, display_name: "15.00" },
  { id: 14, display_name: "15.50" },
  { id: 15, display_name: "16.00" },
  { id: 16, display_name: "16.30" },
  { id: 17, display_name: "17.00" },
  { id: 18, display_name: "17.30" },
  { id: 19, display_name: "18.00" },
  { id: 20, display_name: "18.30" },
  { id: 21, display_name: "19.00" },
  { id: 22, display_name: "19.30" },
  { id: 23, display_name: "20.00" },
  { id: 24, display_name: "20.30" },
  { id: 25, display_name: "21.00" },
  { id: 26, display_name: "21.30" },
  { id: 27, display_name: "22.00" },
]
