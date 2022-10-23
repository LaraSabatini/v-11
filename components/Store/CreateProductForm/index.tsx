import React, { useContext, useState, useEffect } from "react"
// SERVICES
import { createProduct } from "services/Store/Products.service"
// DATA STORAGE & TYPES
import { StoreContext } from "contexts/Store"
import storeTexts from "strings/store.json"
import generalTexts from "strings/general.json"
import ProductInterface from "interfaces/store/ProductInterface"
import DefaultInterface from "interfaces/components/DefaultInterface"
import OptionsInterface from "interfaces/store/OptionsInterface"
// COMPONENTS & STYLING
import TextField from "components/UI/TextField"
import Autocomplete from "components/UI/Autocomplete"
import ModalForm from "components/UI/ModalForm"
import { Form, HorizontalGroup } from "./styles"

interface CreateInterface {
  cancelCreate: () => void
}

function CreateProductForm({ cancelCreate }: CreateInterface) {
  const {
    categories,
    brands,
    setModalSuccess,
    setModalError,
    nameRef,
    brandsRef,
    categoriesRef,
    costRef,
    marginRef,
    stockRef,
    autoCompleteCategoriesValues,
    setAutoCompleteCategoriesValues,
    autoCompleteBrandsValues,
    setAutoCompleteBrandsValues,
    priceRef,
  } = useContext(StoreContext)
  const [disabledButton, setDisabledButton] = useState<boolean>(false)

  const [brandSelected, setBrandSelected] = useState<string>("")
  const [newProductData, setNewProductData] = useState<ProductInterface>({
    id: 0,
    name: "",
    brand_id: 0,
    category_id: 0,
    stock: 0,
    price: 0,
    margin: 0,
    cost: 0,
    sales_contact_name: "",
    sales_contact_information: "",
  })

  const fillAutocompletes = () => {
    const autocompleteBrands: DefaultInterface[] = []
    brands.map((brand: OptionsInterface) =>
      autocompleteBrands.push({ id: brand.id, display_name: brand.name }),
    )
    const autocompleteCategories: DefaultInterface[] = []
    categories.map((category: OptionsInterface) =>
      autocompleteCategories.push({
        id: category.id,
        display_name: category.name,
      }),
    )
    setAutoCompleteBrandsValues(autocompleteBrands)
    setAutoCompleteCategoriesValues(autocompleteCategories)
  }

  const handleCreate = async e => {
    e.preventDefault()

    await nameRef.current?.focus()
    await brandsRef.current?.focus()
    await costRef.current?.focus()
    await priceRef.current?.focus()
    await categoriesRef.current?.focus()
    await nameRef.current?.focus()

    if (
      nameRef.current.attributes.getNamedItem("data-error").value === "false" &&
      brandsRef.current.attributes.getNamedItem("data-error").value ===
        "false" &&
      categoriesRef.current.attributes.getNamedItem("data-error").value ===
        "false" &&
      costRef.current.attributes.getNamedItem("data-error").value === "false" &&
      priceRef.current.attributes.getNamedItem("data-error").value === "false"
    ) {
      setDisabledButton(true)
      const body = {
        ...newProductData,
        name: `${newProductData.name} ${brandSelected}`,
      }
      const data = await createProduct(body)

      if (data.message === "Product created successfully") {
        setModalSuccess({
          status: "success",
          icon: "IconCheckModal",
          title: `${generalTexts.modalTitles.success}`,
          content: `${storeTexts.create.success.content}`,
        })
        cancelCreate()
        setDisabledButton(false)
      } else {
        setModalError({
          status: "alert",
          icon: "IconExclamation",
          title: `${generalTexts.modalTitles.error}`,
          content: `${storeTexts.create.error.content}`,
        })
        setDisabledButton(false)
      }
    }
  }

  const calculateMargin = () => {
    const stringCost = `${newProductData.cost}`
    const stringPrice = `${newProductData.price}`
    const cost = parseFloat(stringCost)
    const price = parseFloat(stringPrice)
    const porcentaje = price - cost

    setNewProductData({ ...newProductData, margin: porcentaje })
  }

  useEffect(() => {
    calculateMargin()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newProductData.price, newProductData.cost])

  useEffect(() => {
    fillAutocompletes()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <ModalForm
      title={storeTexts.create.title}
      cancelButtonContent={generalTexts.actions.cancel}
      submitButtonContent={generalTexts.actions.create}
      submit={handleCreate}
      cancelFunction={cancelCreate}
      disabledButton={disabledButton}
    >
      <Form>
        <HorizontalGroup>
          <TextField
            required
            label={generalTexts.labels.name}
            width={180}
            type="text"
            reference={nameRef}
            onChange={e =>
              setNewProductData({ ...newProductData, name: e.target.value })
            }
          />
          <Autocomplete
            required
            label={storeTexts.brand}
            width={180}
            options={autoCompleteBrandsValues}
            ref={brandsRef}
            onChangeProps={(e: { id: number; display_name: string }) => {
              setNewProductData({ ...newProductData, brand_id: e.id })
              setBrandSelected(e.display_name)
            }}
          />
        </HorizontalGroup>

        <HorizontalGroup>
          <TextField
            required
            label={storeTexts.create.cost}
            width={118}
            type="text"
            reference={costRef}
            onChange={e => {
              setNewProductData({
                ...newProductData,
                cost: parseFloat(e.target.value),
              })
            }}
          />

          <TextField
            width={115}
            required
            label={generalTexts.payments.price}
            type="number"
            reference={priceRef}
            onChange={e =>
              setNewProductData({
                ...newProductData,
                price: parseFloat(e.target.value),
              })
            }
          />
          <TextField
            disabled
            disabledAutocompleted
            label={storeTexts.create.margin}
            type="text"
            width={118}
            reference={marginRef}
            value={
              // eslint-disable-next-line no-restricted-globals
              isNaN(newProductData.margin) ? "0" : `${newProductData.margin}`
            }
          />
        </HorizontalGroup>
        <HorizontalGroup>
          <Autocomplete
            required
            label={storeTexts.create.category}
            width={200}
            options={autoCompleteCategoriesValues}
            ref={categoriesRef}
            onChangeProps={(e: { id: number; display_name: string }) =>
              setNewProductData({ ...newProductData, category_id: e.id })
            }
          />
          <TextField
            required
            label={storeTexts.stock}
            type="number"
            width={160}
            reference={stockRef}
            onChange={e => {
              setNewProductData({
                ...newProductData,
                stock: parseInt(e.target.value, 10),
              })
            }}
          />
        </HorizontalGroup>
        <HorizontalGroup>
          <TextField
            label={storeTexts.create.seller}
            type="text"
            width={180}
            onChange={e =>
              setNewProductData({
                ...newProductData,
                sales_contact_name: e.target.value,
              })
            }
          />
          <TextField
            label={storeTexts.create.sellerContact}
            type="text"
            width={180}
            onChange={e =>
              setNewProductData({
                ...newProductData,
                sales_contact_information: e.target.value,
              })
            }
          />
        </HorizontalGroup>
      </Form>
    </ModalForm>
  )
}

export default CreateProductForm
