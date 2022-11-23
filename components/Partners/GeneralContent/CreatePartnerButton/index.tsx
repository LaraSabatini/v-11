import React, { useContext } from "react"
import { PartnersContext } from "contexts/Partners"
import partnerTexts from "strings/partners.json"
import generalTexts from "strings/general.json"
import theme from "theme/index"
import Tooptip from "components/UI/Tooltip"
import Icon from "components/UI/Assets/Icon"
import { MainButton, AddPartner } from "./styles"

interface CreatePermits {
  canCreate: boolean
}

function CreatePartnerButton({ canCreate }: CreatePermits) {
  const {
    hasChanges,
    setModalHasChanges,
    setDetailState,
    setCreateModal,
  } = useContext(PartnersContext)

  return (
    <MainButton>
      <Tooptip
        title={
          canCreate
            ? `${partnerTexts.mainButton}`
            : `${generalTexts.permits.action_title}`
        }
      >
        <AddPartner
          disabled={!canCreate}
          onClick={() => {
            if (canCreate) {
              if (hasChanges) {
                setModalHasChanges(true)
              } else {
                setDetailState("view")
                setCreateModal(true)
              }
            }
          }}
        >
          <Icon color={theme.colors.white} icon="IconAdd" />
        </AddPartner>
      </Tooptip>
    </MainButton>
  )
}

export default CreatePartnerButton
