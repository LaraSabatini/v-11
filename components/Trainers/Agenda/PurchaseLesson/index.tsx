import React from "react"
import Icon from "components/UI/Assets/Icon"
import { PurchaseButton } from "./styles"

function PurchaseLesson() {
  return (
    <div>
      <PurchaseButton>
        <Icon icon="IconAdd" color="#fff" />
      </PurchaseButton>
    </div>
  )
}

export default PurchaseLesson
