import React, { useContext } from "react"
import { Lessons } from "contexts/Lessons"
import PartnerInterface from "interfaces/partners/PartnerInterface"
import trainerTexts from "strings/trainers.json"
import generalTexts from "strings/general.json"
import yesOrNoArr from "const/fixedVariables"
import ScrollView from "components/UI/ScrollView"
import ModalForm from "components/UI/ModalForm"
import Autocomplete from "components/UI/Autocomplete"
import SelectPartner from "./SelectPartner"
import SelectLessons from "./SelectLessons"
import { Form, HorizontalGroup, Results, ListItem } from "./styles"

interface CreatePurchaseInterface {
  cancelCreatePurchase: () => void
}

function CreatePurchase({ cancelCreatePurchase }: CreatePurchaseInterface) {
  const {
    clientRef,
    setClientSelected,
    setClientIsRegistered,
    clientIsRegistered,
    searchResults,
    searchValue,
    clientSelected,
    setSearchResults,
    setSearchValue,
  } = useContext(Lessons)

  const handleCreatePurchase = e => {
    e.preventDefault()
  }

  return (
    <ModalForm
      title={trainerTexts.createPurchase.title}
      cancelButtonContent={generalTexts.actions.cancel}
      submitButtonContent={generalTexts.actions.create}
      submit={handleCreatePurchase}
      cancelFunction={cancelCreatePurchase}
      //   disabledButton={
      //     (!canExecute || disablePurchaseButton) && !identificationError
      //   }
    >
      <Form>
        <HorizontalGroup>
          <Autocomplete
            label={trainerTexts.createPurchase.registeredLabel}
            required
            width={200}
            options={yesOrNoArr}
            ref={clientRef}
            onChangeProps={(e: { id: number; display_name: string }) => {
              if (e.id === 1) {
                setClientIsRegistered(true)
                setClientSelected(null)
              } else {
                setClientIsRegistered(false)
                setClientSelected(null)
              }
            }}
          />
          {clientIsRegistered && <SelectPartner />}
        </HorizontalGroup>
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

        {((clientIsRegistered && clientSelected !== null) ||
          (!clientIsRegistered &&
            clientIsRegistered !== null &&
            clientSelected === null)) && <SelectLessons />}
      </Form>
    </ModalForm>
  )
}

export default CreatePurchase
