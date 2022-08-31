import React, { useEffect, useState } from "react"
import PartnerInterface from "interfaces/partners/PartnerInterface"
import TrainerInterface from "interfaces/trainers/TrainerInterface"
import getTrainers from "services/GetTrainers.service"
import texts from "strings/partners.json"
import { PartnerData, Details } from "./styles"

interface DetailViewInterface {
  partnerInfo: PartnerInterface
  createdBy: string
}

const DetailsView = ({ partnerInfo, createdBy }: DetailViewInterface) => {
  const [trainer, setTrainer] = useState<string>("")

  const getTrainer = async () => {
    const data = await getTrainers()
    if (partnerInfo?.trainer_id !== 0 && partnerInfo?.trainer_id !== 0) {
      const filterTrainer = data.data.filter(
        (t: TrainerInterface) => t.id === partnerInfo?.trainer_id,
      )
      if (filterTrainer.length) {
        const trainerName = `${filterTrainer[0].name} ${filterTrainer[0].last_name}`
        setTrainer(trainerName)
      }
    }
  }

  useEffect(() => {
    getTrainer()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [partnerInfo])

  return (
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
        {/* {partnerInfo?.trainer_id !== null && partnerInfo?.trainer_id !== 0
          ? `${partnerInfo?.trainer_id}`
          : `${texts.not_trainer}`} */}
        {trainer === "" ? `${texts.not_trainer}` : trainer}
      </PartnerData>
    </Details>
  )
}

export default DetailsView
