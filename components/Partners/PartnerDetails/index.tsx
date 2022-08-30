import React, { useContext, useState, useEffect } from "react"
import { PartnersContext } from "contexts/Partners"
import getUsers from "services/GetUsers.service"
import Icon from "components/UI/Assets/Icon"
import theme from "theme/index"
import texts from "strings/partners.json"
import PartnerInterface from "interfaces/partners/PartnerInterface"
import {
  Container,
  Title,
  Divider,
  PartnerData,
  Details,
  IconContainer,
} from "./styles"

const PartnerDetails = () => {
  const { partnerSelected, partners } = useContext(PartnersContext)
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
        {texts.details}
        <span>
          <p>{texts.partner_number}</p>
          {partnerInfo?.id}
        </span>
        <IconContainer>
          <Icon icon="IconEdit" color={theme.colors.black} />
        </IconContainer>
      </Title>
      <Divider />
      <Details>
        <PartnerData>
          <p>{texts.full_name}</p>
          {partnerInfo?.name} {partnerInfo?.last_name}
        </PartnerData>

        <PartnerData>
          <p>{texts.email}</p>
          {partnerInfo?.email}
        </PartnerData>

        <PartnerData>
          <p>{texts.identification}</p>
          {partnerInfo?.identification_number}
        </PartnerData>
        <PartnerData>
          <p>{texts.member_since}</p>
          {partnerInfo?.membership_start_date}
        </PartnerData>
        <PartnerData>
          <p>{texts.member_expire}</p>
          {partnerInfo?.payment_expire_date}
        </PartnerData>
        <PartnerData>
          <p>{texts.paid_time}</p>
          {partnerInfo?.membership_time_paid}
        </PartnerData>
        <PartnerData>
          <p>{texts.created_by}</p>@{createdBy}
        </PartnerData>
        <PartnerData>
          <p>{texts.trainer}</p>
          {partnerInfo?.trainer_id !== null && partnerInfo?.trainer_id !== 0
            ? `${partnerInfo?.trainer_id}`
            : `${texts.not_trainer}`}
        </PartnerData>
      </Details>
    </Container>
  )
}

export default PartnerDetails
