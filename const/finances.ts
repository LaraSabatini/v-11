import DefaultInterface from "interfaces/components/DefaultInterface"

export const paymentMethods: DefaultInterface[] = [
  { id: 1, display_name: "Efectivo" },
  { id: 2, display_name: "MP" },
]

export const paymentUsers: DefaultInterface[] = [
  { id: 1, display_name: "Roman" },
  { id: 2, display_name: "Federico" },
  { id: 3, display_name: "Tobias" },
  { id: 4, display_name: "Guillermo" },
  { id: 5, display_name: "Joaco" },
]

export const tillFilters = [
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
export const financesSections = [
  {
    section: "Facturacion Boulder",
    id: 1,
  },
  {
    section: "Gastos",
    id: 2,
  },
  {
    section: "Horas de trabajo",
    id: 3,
  },
  {
    section: "Ingresos",
    id: 4,
  },
]
