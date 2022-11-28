import React, { useState, useEffect, useContext, useRef } from "react"
import { editProductAction, getProductsAction } from "helpers/store"
import { StoreContext } from "contexts/Store"
import storeTexts from "strings/store.json"
import generalTexts from "strings/general.json"
import OptionsInterface from "interfaces/store/OptionsInterface"
import DefaultInterface from "interfaces/components/DefaultInterface"
import ModalAlert from "components/UI/ModalAlert"
import RowsInterface from "interfaces/store/RowsInterface"
import ProductInterface from "interfaces/store/ProductInterface"
import TextButton from "components/UI/TextButton"
import TextField from "components/UI/TextField"
import DataTable from "components/UI/DataTable"
import Autocomplete from "components/UI/Autocomplete"
import cleanMargin from "utils/cleanMargin"
import columns from "const/stockTable"
import {
  Container,
  ButtonsContainer,
  Content,
  AutocompleteContainer,
  ErrorMessage,
  TextFieldContainer,
} from "./styles"

interface StockInterface {
  editPermits: boolean
}

function Stock({ editPermits }: StockInterface) {
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
    rows,
    setRows,
  } = useContext(StoreContext)

  const [activeEdition, setActiveEdition] = useState<boolean>(false)
  const [productSelected, setProductSelected] = useState<number>()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [newValues, setNewValues] = useState<ProductInterface>(null)
  const [validationError, setValidationError] = useState<boolean>(false)

  const rowRef = useRef(null)

  const fillRows = async () => {
    const data = await getProductsAction(currentPage)
    setProductsList(data)

    const rowsCleaned: RowsInterface[] = []

    data.map((product: ProductInterface) => {
      const marginString = `${product.margin}`
      const cleanIt = cleanMargin(marginString.split("."))
      const finalMargin = cleanIt.includes(".")
        ? parseFloat(cleanIt)
        : parseInt(cleanIt, 10)

      rowsCleaned.push({
        id: product.id,
        item: product.name,
        brand: brands.filter(
          (brand: OptionsInterface) => brand.id === product.brand_id,
        )[0]?.name,
        category: categories.filter(
          (category: OptionsInterface) => category.id === product.category_id,
        )[0]?.name,
        stock: product.stock,
        price: product.price,
        margin: finalMargin,
        cost: product.cost,
        sales_contact_name: product.sales_contact_name,
        sales_contact_information: product.sales_contact_information,
      })
      return 0
    })

    setRows({
      success: true,
      rows: rowsCleaned,
    })
  }

  const fillAutocompletes = () => {
    const autocompleteBrands: DefaultInterface[] = []
    brands.map(brand =>
      autocompleteBrands.push({ id: brand.id, display_name: brand.name }),
    )
    const autocompleteCategories: DefaultInterface[] = []
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
      if (searchValueForStock === "") {
        fillRows()
        fillAutocompletes()
      }
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
        <TextFieldContainer>
          <TextField
            label=""
            type="text"
            width={150}
            value={newValues.name || ""}
            onChange={e => setNewValues({ ...newValues, name: e.target.value })}
          />
        </TextFieldContainer>
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
            onChangeProps={(e: DefaultInterface) =>
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
            onChangeProps={(e: DefaultInterface) =>
              setNewValues({ ...newValues, category_id: e.id })
            }
          />
        </AutocompleteContainer>
      ),
      stock: (
        <TextFieldContainer>
          <TextField
            label=""
            type="text"
            width={60}
            value={`${newValues.stock}` || ""}
            onChange={e => {
              if (e.target.value === "-" || e.target.value === "") {
                setNewValues({
                  ...newValues,
                  stock: 0,
                })
              } else {
                setNewValues({
                  ...newValues,
                  stock: parseInt(e.target.value, 10),
                })
              }
            }}
          />
        </TextFieldContainer>
      ),
      margin: newValues.price - newValues.cost,
      price: (
        <TextFieldContainer>
          <TextField
            label=""
            type="text"
            width={70}
            value={`${newValues.price}` || ""}
            onChange={e => {
              if (e.target.value === "-" || e.target.value === "") {
                setNewValues({
                  ...newValues,
                  price: 0,
                })
              } else {
                setNewValues({
                  ...newValues,
                  price: parseFloat(e.target.value),
                })
              }
            }}
          />
        </TextFieldContainer>
      ),
      cost: (
        <TextFieldContainer>
          <TextField
            label=""
            type="text"
            width={70}
            value={`${newValues.cost}` || ""}
            onChange={e => {
              if (e.target.value === "-" || e.target.value === "") {
                setNewValues({
                  ...newValues,
                  cost: 0,
                })
              } else {
                setNewValues({ ...newValues, cost: parseFloat(e.target.value) })
              }
            }}
          />
        </TextFieldContainer>
      ),
      sales_contact_name: (
        <TextFieldContainer>
          <TextField
            label=""
            type="text"
            width={150}
            value={newValues.sales_contact_name || ""}
            onChange={e =>
              setNewValues({ ...newValues, sales_contact_name: e.target.value })
            }
          />
        </TextFieldContainer>
      ),
      sales_contact_information: (
        <TextFieldContainer>
          <TextField
            label=""
            type="text"
            width={120}
            value={newValues.sales_contact_information || ""}
            onChange={e =>
              setNewValues({
                ...newValues,
                sales_contact_information: e.target.value,
              })
            }
          />
        </TextFieldContainer>
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
      price: newValues.price,
      margin: newValues.price - newValues.cost,
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
      const executeEdition = await editProductAction(body)
      if (executeEdition.status === 200) {
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
        <ErrorMessage>{storeTexts.stockSection.errorMessage}</ErrorMessage>
      )}
      {modalStockHasChanges && (
        <ModalAlert
          success={false}
          message={{
            status: `alert`,
            icon: `IconAlert`,
            title: `${generalTexts.modalTitles.discard}`,
            content: `${generalTexts.modalContent.discard}`,
          }}
          closeModal={cancelDiscard}
          closeRefresh={cancelDiscard}
          mainButtonContent={generalTexts.actions.discardChanges}
          secondButtonContent={generalTexts.actions.cancel}
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
            if (!activeEdition && editPermits) {
              activateRow(e.item)
            } else if (
              activeEdition &&
              e.item.id !== newValues.id &&
              stockChanges &&
              editPermits
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
          content={generalTexts.actions.cancel}
        />
        <TextButton
          onClick={saveChanges}
          cta
          content={generalTexts.actions.save}
          disabled={!stockChanges}
        />
      </ButtonsContainer>
    </Container>
  )
}

export default Stock