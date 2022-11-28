import React, { useContext, useState, useEffect } from "react"
import { Lessons } from "contexts/Lessons"
import { searchPartnerAction } from "helpers/partners"
import trainerTexts from "strings/trainers.json"
import SearchBar from "components/UI/SearchBar"
import PopOver from "components/UI/PopOver"
import Icon from "components/UI/Assets/Icon"
import {
  SearchContainer,
  PopOverContainer,
  SelectedClient,
  IconContainer,
} from "./styles"

function SelectPartner() {
  const {
    cleanStates,
    searchValue,
    setSearchValue,
    clientSelected,
    setSearchResults,
  } = useContext(Lessons)

  const [popOverView, setPopOverView] = useState<boolean>(false)

  const searchClients = async () => {
    if (searchValue.length > 3) {
      const searchCall = await searchPartnerAction(searchValue)
      setSearchResults(searchCall.data)
    } else {
      setSearchResults([])
    }
  }

  useEffect(() => {
    searchClients()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue])

  return (
    <SearchContainer>
      <SearchBar
        searchValue={searchValue}
        onChangeSearch={e => setSearchValue(e.target.value)}
        width={220}
        enterSearch={e => e.preventDefault()}
      />
      <PopOverContainer>
        <PopOver
          title={trainerTexts.createPurchase.search}
          description={trainerTexts.createPurchase.searchDescription}
          view={popOverView}
        />
      </PopOverContainer>
      <IconContainer
        onClick={e => {
          e.preventDefault()
          setPopOverView(!popOverView)
        }}
      >
        <Icon icon="IconHelp" />
      </IconContainer>
      <SelectedClient>
        <p>
          {clientSelected?.name} {clientSelected?.last_name}
        </p>
        <button onClick={() => cleanStates()} type="button">
          <Icon icon="IconMenuOff" />
        </button>
      </SelectedClient>
    </SearchContainer>
  )
}

export default SelectPartner
