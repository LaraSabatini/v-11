import React, { useContext, useState } from "react"
import { PartnersContext } from "contexts/Partners"
import SearchBar from "components/UI/SearchBar"
import PopOver from "components/UI/PopOver"
import Icon from "components/UI/Assets/Icon"
import { SearchBarContainer, HelpContainer } from "./styles"

interface SearchInterface {
  title: string
  description: string
  getVirginList: () => void
  searchPartnerInDB: () => void
}

function Search({
  title,
  description,
  getVirginList,
  searchPartnerInDB,
}: SearchInterface) {
  const {
    hasChanges,
    setModalHasChanges,
    setDetailState,
    searchValue,
    setSearchValue,
  } = useContext(PartnersContext)

  const [popOverView, setPopOverView] = useState<boolean>(false)

  return (
    <SearchBarContainer
      onClick={() => {
        if (hasChanges) {
          setModalHasChanges(true)
        } else {
          setDetailState("view")
        }
      }}
    >
      <SearchBar
        searchValue={searchValue}
        onChangeSearch={e => {
          if (e.target.value === "") {
            getVirginList()
            setSearchValue("")
          } else {
            setSearchValue(e.target.value)
          }
        }}
        width={250}
        enterSearch={searchPartnerInDB}
      />
      <HelpContainer onClick={() => setPopOverView(!popOverView)}>
        <PopOver title={title} description={description} view={popOverView} />
        <Icon icon="IconHelp" />
      </HelpContainer>
    </SearchBarContainer>
  )
}

export default Search
