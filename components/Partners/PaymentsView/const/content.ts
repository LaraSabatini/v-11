const columns: {
  id: number
  field: string
  header_name: string
  width: "s" | "m" | "l" | "xl"
}[] = [
  { id: 1, field: "partner_id", header_name: "Cliente", width: "s" },
  { id: 2, field: "combo", header_name: "Combo", width: "l" },
  { id: 3, field: "time_paid", header_name: "Tiempo pagado", width: "s" },
  {
    id: 4,
    field: "time_paid_unit",
    header_name: "Unidad de tiempo",
    width: "s",
  },
  { id: 5, field: "clases_paid", header_name: "Clases", width: "s" },
  {
    id: 6,
    field: "payment_method_id",
    header_name: "Metodo de pago",
    width: "s",
  },
  { id: 7, field: "price_paid", header_name: "Pagado", width: "s" },
  {
    id: 8,
    field: "date",
    header_name: "Fecha",
    width: "l",
  },
]

export default columns
