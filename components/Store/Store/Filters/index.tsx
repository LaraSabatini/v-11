import React, { useContext } from "react"
import { useRouter } from "next/router"
// DATA STORAGE & TYPES
import { StoreContext } from "contexts/Store"
import texts from "strings/store.json"
import OptionsInterface from "interfaces/store/OptionsInterface"
// COMPONENTS & STYLING
import Icon from "components/UI/Assets/Icon"
import {
  FiltersContainer,
  Select,
  IconContainer,
  Selector,
  Option,
} from "../../styles"

const Filters = () => {
  const {
    categories,
    openTypeMenu,
    setOpenTypeMenu,
    selectFilter,
  } = useContext(StoreContext)

  const router = useRouter()

  return (
    <FiltersContainer>
      {router.query.store === "true" && (
        <Select
          onClick={() => {
            setOpenTypeMenu(!openTypeMenu)
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
                categories.map((category: OptionsInterface) => (
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
      )}
    </FiltersContainer>
  )
}

export default Filters
