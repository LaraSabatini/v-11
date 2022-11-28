import React, { useContext } from "react"
import { StoreContext } from "contexts/Store"
import theme from "theme/index"
import storeTexts from "strings/store.json"
import Tooptip from "components/UI/Tooltip"
import Icon from "components/UI/Assets/Icon"
import { MainButton, CreateProduct } from "./styles"

function CreateProductButton() {
  const {
    stockChanges,
    setModalStockHasChanges,
    setCreateProductModal,
  } = useContext(StoreContext)

  return (
    <MainButton>
      <Tooptip title={storeTexts.mainButton}>
        <CreateProduct
          onClick={() => {
            if (stockChanges) {
              setModalStockHasChanges(true)
            } else {
              setCreateProductModal(true)
            }
          }}
        >
          <Icon color={theme.colors.white} icon="IconAdd" />
        </CreateProduct>
      </Tooptip>
    </MainButton>
  )
}

export default CreateProductButton
