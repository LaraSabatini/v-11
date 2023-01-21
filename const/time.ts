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
