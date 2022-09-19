import React, { useContext, useState, useEffect } from "react"
import { PartnersContext } from "contexts/Partners"
import getUsers from "services/Users/GetUsers.service"
import UserInterface from "interfaces/users/UserInterface"
import Icon from "components/UI/Assets/Icon"
import theme from "theme/index"
import texts from "strings/partners.json"
import PartnerInterface from "interfaces/partners/PartnerInterface"
import DetailsView from "./DetailsView"
import DetailsEdition from "./DetailsEdition"
import { Container, Title, Divider, IconContainer } from "./styles"

const PartnerDetails = () => {
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

    const creator = data.data.filter(
      (user: UserInterface) => user.id === creatorId,
    )
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
        {texts.details}
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
      </Title>
      <Divider />
      {detailState === "view" ? (
        <DetailsView partnerInfo={partnerInfo} />
      ) : (
        <DetailsEdition partnerInfo={partnerInfo} createdBy={createdBy} />
      )}
    </Container>
  )
}

export default PartnerDetails
