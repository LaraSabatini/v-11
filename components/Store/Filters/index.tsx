import React, { useContext } from "react"
import texts from "strings/store.json"
import Icon from "components/UI/Assets/Icon"
import { StoreContext } from "contexts/Store"
import {
  FiltersContainer,
  Select,
  IconContainer,
  Selector,
  Option,
} from "../styles"

const Filters = () => {
  const {
    categories,
    // brands,
    openTypeMenu,
    setOpenTypeMenu,
    // openBrandMenu,
    setOpenBrandMenu,
    selectFilter,
  } = useContext(StoreContext)

  return (
    <FiltersContainer>
      <Select
        onClick={() => {
          setOpenTypeMenu(!openTypeMenu)
          setOpenBrandMenu(false)
        }}
      >
        <div className="select">
          <p>{texts.type}</p>
          <IconContainer>
            <Icon icon="IconArrowLeft" />
          </IconContainer>
        </div>
        {openTypeMenu && (
          <Selector>
            {categories.length &&
              categories.map((category: { id: number; name: string }) => (
                <Option
                  key={category.id}
                  onClick={() => selectFilter(category.id)}
                >
                  {category.name}
                </Option>
              ))}
            <Option onClick={() => selectFilter(null)}>{texts.all}</Option>
          </Selector>
        )}
      </Select>
      {/* <Select
        onClick={() => {
          setOpenBrandMenu(!openBrandMenu)
          setOpenTypeMenu(false)
        }}
      >
        <div>
          <p>{texts.brand}</p>
          <IconContainer>
            <Icon icon="IconArrowLeft" />
          </IconContainer>
        </div>
        {openBrandMenu && (
          <Selector>
            {brands.length &&
              brands.map((brand: { id: number; name: string }) => (
                <Option key={brand.id}>{brand.name}</Option>
              ))}
          </Selector>
        )}
      </Select> */}
    </FiltersContainer>
  )
}

export default Filters
