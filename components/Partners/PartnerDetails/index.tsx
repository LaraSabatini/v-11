import React, { useContext, useState, useEffect } from "react"
// SERVICES
import getUsers from "services/Users/GetUsers.service"
// DATA STORAGE & TYPES
import { PartnersContext } from "contexts/Partners"
import PartnerInterface from "interfaces/partners/PartnerInterface"
import partnerTexts from "strings/partners.json"
import generalTexts from "strings/general.json"
// COMPONENTS & STYLING
import theme from "theme/index"
import Icon from "components/UI/Assets/Icon"
import Tooltip from "components/UI/Tooltip"
import DetailsView from "./DetailsView"
import DetailsEdition from "./DetailsEdition"
import { Container, Title, Divider, IconContainer } from "./styles"

interface ActionsPermissions {
  permits: {
    create: boolean
    update: boolean
    edit: boolean
    delete: boolean
  }
}

function PartnerDetails({ permits }: ActionsPermissions) {
  const {
    partnerSelected,
    partners,
    detailState,
    setDetailState,
    hasChanges,
    setModalHasChanges,
  } = useContext(PartnersContext)
  const [createdBy, setCreatedBy] = useState<string>("")
  const [partnerInfo, setPartnerInfo] = useState<PartnerInterface>()

  const getUsersInfo = async (creatorId: number) => {
    const data = await getUsers()

    const creator = data.data.filter(user => user.id === creatorId)
    setCreatedBy(creator[0].name)
  }

  useEffect(() => {
    const searchPartner = partners.filter(
      (partner: PartnerInterface) => partner.id === partnerSelected,
    )

    setPartnerInfo(searchPartner[0])
    getUsersInfo(searchPartner[0].created_by)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [partnerSelected])

  return (
    <Container>
      <Title>
        {partnerTexts.details}
        {permits.edit ? (
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
      <Divider />
      {detailState === "view" ? (
        <DetailsView partnerInfo={partnerInfo} canUpdate={permits.update} />
      ) : (
        <DetailsEdition partnerInfo={partnerInfo} createdBy={createdBy} />
      )}
    </Container>
  )
}

export default PartnerDetails
