import React, { useContext } from "react"
import { Lessons } from "contexts/Lessons"
import trainerTexts from "strings/trainers.json"
import PartnerInterface from "interfaces/partners/PartnerInterface"
import ScrollView from "components/UI/ScrollView"
import { Results, ListItem } from "./styles"

function SearchResults() {
  const {
    setClientSelected,
    searchResults,
    searchValue,
    clientSelected,
    setSearchResults,
    setSearchValue,
  } = useContext(Lessons)
  return (
    <Results>
      {searchValue !== "" && (
        <>
          <p className="title">{trainerTexts.createPurchase.results}</p>
          <ScrollView height={150}>
            {searchResults.length > 0 &&
              searchResults.map((client: PartnerInterface) => (
                <ListItem
                  selected={client.id === clientSelected?.id}
                  key={client.id}
                  onClick={() => {
                    setClientSelected(client)
                    setSearchResults([])
                    setSearchValue("")
                  }}
                >
                  <span>
                    • {client.name} {client.last_name}
                  </span>
                </ListItem>
              ))}
          </ScrollView>
        </>
      )}
    </Results>
  )
}

export default SearchResults
