import React, { useState, useEffect, useContext, useRef } from "react"
import { StoreContext } from "contexts/Store"
import getProducts from "services/Store/getProducts.service"
import { searchProducts } from "services/Store/searchProduct.service"
import TextButton from "components/UI/TextButton"
import DataTable from "components/UI/DataTable"
import Autocomplete from "components/UI/Autocomplete"
import Input from "../Input"
import {
  Container,
  ButtonsContainer,
  Content,
  AutocompleteContainer,
} from "./styles"

const Stock = () => {
  const {
    productsList,
    setProductsList,
    brands,
    categories,
    searchValueForStock,
  } = useContext(StoreContext)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    { id: 4, field: "stock", header_name: "Stock", width: "s" },
    { id: 5, field: "price", header_name: "Precio", width: "s" },
    { id: 6, field: "margin", header_name: "Margen (%)", width: "s" },
    { id: 7, field: "cost", header_name: "Costo", width: "s" },
    {
      id: 8,
      field: "contact_name",
      header_name: "Contacto del vendedor",
      width: "l",
    },
    { id: 9, field: "contact_info", header_name: "N° de telefono", width: "m" },
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
    if (searchValueForStock.length <= 2) {
      const data = await getProducts(currentPage)
      setProductsList(data.data)

      const rowsCleaned: {
        id: number
        item: string
        brand: string | number
        category: string | number
        stock: any
        price: number
        margin: any
        cost: any
        contact_name: string
        contact_info: string
      }[] = []

      data.data.map(product =>
        rowsCleaned.push({
          // id: product.id,
          // item: activeEdition ? (
          //   <Input width={150} value={product.name} />
          // ) : (
          //   product.name
          // ),
          // brand: activeEdition ? (
          //   <AutocompleteContainer>
          //     <Autocomplete
          //       width={120}
          //       options={brands}
          //       setValue={
          //         brands.filter(brand => brand.id === product.brand_id)[0]?.name
          //       }
          //     />
          //   </AutocompleteContainer>
          // ) : (
          //   brands.filter(brand => brand.id === product.brand_id)[0]?.name
          // ),
          // category: activeEdition ? (
          //   <AutocompleteContainer>
          //     <Autocomplete
          //       width={120}
          //       options={categories}
          //       setValue={
          //         categories.filter(
          //           category => category.id === product.category_id,
          //         )[0]?.name
          //       }
          //     />
          //   </AutocompleteContainer>
          // ) : (
          //   categories.filter(
          //     category => category.id === product.category_id,
          //   )[0]?.name
          // ),
          // stock: activeEdition ? (
          //   <Input value={product.stock} />
          // ) : (
          //   product.stock
          // ),
          // price: product.price,
          // margin: activeEdition ? (
          //   <Input value={product.margin} />
          // ) : (
          //   product.margin
          // ),
          // cost: activeEdition ? <Input value={product.cost} /> : product.cost,
          // contact_name: activeEdition ? (
          //   <Input width={150} value={product.sales_contact_name} />
          // ) : (
          //   product.sales_contact_name
          // ),

          // contact_info: activeEdition ? (
          //   <Input width={120} value={product.sales_contact_information} />
          // ) : (
          //   product.sales_contact_information
          // ),
          id: product.id,
          item: product.name,
          brand: brands.filter(brand => brand.id === product.brand_id)[0]?.name,
          category: categories.filter(
            category => category.id === product.category_id,
          )[0]?.name,
          stock: product.stock,
          price: product.price,
          margin: product.margin,
          cost: product.cost,
          contact_name:
            product.sales_contact_name === ""
              ? "-"
              : product.sales_contact_name,
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
    } else {
      const search = await searchProducts(searchValueForStock, 1)
      setProductsList(search.data)
      const rowsCleaned: {
        id: number
        item: string
        brand: string | number
        category: string | number
        stock: number
        price: number
        margin: number
        cost: number
        contact_name: string
        contact_info: string
      }[] = []

      search.data.map(product =>
        rowsCleaned.push({
          id: product.id,
          item: product.name,
          brand: brands.filter(brand => brand.id === product.brand_id)[0]?.name,
          category: categories.filter(
            category => category.id === product.category_id,
          )[0]?.name,
          stock: product.stock,
          price: product.price,
          margin: product.margin,
          cost: product.cost,
          contact_name:
            product.sales_contact_name === ""
              ? "-"
              : product.sales_contact_name,
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
      // set table with this data
    }
  }

  useEffect(() => {
    if (brands !== undefined && categories !== undefined) {
      fillRows()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, searchValueForStock, brands, categories])

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

  const activateRow = (item: {
    id: number
    item: string
    brand: string | number
    category: string | number
    stock: number
    price: number
    margin: number
    cost: number
    contact_name: string
    contact_info: string
  }) => {
    const getIndexOfRow = rows.rows.indexOf(item)

    const newSetOfRows = rows.rows

    newSetOfRows[getIndexOfRow] = {
      id: rows.rows[getIndexOfRow].id,
      item: <Input width={150} value={rows.rows[getIndexOfRow].name} />,
      brand: (
        <AutocompleteContainer>
          <Autocomplete
            width={120}
            options={brands}
            setValue={
              brands.filter(
                brand => brand.id === rows.rows[getIndexOfRow].brand_id,
              )[0]?.name
            }
          />
        </AutocompleteContainer>
      ),
      category: (
        <AutocompleteContainer>
          <Autocomplete
            width={120}
            options={categories}
            setValue={
              categories.filter(
                category =>
                  category.id === rows.rows[getIndexOfRow].category_id,
              )[0]?.name
            }
          />
        </AutocompleteContainer>
      ),
      stock: <Input value={rows.rows[getIndexOfRow].stock} />,
      price: rows.rows[getIndexOfRow].price,
      margin: <Input value={rows.rows[getIndexOfRow].margin} />,
      cost: <Input value={rows.rows[getIndexOfRow].cost} />,
      contact_name: (
        <Input
          width={150}
          value={rows.rows[getIndexOfRow].sales_contact_name}
        />
      ),
      contact_info: (
        <Input
          width={120}
          value={rows.rows[getIndexOfRow].sales_contact_information}
        />
      ),
    }

    setRows({
      success: true,
      rows: newSetOfRows,
    })
  }

  return (
    <Container>
      <Content>
        <DataTable
          rows={rows}
          columns={columns}
          height={350}
          onRowClick={e => activateRow(e.item)}
          totalPages={1}
          reference={rowRef}
          onClickNext={goNext}
          onClickBack={goPrev}
          setPage={currentPage}
        />
      </Content>

      <ButtonsContainer>
        <TextButton content="Descartar" />
        <TextButton cta content="Guardar" />
      </ButtonsContainer>
    </Container>
  )
}

export default Stock
