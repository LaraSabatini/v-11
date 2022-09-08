import React, { useContext, useState, useEffect } from "react"
import { StoreContext } from "contexts/Store"
import texts from "strings/store.json"
import createProduct from "services/Store/createProduct.service"
import ProductInterface from "interfaces/store/ProductInterface"
import TextField from "components/UI/TextField"
import Autocomplete from "components/UI/Autocomplete"
import ModalForm from "components/UI/ModalForm"
import { Form, HorizontalGroup } from "./styles"

interface CreateInterface {
  cancelCreate: () => void
}

const CreateProductForm = ({ cancelCreate }: CreateInterface) => {
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
  } = useContext(StoreContext)
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

  const handleCreate = async e => {
    e.preventDefault()

    await nameRef.current?.focus()
    await brandsRef.current?.focus()
    await costRef.current?.focus()
    await marginRef.current?.focus()
    await categoriesRef.current?.focus()
    await nameRef.current?.focus()

    if (
      nameRef.current.attributes.getNamedItem("data-error").value === "false" &&
      brandsRef.current.attributes.getNamedItem("data-error").value ===
        "false" &&
      categoriesRef.current.attributes.getNamedItem("data-error").value ===
        "false" &&
      costRef.current.attributes.getNamedItem("data-error").value === "false" &&
      marginRef.current.attributes.getNamedItem("data-error").value === "false"
    ) {
      const body = {
        ...newProductData,
        name: `${newProductData.name} ${brandSelected}`,
      }
      const data = await createProduct(body)

      if (data.message === "Product created successfully") {
        setModalSuccess({
          status: "success",
          icon: "IconCheckModal",
          title: `${texts.create.success.title}`,
          content: `${texts.create.success.content}`,
        })
        cancelCreate()
      } else {
        setModalError({
          status: "alert",
          icon: "IconExclamation",
          title: `${texts.create.error.title}`,
          content: `${texts.create.error.content}`,
        })
      }
    }
  }

  // calculate price by cost & margin
  const calculatePrice = () => {
    const stringMargin = `${newProductData.margin}`
    const stringCost = `${newProductData.cost}`
    const margin = parseInt(stringMargin, 10)
    const cost = parseInt(stringCost, 10)
    const porcentaje = (margin * cost) / 100
    const total = cost + porcentaje

    setNewProductData({ ...newProductData, price: total })
  }

  useEffect(() => {
    calculatePrice()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newProductData.margin, newProductData.cost])

  useEffect(() => {
    fillAutocompletes()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <ModalForm
      title={texts.create.title}
      cancelButtonContent={texts.create.cancel}
      submitButtonContent={texts.create.submit}
      submit={handleCreate}
      cancelFunction={cancelCreate}
    >
      <Form>
        <HorizontalGroup>
          <TextField
            required
            label={texts.create.name}
            width={180}
            type="text"
            reference={nameRef}
            onChange={e =>
              setNewProductData({ ...newProductData, name: e.target.value })
            }
          />
          <Autocomplete
            required
            label={texts.brand}
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
            label={texts.create.cost}
            width={118}
            type="number"
            reference={costRef}
            onChange={e =>
              setNewProductData({ ...newProductData, cost: e.target.value })
            }
          />
          <TextField
            required
            label={texts.create.margin}
            type="number"
            width={118}
            reference={marginRef}
            onChange={e =>
              setNewProductData({ ...newProductData, margin: e.target.value })
            }
          />
          <TextField
            disabled
            disabledAutocompleted
            width={115}
            label={texts.create.price}
            type="number"
            value={
              // eslint-disable-next-line no-restricted-globals
              isNaN(newProductData.price) ? "0" : `${newProductData.price}`
            }
          />
        </HorizontalGroup>
        <HorizontalGroup>
          <Autocomplete
            required
            label={texts.create.category}
            width={200}
            options={autoCompleteCategoriesValues}
            ref={categoriesRef}
            onChangeProps={(e: { id: number; display_name: string }) =>
              setNewProductData({ ...newProductData, category_id: e.id })
            }
          />
          <TextField
            required
            label={texts.stock}
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
            label={texts.create.seller}
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
            label={texts.create.sellerContact}
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
