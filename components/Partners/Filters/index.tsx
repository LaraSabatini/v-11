import React, { useContext } from "react"
// DATA STORAGE & TYPES
import { PartnersContext } from "contexts/Partners"
import clientFilters from "const/partners"
// COMPONENTS & STYLING
import { FiltersContainer, Filter } from "../styles"

function Filters() {
  const {
    filterSelected,
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
      {clientFilters &&
        clientFilters.map((filter: { value: string; text: string }) => {
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
