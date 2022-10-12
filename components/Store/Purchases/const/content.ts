const columns: {
  id: number
  field: string
  header_name: string
  width: "s" | "m" | "l" | "xl"
}[] = [
  { id: 1, field: "item", header_name: "Item", width: "l" },
  { id: 2, field: "date", header_name: "Fecha", width: "m" },
  { id: 3, field: "amount", header_name: "Cantidad", width: "s" },
  { id: 4, field: "price", header_name: "Precio", width: "s" },
  { id: 5, field: "margin", header_name: "Ganancia (%)", width: "s" },
  { id: 6, field: "cost", header_name: "Costo", width: "s" },
]

export default columns
