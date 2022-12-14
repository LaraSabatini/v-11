import React, { useContext } from "react"
import { PartnersContext } from "contexts/Partners"
import PartnerInterface from "interfaces/partners/PartnerInterface"
import partnerTexts from "strings/partners.json"
import generalTexts from "strings/general.json"
import theme from "theme/index"
import Icon from "components/UI/Assets/Icon"
import Tooltip from "components/UI/Tooltip"
import DetailsEdition from "./DetailsEdition"
import DetailsData from "./DetailsData"
import { Container, Title, IconContainer } from "./styles"

interface PartnerDetailPermits {
  update: boolean
  edit: boolean
  canDelete: boolean
  partnerInfo: PartnerInterface
}

function DetailsView({
  edit,
  partnerInfo,
  update,
  canDelete,
}: PartnerDetailPermits) {
  const {
    hasChanges,
    setModalHasChanges,
    setDetailState,
    detailState,
  } = useContext(PartnersContext)
  return (
    <Container>
      <Title>
        {partnerTexts.details}
        {edit ? (
          <IconContainer
            onClick={() => {
              if (hasChanges) {
                setModalHasChanges(true)
              } else if (detailState === "view" && !hasChanges) {
                setDetailState("edit")
              } else {
                setDetailState("view")
              }
            }}
          >
            <Icon icon="IconEdit" color={theme.colors.black} />
          </IconContainer>
        ) : (
          <Tooltip
            placement="top-end"
            title={generalTexts.permits.action_title}
          >
            <IconContainer disabledButton>
              <Icon icon="IconEdit" color={theme.colors.black} />
            </IconContainer>
          </Tooltip>
        )}
      </Title>

      {detailState === "view" ? (
        <DetailsData
          partnerInfo={partnerInfo}
          canDelete={canDelete}
          canUpdate={update}
        />
      ) : (
        <DetailsEdition partnerInfo={partnerInfo} />
      )}
    </Container>
  )
}

export default DetailsView
