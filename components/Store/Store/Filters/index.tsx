import React, { useContext, useState, useRef } from "react"
import texts from "strings/store.json"
import Icon from "components/UI/Assets/Icon"
import InputCalendar from "components/UI/InputCalendar"
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
    paymentMethods,
    setDateSelected,
    setPaymentFilter,
    paymentFilter,
  } = useContext(StoreContext)

  const calendarRef = useRef(null)
  const [paymentTypeMenu, setPaymentTypeMenu] = useState<boolean>(false)

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
        <div className="other">
          <InputCalendar
            width={250}
            onChange={e => {
              setDateSelected(
                `${e.selectedChangeDate.slice(
                  0,
                  2,
                )}-${e.selectedChangeDate.slice(
                  3,
                  5,
                )}-${e.selectedChangeDate.slice(6, 10)}`,
              )
            }}
            reference={calendarRef}
          />
          <Select
            onClick={() => {
              setPaymentTypeMenu(!paymentTypeMenu)
            }}
          >
            <div className="select">
              {paymentFilter === null && <p>Metodo de pago</p>}
              {paymentFilter === 1 && <p>Efectivo</p>}
              {paymentFilter === 2 && <p>MP</p>}

              <IconContainer>
                <Icon icon="IconArrowLeft" />
              </IconContainer>
            </div>
            {paymentTypeMenu && (
              <Selector>
                {paymentMethods.length &&
                  paymentMethods.map((p: { id: number; name: string }) => (
                    <Option key={p.id} onClick={() => setPaymentFilter(p.id)}>
                      {p.name}
                    </Option>
                  ))}
                <Option onClick={() => setPaymentFilter(null)}>
                  {texts.all}
                </Option>
              </Selector>
            )}
          </Select>
        </div>
      )}
    </FiltersContainer>
  )
}

export default Filters
