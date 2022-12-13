import React, { useState, useEffect, useContext } from "react"
import { editProductAction, getProductsAction } from "helpers/store"
import { StoreContext } from "contexts/Store"
import storeTexts from "strings/store.json"
import generalTexts from "strings/general.json"
import OptionsInterface from "interfaces/store/OptionsInterface"
import DefaultInterface from "interfaces/components/DefaultInterface"
import ModalAlert from "components/UI/ModalAlert"
import ProductInterface from "interfaces/store/ProductInterface"
import TextButton from "components/UI/TextButton"
import TextField from "components/UI/TextField"
import Autocomplete from "components/UI/Autocomplete"
import cleanMargin from "utils/cleanMargin"
import {
  Container,
  ButtonsContainer,
  Content,
  AutocompleteContainer,
  ErrorMessage,
  TextFieldContainer,
  Table,
  FilterRow,
  Line,
  Tab,
  InfoRow,
  ProductsRow,
  Status,
  Products,
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
  } = useContext(StoreContext)

  const [productSelected, setProductSelected] = useState<number>(0)
  const [newValues, setNewValues] = useState<ProductInterface>(null)
  const [validationError, setValidationError] = useState<boolean>(false)

  const [filterSelected, setFilterSelected] = useState<{
    value: string
    text: string
    category: number
  }>({ value: "all", text: "Todos", category: 0 })
  const [productsListFiltered, setProductsListFiltered] = useState<
    ProductInterface[]
  >([])

  const filters = [
    {
      value: "all",
      text: "Todos",
      category: 0,
    },
    {
      value: "drinks",
      text: "Bebidas",
      category: 1,
    },
    {
      value: "magnesium",
      text: "Magnesio",
      category: 2,
    },
    {
      value: "shoes",
      text: "Zapatillas",
      category: 3,
    },
    {
      value: "energy-drinks",
      text: "Energizante",
      category: 4,
    },
    {
      value: "climbing-day",
      text: "Dia escalada",
      category: 5,
    },
  ]

  const fillRows = async () => {
    const data = await getProductsAction(1)
    setProductsList(data)
    setProductsListFiltered(data)
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
  }, [searchValueForStock, brands, categories])

  const discardChanges = () => {
    setModalStockHasChanges(false)
    setStockChanges(false)
    setNewValues(null)
    fillRows()
    setProductSelected(0)
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
        setStockChanges(false)
      }
    } else {
      setValidationError(true)
    }
  }

  useEffect(() => {
    if (productSelected !== 0) {
      setStockChanges(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newValues])

  const cancelDiscard = () => {
    setModalStockHasChanges(false)
  }

  const selectFilter = (type: {
    value: string
    text: string
    category: number
  }) => {
    if (filterSelected.value === "all" || filterSelected.value !== type.value) {
      setFilterSelected(type)
      const listFiltered = productsList.filter(
        product => product.category_id === type.category,
      )
      setProductsListFiltered(listFiltered)
    } else if (filterSelected === type) {
      setFilterSelected({ value: "all", text: "Todos", category: 0 })
      setProductsListFiltered(productsList)
    }
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
        <Table>
          <FilterRow>
            {filters.map(
              (filter: { value: string; text: string; category: number }) => {
                return (
                  <Tab
                    key={filter.value}
                    selected={filterSelected.value === filter.value}
                    onClick={() => {
                      selectFilter(filter)
                    }}
                  >
                    {filter.text}
                  </Tab>
                )
              },
            )}
            <Line filterSelected={filterSelected.value} />
          </FilterRow>
          <InfoRow>
            <p className="item">Item</p>
            <p className="brand">Marca</p>
            <p className="brand">Categoria</p>
            <p className="stock">Stock</p>
            <p className="stock">Precio</p>
            <p className="earning">Ganancia ($)</p>
            <p className="stock">Costo</p>
            <p className="brand">Proveedor</p>
            <p className="brand">N° de telefono</p>
            <p className="stock">Activo</p>
          </InfoRow>
          <Products>
            {productsListFiltered.map((product: ProductInterface) => (
              <ProductsRow
                onClick={() => {
                  if (productSelected === 0 && editPermits) {
                    setProductSelected(product.id)
                    setNewValues(product)
                  }
                }}
              >
                <Status status={product.stock >= 10 ? "green" : "red"} />
                {productSelected === product.id ? (
                  <TextFieldContainer className="input-name">
                    <TextField
                      label=""
                      type="text"
                      width={140}
                      value={`${newValues?.name}` || ""}
                      onChange={e =>
                        setNewValues({ ...newValues, name: e.target.value })
                      }
                      keyDown={() => {}}
                    />
                  </TextFieldContainer>
                ) : (
                  <p className="item">{product.name}</p>
                )}

                {productSelected === product.id ? (
                  <AutocompleteContainer className="input-brand">
                    <Autocomplete
                      width={120}
                      options={autoCompleteBrandsValues}
                      setValue={
                        brands.filter(
                          (brand: DefaultInterface) =>
                            brand.id === newValues?.brand_id,
                        )[0]?.name || ""
                      }
                      onChangeProps={(e: DefaultInterface) =>
                        setNewValues({ ...newValues, brand_id: e.id })
                      }
                    />
                  </AutocompleteContainer>
                ) : (
                  <p className="brand">
                    {
                      brands.filter(
                        (brand: OptionsInterface) =>
                          brand.id === product.brand_id,
                      )[0]?.name
                    }
                  </p>
                )}

                {productSelected === product.id ? (
                  <AutocompleteContainer className="input-brand">
                    <Autocomplete
                      width={120}
                      options={autoCompleteCategoriesValues}
                      setValue={
                        categories.filter(
                          (category: DefaultInterface) =>
                            category.id === newValues?.category_id,
                        )[0]?.name || ""
                      }
                      onChangeProps={(e: DefaultInterface) =>
                        setNewValues({ ...newValues, category_id: e.id })
                      }
                    />
                  </AutocompleteContainer>
                ) : (
                  <p className="brand">
                    {
                      categories.filter(
                        (category: OptionsInterface) =>
                          category.id === product.category_id,
                      )[0]?.name
                    }
                  </p>
                )}

                {productSelected === product.id ? (
                  <TextFieldContainer className="input-stock">
                    <TextField
                      label=""
                      type="number"
                      width={70}
                      value={`${newValues?.stock}` || ""}
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
                      keyDown={() => {}}
                    />
                  </TextFieldContainer>
                ) : (
                  <p className="stock">{product.stock}</p>
                )}

                {productSelected === product.id ? (
                  <TextFieldContainer className="input-stock">
                    <TextField
                      label=""
                      type="number"
                      width={70}
                      value={`${newValues?.price}` || ""}
                      onChange={e => {
                        if (e.target.value === "-" || e.target.value === "") {
                          setNewValues({
                            ...newValues,
                            price: 0,
                          })
                        } else {
                          setNewValues({
                            ...newValues,
                            price: parseInt(e.target.value, 10),
                          })
                        }
                      }}
                      keyDown={() => {}}
                    />
                  </TextFieldContainer>
                ) : (
                  <p className="stock">{product.price}</p>
                )}

                {productSelected === product.id ? (
                  <TextFieldContainer className="input-margin">
                    <TextField
                      label=""
                      type="number"
                      width={80}
                      disabled
                      disabledAutocompleted
                      value={`${newValues?.price - newValues?.cost}` || ""}
                    />
                  </TextFieldContainer>
                ) : (
                  <p className="earning">
                    {cleanMargin(`${product.margin}`.split("."))}
                  </p>
                )}

                {productSelected === product.id ? (
                  <TextFieldContainer className="input-cost">
                    <TextField
                      label=""
                      type="number"
                      width={70}
                      value={`${newValues?.cost}` || ""}
                      // onChange={e =>
                      //   setNewValues({ ...newValues, cost: e.target.value })
                      // }
                      onChange={e => {
                        if (e.target.value === "-" || e.target.value === "") {
                          setNewValues({
                            ...newValues,
                            cost: 0,
                          })
                        } else {
                          setNewValues({
                            ...newValues,
                            cost: parseFloat(e.target.value),
                          })
                        }
                      }}
                      keyDown={() => {}}
                    />
                  </TextFieldContainer>
                ) : (
                  <p className="stock">{product.cost}</p>
                )}

                {productSelected === product.id ? (
                  <TextFieldContainer className="input-provider">
                    <TextField
                      label=""
                      type="text"
                      width={120}
                      value={`${newValues?.sales_contact_name}` || ""}
                      onChange={e =>
                        setNewValues({
                          ...newValues,
                          sales_contact_name: e.target.value,
                        })
                      }
                      keyDown={() => {}}
                    />
                  </TextFieldContainer>
                ) : (
                  <p className="brand">
                    {product.sales_contact_name === ""
                      ? "-"
                      : product.sales_contact_name}
                  </p>
                )}

                {productSelected === product.id ? (
                  <TextFieldContainer className="input-provider">
                    <TextField
                      label=""
                      type="text"
                      width={120}
                      value={`${newValues?.sales_contact_information}` || ""}
                      onChange={e =>
                        setNewValues({
                          ...newValues,
                          sales_contact_information: e.target.value,
                        })
                      }
                      keyDown={() => {}}
                    />
                  </TextFieldContainer>
                ) : (
                  <p className="brand">
                    {product.sales_contact_information === ""
                      ? "-"
                      : product.sales_contact_information}
                  </p>
                )}
              </ProductsRow>
            ))}
          </Products>
        </Table>
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
