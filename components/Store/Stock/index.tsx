import React, { useState, useEffect, useContext, useRef } from "react"
import { StoreContext } from "contexts/Store"
import getProducts from "services/Store/getProducts.service"
import DataTable from "components/UI/DataTable"
import Icon from "components/UI/Assets/Icon"
import Tooltip from "components/UI/Tooltip"
import { Container, EditButton, Content, MainButton } from "./styles"

const Stock = () => {
  const { productsList, setProductsList, brands, categories } = useContext(
    StoreContext,
  )
  const [activeEdition, setActiveEdition] = useState<boolean>(false)

  const [currentPage, setCurrentPage] = useState<number>(1)
  const columns: {
    id: number
    field: string
    header_name: string
    width: "s" | "m" | "l" | "xl"
  }[] = [
    { id: 1, field: "item", header_name: "Item", width: "l" },
    { id: 2, field: "brand", header_name: "Marca", width: "m" },
    { id: 3, field: "category", header_name: "Categoria", width: "m" },
    { id: 4, field: "price", header_name: "Precio", width: "s" },
    { id: 5, field: "margin", header_name: "Margen (%)", width: "s" },
    { id: 6, field: "cost", header_name: "Costo", width: "s" },
    {
      id: 7,
      field: "contact_name",
      header_name: "Contacto del vendedor",
      width: "l",
    },
    { id: 8, field: "contact_info", header_name: "N° de telefono", width: "m" },
  ]
  const [rows, setRows] = useState<{
    success: boolean
    message?: {
      icon: string
      content: string
    }
    rows: any[]
  }>()

  const rowRef = useRef(null)

  const fillRows = async () => {
    const data = await getProducts(currentPage)
    setProductsList(data.data)

    const rowsCleaned: {
      id: number
      item: string
      brand: string | number
      category: string | number
      price: number
      margin: number
      cost: number
      contact_name: string
      contact_info: string
    }[] = []

    data.data.map(product =>
      rowsCleaned.push({
        id: product.id,
        item: product.name,
        brand: brands.filter(brand => brand.id === product.brand_id)[0].name,
        category: categories.filter(
          category => category.id === product.category_id,
        )[0].name,
        price: product.price,
        margin: product.margin,
        cost: product.cost,
        contact_name:
          product.sales_contact_name === "" ? "-" : product.sales_contact_name,
        contact_info:
          product.sales_contact_information === ""
            ? "-"
            : product.sales_contact_information,
      }),
    )

    setRows({
      success: true,
      rows: rowsCleaned,
    })
  }

  useEffect(() => {
    fillRows()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage])

  const handleClick = () => {}

  const goPrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const goNext = () => {
    if (productsList.length > 0) {
      setCurrentPage(currentPage + 1)
    }
  }

  return (
    <Container>
      <Content>
        <DataTable
          rows={rows}
          columns={columns}
          height={400}
          onRowClick={handleClick}
          totalPages={1}
          reference={rowRef}
          onClickNext={goNext}
          onClickBack={goPrev}
          setPage={currentPage}
        />
      </Content>
      <MainButton>
        <Tooltip title="Editar productos">
          {/* CHEQUEAR SI HAY CAMBIOS */}
          <EditButton onClick={() => setActiveEdition(!activeEdition)}>
            <Icon icon="IconEdit" color="#FFF" />
          </EditButton>
        </Tooltip>
      </MainButton>
    </Container>
  )
}

export default Stock
