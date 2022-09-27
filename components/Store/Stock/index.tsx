import React, { useState, useEffect, useContext, useRef } from "react"
// SERVICES
import {
  editProduct,
  getProducts,
  searchProducts,
} from "services/Store/Products.service"
// DATA STORAGE & TYPES
import { StoreContext } from "contexts/Store"
import texts from "strings/store.json"
// COMPONENTS & STYLING
import ModalAlert from "components/UI/ModalAlert"
import RowsInterface from "interfaces/store/RowsInterface"
import ProductInterface from "interfaces/store/ProductInterface"
import TextButton from "components/UI/TextButton"
import DataTable from "components/UI/DataTable"
import Autocomplete from "components/UI/Autocomplete"
import columns from "./const/content"
import Input from "../UI/Input"
import {
  Container,
  ButtonsContainer,
  Content,
  AutocompleteContainer,
  ErrorMessage,
} from "./styles"

interface DefaultInterface {
  id: number
  name: string
}

const Stock = () => {
  const {
    productsList,
    setProductsList,
    brands,
    categories,
    searchValueForStock,
    autoCompleteCategoriesValues,
    setAutoCompleteCategoriesValues,
    autoCompleteBrandsValues,
    setAutoCompleteBrandsValues,
    stockChanges,
    setStockChanges,
    modalStockHasChanges,
    setModalStockHasChanges,
  } = useContext(StoreContext)

  const [activeEdition, setActiveEdition] = useState<boolean>(false)
  const [productSelected, setProductSelected] = useState<number>()

  const [currentPage, setCurrentPage] = useState<number>(1)
  const [newValues, setNewValues] = useState<ProductInterface>(null)
  const [validationError, setValidationError] = useState<boolean>(false)

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

      const rowsCleaned: RowsInterface[] = []

      data.data.map((product: ProductInterface) =>
        rowsCleaned.push({
          id: product.id,
          item: product.name,
          brand: brands.filter(
            (brand: DefaultInterface) => brand.id === product.brand_id,
          )[0]?.name,
          category: categories.filter(
            (category: DefaultInterface) => category.id === product.category_id,
          )[0]?.name,
          stock: product.stock,
          price: product.price,
          margin: product.margin,
          cost: product.cost,
          sales_contact_name: product.sales_contact_name,
          sales_contact_information: product.sales_contact_information,
        }),
      )

      setRows({
        success: true,
        rows: rowsCleaned,
      })
    } else {
      const search = await searchProducts(searchValueForStock, 1)
      setProductsList(search.data)
      const rowsCleaned: RowsInterface[] = []

      search.data.map((product: ProductInterface) =>
        rowsCleaned.push({
          id: product.id,
          item: product.name,
          brand: brands.filter(
            (brand: DefaultInterface) => brand.id === product.brand_id,
          )[0]?.name,
          category: categories.filter(
            (category: DefaultInterface) => category.id === product.category_id,
          )[0]?.name,
          stock: product.stock,
          price: product.price,
          margin: product.margin,
          cost: product.cost,
          sales_contact_name: product.sales_contact_name,
          sales_contact_information: product.sales_contact_information,
        }),
      )

      setRows({
        success: true,
        rows: rowsCleaned,
      })
    }
  }

  const fillAutocompletes = () => {
    const autocompleteBrands: { id: number; display_name: string }[] = []
    brands.map(brand =>
      autocompleteBrands.push({ id: brand.id, display_name: brand.name }),
    )
    const autocompleteCategories: { id: number; display_name: string }[] = []
    categories.map(category =>
      autocompleteCategories.push({
        id: category.id,
        display_name: category.name,
      }),
    )
    setAutoCompleteBrandsValues(autocompleteBrands)
    setAutoCompleteCategoriesValues(autocompleteCategories)
  }

  useEffect(() => {
    if (brands !== undefined && categories !== undefined) {
      fillRows()
      fillAutocompletes()
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

  const setContentOfEditableRow = () => {
    const getRow = rows.rows.filter(row => row.id === newValues.id)
    const getIndexOfRow = rows.rows.indexOf(getRow[0])

    const newSetOfRows = rows.rows
    newSetOfRows[getIndexOfRow] = {
      id: rows.rows[getIndexOfRow].id,
      item: (
        <Input
          width={150}
          value={newValues.name || ""}
          onChange={e => setNewValues({ ...newValues, name: e.target.value })}
        />
      ),
      brand: (
        <AutocompleteContainer>
          <Autocomplete
            width={120}
            options={autoCompleteBrandsValues}
            setValue={
              brands.filter(
                (brand: DefaultInterface) => brand.id === newValues.brand_id,
              )[0]?.name || ""
            }
            onChangeProps={(e: { id: number; display_name: string }) =>
              setNewValues({ ...newValues, brand_id: e.id })
            }
          />
        </AutocompleteContainer>
      ),
      category: (
        <AutocompleteContainer>
          <Autocomplete
            width={120}
            options={autoCompleteCategoriesValues}
            setValue={
              categories.filter(
                (category: DefaultInterface) =>
                  category.id === newValues.category_id,
              )[0]?.name || ""
            }
            onChangeProps={(e: { id: number; display_name: string }) =>
              setNewValues({ ...newValues, category_id: e.id })
            }
          />
        </AutocompleteContainer>
      ),
      stock: (
        <Input
          value={newValues.stock || ""}
          onChange={e =>
            setNewValues({ ...newValues, stock: parseInt(e.target.value, 10) })
          }
        />
      ),
      price: (newValues.margin * newValues.cost) / 100 + newValues.cost,
      margin: (
        <Input
          value={newValues.margin || ""}
          onChange={e => {
            setNewValues({ ...newValues, margin: parseInt(e.target.value, 10) })
          }}
        />
      ),
      cost: (
        <Input
          value={newValues.cost || ""}
          onChange={e => {
            setNewValues({ ...newValues, cost: parseInt(e.target.value, 10) })
          }}
        />
      ),
      sales_contact_name: (
        <Input
          width={150}
          value={newValues.sales_contact_name || ""}
          onChange={e =>
            setNewValues({ ...newValues, sales_contact_name: e.target.value })
          }
        />
      ),
      sales_contact_information: (
        <Input
          width={120}
          value={newValues.sales_contact_information || ""}
          onChange={e =>
            setNewValues({
              ...newValues,
              sales_contact_information: e.target.value,
            })
          }
        />
      ),
    }
    setRows({
      success: true,
      rows: newSetOfRows,
    })
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
    sales_contact_name: string
    sales_contact_information: string
  }) => {
    const getDataOfItem = productsList.filter(
      (product: ProductInterface) => product.id === item.id,
    )

    setNewValues({
      id: item.id,
      name: item.item,
      brand_id: getDataOfItem[0].brand_id,
      stock: item.stock,
      price: item.price,
      margin: item.margin,
      cost: item.cost,
      sales_contact_name: item.sales_contact_name,
      sales_contact_information: item.sales_contact_information,
      category_id: getDataOfItem[0].category_id,
    })

    const index = productsList.indexOf(getDataOfItem[0])

    setProductSelected(index)
    setActiveEdition(true)
  }

  const discardChanges = () => {
    setModalStockHasChanges(false)
    setStockChanges(false)
    setNewValues(null)
    setActiveEdition(false)
    fillRows()
  }
  const saveChanges = async () => {
    const body = {
      id: newValues.id,
      name: newValues.name,
      brand_id: newValues.brand_id,
      category_id: newValues.category_id,
      stock: newValues.stock,
      price: (newValues.margin * newValues.cost) / 100 + newValues.cost,
      margin: newValues.margin,
      cost: newValues.cost,
      sales_contact_name: newValues.sales_contact_name,
      sales_contact_information: newValues.sales_contact_information,
    }

    if (
      newValues.name.length > 0 &&
      newValues.brand_id !== undefined &&
      newValues.stock !== undefined &&
      body.price !== undefined &&
      newValues.margin !== undefined &&
      newValues.cost !== undefined
    ) {
      setValidationError(false)
      const executeEdition = await editProduct(body)
      if (executeEdition.message === "product updated successfully") {
        discardChanges()
      }
    } else {
      setValidationError(true)
    }
  }

  useEffect(() => {
    if (
      newValues !== null &&
      productSelected !== undefined &&
      JSON.stringify(newValues) ===
        JSON.stringify(productsList[productSelected])
    ) {
      setContentOfEditableRow()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newValues, activeEdition, productSelected])

  useEffect(() => {
    if (
      newValues !== null &&
      JSON.stringify(newValues) !==
        JSON.stringify(productsList[productSelected]) &&
      activeEdition
    ) {
      setStockChanges(true)
      setContentOfEditableRow()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newValues])

  const cancelDiscard = () => {
    setModalStockHasChanges(false)
  }

  return (
    <Container>
      {validationError && (
        <ErrorMessage>{texts.stockSection.errorMessage}</ErrorMessage>
      )}
      {modalStockHasChanges && (
        <ModalAlert
          success={false}
          message={{
            status: `alert`,
            icon: `IconAlert`,
            title: `${texts.stockSection.changesModal.title}`,
            content: `${texts.stockSection.changesModal.content}`,
          }}
          closeModal={cancelDiscard}
          closeRefresh={cancelDiscard}
          mainButtonContent={texts.stockSection.discard}
          secondButtonContent={texts.stockSection.cancel}
          mainAction={discardChanges}
          isNotice
        />
      )}
      <Content>
        <DataTable
          rows={rows}
          columns={columns}
          height={350}
          onRowClick={e => {
            if (!activeEdition) {
              activateRow(e.item)
            } else if (
              activeEdition &&
              e.item.id !== newValues.id &&
              stockChanges
            ) {
              setModalStockHasChanges(true)
            }
          }}
          totalPages={1}
          reference={rowRef}
          onClickNext={goNext}
          onClickBack={goPrev}
          setPage={currentPage}
        />
      </Content>

      <ButtonsContainer>
        <TextButton
          onClick={discardChanges}
          content={texts.stockSection.cancel}
          disabled={!stockChanges}
        />
        <TextButton
          onClick={saveChanges}
          cta
          content={texts.stockSection.save}
          disabled={!stockChanges}
        />
      </ButtonsContainer>
    </Container>
  )
}

export default Stock
