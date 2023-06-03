const routes: {
  route: string
  name: string
  queries: {
    name: string
    query: string
  }[]
}[] = [
  {
    route: "home",
    name: "Clientes",
    queries: [
      {
        name: "Clientes",
        query: "?clients=true",
      },
      {
        name: "Precios",
        query: "?prices=true",
      },
    ],
  },
  {
    route: "trainers",
    name: "Profesores",
    queries: [
      {
        name: "Calendario de clases",
        query: "?calendar=true",
      },
      {
        name: "Alumnos",
        query: "?students=true",
      },
      {
        name: "Agenda",
        query: "?agenda=true",
      },
      {
        name: "Precios",
        query: "?prices=true",
      },
    ],
  },
  {
    route: "store",
    name: "Tienda",
    queries: [
      {
        name: "Tienda",
        query: "?store=true",
      },
      {
        name: "Stock",
        query: "?stock=true",
      },
    ],
  },
  {
    route: "finances",
    name: "Finanzas",
    queries: [
      {
        name: "Facturacion boulder",
        query: "?billing=true",
      },
      {
        name: "Gastos",
        query: "?expenses=true",
      },
      {
        name: "Horas de trabajo",
        query: "?workingHours=true",
      },
      {
        name: "Ingresos",
        query: "?earnings=true",
      },
    ],
  },
  {
    route: "annotations",
    name: "Anotaciones",
    queries: [
      {
        name: "Notas",
        query: "?notes=true",
      },
    ],
  },
]

export default routes
