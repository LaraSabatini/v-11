import React, { useContext, useState } from "react"
import texts from "strings/store.json"
import Icon from "components/UI/Assets/Icon"
import { StoreContext } from "contexts/Store"
import {
  FiltersContainer,
  Select,
  IconContainer,
  Selector,
  Option,
} from "../../styles"

const Filters = section => {
  const {
    categories,
    openTypeMenu,
    setOpenTypeMenu,
    selectFilter,
    months,
    setMonthSelected,
  } = useContext(StoreContext)

  const [openMonthMenu, setOpenMonthMenu] = useState<boolean>(false)

  return (
    <FiltersContainer>
      {section.section === 1 && (
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
      )}
      {section.section === 2 && (
        <Select
          onClick={() => {
            setOpenMonthMenu(!openMonthMenu)
          }}
        >
          <div className="select">
            <p>Mes</p>
            <IconContainer>
              <Icon icon="IconArrowLeft" />
            </IconContainer>
          </div>
          {openMonthMenu && (
            <Selector>
              {months.length &&
                months.map((month: { id: number; display_name: string }) => (
                  <Option
                    key={month.id}
                    onClick={() => setMonthSelected(month.id)}
                  >
                    {month.display_name}
                  </Option>
                ))}
              <Option onClick={() => setMonthSelected(null)}>
                {texts.all}
              </Option>
            </Selector>
          )}
        </Select>
      )}
    </FiltersContainer>
  )
}

export default Filters
