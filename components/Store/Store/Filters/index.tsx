import React, { useContext } from "react"
// DATA STORAGE & TYPES
import { StoreContext } from "contexts/Store"
import storeTexts from "strings/store.json"
import generalTexts from "strings/general.json"
import OptionsInterface from "interfaces/store/OptionsInterface"
// COMPONENTS & STYLING
import TextButton from "components/UI/TextButton"
import Icon from "components/UI/Assets/Icon"
import TillPreview from "./TillPreview"
import {
  FiltersContainer,
  Select,
  IconContainer,
  Selector,
  Option,
} from "../../styles"

function Filters() {
  const {
    categories,
    openTypeMenu,
    setOpenTypeMenu,
    selectFilter,
    tillPreview,
    setTillPreview,
  } = useContext(StoreContext)

  return (
    <FiltersContainer>
      <TextButton onClick={() => setTillPreview(true)} content="Caja" cta />
      {tillPreview && (
        <TillPreview closeTillPreview={() => setTillPreview(false)} />
      )}
      <Select
        onClick={() => {
          setOpenTypeMenu(!openTypeMenu)
        }}
      >
        <div className="select">
          <p>{storeTexts.type}</p>
          <IconContainer>
            <Icon icon="IconArrowLeft" />
          </IconContainer>
        </div>
        {openTypeMenu && (
          <Selector>
            {categories.length &&
              categories.map((category: OptionsInterface) => (
                <Option
                  key={category.id}
                  onClick={() => selectFilter(category.id)}
                >
                  {category.name}
                </Option>
              ))}
            <Option onClick={() => selectFilter(null)}>
              {generalTexts.all}
            </Option>
          </Selector>
        )}
      </Select>
    </FiltersContainer>
  )
}

export default Filters
