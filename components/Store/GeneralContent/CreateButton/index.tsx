import React, { useContext, useState } from "react"
import { StoreContext } from "contexts/Store"
import theme from "theme/index"
import Icon from "components/UI/Assets/Icon"
import {
  MainButton,
  CreateProduct,
  CreateBrandButton,
  ProductButton,
  CreateCategoryButton,
} from "./styles"

function CreateProductButton() {
  const {
    stockChanges,
    setModalStockHasChanges,
    setCreateProductModal,
    setCreateBrandModal,
    setCreateCategoryModal,
  } = useContext(StoreContext)

  const [viewSubButtons, setViewSubButtons] = useState<boolean>(false)

  return (
    <MainButton>
      {viewSubButtons && (
        <>
          <ProductButton
            onClick={() => {
              setCreateProductModal(true)
              setViewSubButtons(false)
            }}
            className="subbutton"
          >
            Producto
          </ProductButton>
          <CreateBrandButton
            onClick={() => {
              setCreateBrandModal(true)
              setViewSubButtons(false)
            }}
            className="subbutton"
          >
            Marca
          </CreateBrandButton>
          <CreateCategoryButton
            onClick={() => {
              setCreateCategoryModal(true)
              setViewSubButtons(false)
            }}
            className="subbutton"
          >
            Categoria
          </CreateCategoryButton>
        </>
      )}
      <CreateProduct
        onClick={() => {
          if (stockChanges) {
            setModalStockHasChanges(true)
          } else {
            setViewSubButtons(!viewSubButtons)
          }
        }}
      >
        <Icon color={theme.colors.white} icon="IconAdd" />
      </CreateProduct>
    </MainButton>
  )
}

export default CreateProductButton
