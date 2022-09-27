export const clientFilters = [
  {
    value: "students",
    text: "Alumnos",
  },
  {
    value: "free-pass",
    text: "Pase Libre",
  },
  {
    value: "all",
    text: "Todos",
  },
]

export const timeUnits = [
  {
    id: 1,
    display_name: "Dia/s",
  },
  {
    id: 2,
    display_name: "Mes/es",
  },
]

export const paymentMethods = [
  { id: 1, display_name: "Efectivo" },
  { id: 2, display_name: "MP" },
]

export const paymentUsers = [
  { id: 1, display_name: "Roman" },
  { id: 2, display_name: "Federico" },
  { id: 3, display_name: "Tobias" },
  { id: 4, display_name: "Guillermo" },
  { id: 5, display_name: "Joaco" },
]

export const months = [
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

const today = new Date()
const getDay = today.getDate()
const getMonth = today.getMonth()
export const year = today.getFullYear()

export const day = getDay > 9 ? getDay : `0${getDay}`
export const month = getMonth + 1 > 9 ? getMonth + 1 : `0${getMonth + 1}`

export const cajaFilters = [
  {
    id: 1,
    filter: "Productos",
  },
  {
    id: 2,
    filter: "Boulder",
  },
  {
    id: 3,
    filter: "Caja MP x Usuario",
  },
  {
    id: 4,
    filter: "Caja completa",
  },
]
