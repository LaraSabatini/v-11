import React, { useContext, useState } from "react"
import { StoreContext } from "contexts/Store"
import generalTexts from "strings/general.json"
import PopOver from "components/UI/PopOver"
import Icon from "components/UI/Assets/Icon"
import SearchBar from "components/UI/SearchBar"
import searchProducts from "../../Helpers/components/searchProducts"
import { SearchBarContainer, HelpContainer } from "./styles"

function Search() {
  const {
    searchValueForStock,
    setSearchValueForStock,
    setModalStockHasChanges,
    stockChanges,
    brands,
    categories,
    setProductsList,
    setRows,
  } = useContext(StoreContext)

  const [popOverView, setPopOverView] = useState<boolean>(false)

  const searchInDB = async () => {
    const search = await searchProducts(searchValueForStock, brands, categories)

    setProductsList(search.products)
    setRows(search.rows)
  }

  return (
    <button
      className="btn-search"
      type="button"
      onClick={() => {
        if (stockChanges) {
          setModalStockHasChanges(true)
        }
      }}
    >
      <SearchBarContainer>
        <HelpContainer onClick={() => setPopOverView(!popOverView)}>
          <PopOver
            title={generalTexts.search.title}
            description={generalTexts.search.description}
            view={popOverView}
          />
          <Icon icon="IconHelp" />
        </HelpContainer>
        <SearchBar
          searchValue={searchValueForStock}
          onChangeSearch={e => {
            if (e.target.value === "") {
              setSearchValueForStock("")
            } else {
              setSearchValueForStock(e.target.value)
            }
          }}
          width={250}
          enterSearch={searchInDB}
        />
      </SearchBarContainer>
    </button>
  )
}

export default Search
