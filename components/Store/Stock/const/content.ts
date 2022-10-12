const columns: {
  id: number
  field: string
  header_name: string
  width: "s" | "m" | "l" | "xl"
}[] = [
  { id: 1, field: "item", header_name: "Item", width: "l" },
  { id: 2, field: "brand", header_name: "Marca", width: "m" },
  { id: 3, field: "category", header_name: "Categoria", width: "m" },
  { id: 4, field: "stock", header_name: "Stock", width: "s" },
  { id: 5, field: "price", header_name: "Precio", width: "s" },
  { id: 6, field: "margin", header_name: "Ganancia ($)", width: "s" },
  { id: 7, field: "cost", header_name: "Costo", width: "s" },
  {
    id: 8,
    field: "sales_contact_name",
    header_name: "Contacto del vendedor",
    width: "l",
  },
  {
    id: 9,
    field: "sales_contact_information",
    header_name: "N° de telefono",
    width: "m",
  },
]

export default columns
