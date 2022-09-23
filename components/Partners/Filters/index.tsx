import React, { useContext } from "react"
import { PartnersContext } from "contexts/Partners"
import { FiltersContainer, Filter } from "../styles"

const Filters = () => {
  const {
    filterSelected,
    filters,
    hasChanges,
    setModalHasChanges,
    setDetailState,
    setFilterSelected,
    setPartnerSelected,
  } = useContext(PartnersContext)

  const selectFilter = (type: string) => {
    if (filterSelected === "all" || filterSelected !== type) {
      setFilterSelected(type)
      setPartnerSelected(null)
    } else if (filterSelected === type) {
      setFilterSelected("all")
      setPartnerSelected(null)
    }
  }

  return (
    <FiltersContainer>
      {filters &&
        filters.map((filter: { value: string; text: string }) => {
          return (
            <Filter
              key={filter.value}
              selected={filterSelected === filter.value}
              onClick={() => {
                if (hasChanges) {
                  setModalHasChanges(true)
                } else {
                  setDetailState("view")
                  selectFilter(filter.value)
                }
              }}
            >
              {filter.text}
            </Filter>
          )
        })}
    </FiltersContainer>
  )
}

export default Filters
