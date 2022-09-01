import React, { useRef, useEffect, useState } from "react"
import PartnerInterface from "interfaces/partners/PartnerInterface"
import getTrainers from "services/GetTrainers.service"
import texts from "strings/partners.json"
import TextField from "components/UI/TextField"
import TextButton from "components/UI/TextButton"
import InputCalendar from "components/UI/InputCalendar"
import Autocomplete from "components/UI/Autocomplete"
import { PartnerData, Details, ButtonContainer } from "./styles"

interface DetailViewInterface {
  partnerInfo: PartnerInterface
  createdBy: string
}

const DetailsEdition = ({ partnerInfo, createdBy }: DetailViewInterface) => {
  const [trainers, setTrainers] = useState<
    { id: number; display_name: string }[]
  >([])
  const paymentExpireDateRef = useRef(null)

  const fillTrainersData = async () => {
    const data = await getTrainers()
    const arrayTrainers = []
    data.data.map(trainer =>
      arrayTrainers.push({
        id: trainer.id,
        display_name: `${trainer.name} ${trainer.last_name}`,
      }),
    )

    setTrainers(arrayTrainers)
  }

  useEffect(() => {
    fillTrainersData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Details>
      <PartnerData>
        <TextField
          width={200}
          label={texts.create.name}
          required
          value={partnerInfo?.name || ""}
          type="text"
        />
        <TextField
          width={200}
          label={texts.create.last_name}
          required
          value={partnerInfo?.last_name || ""}
          type="text"
        />
      </PartnerData>
      <PartnerData>
        <TextField
          width={200}
          label={texts.create.email}
          value={partnerInfo?.email || ""}
          type="email"
        />
        <TextField
          width={200}
          label={texts.create.identification}
          value={partnerInfo?.identification_number || ""}
          type="text"
        />
      </PartnerData>
      <PartnerData />
      <PartnerData>
        <TextField
          width={200}
          label="Miembro desde"
          value={partnerInfo?.membership_start_date}
          type="text"
          disabled
          disabledAutocompleted
        />
        <InputCalendar
          width={200}
          required
          label={texts.member_expire}
          valueCalendar={partnerInfo?.payment_expire_date}
          reference={paymentExpireDateRef}
        />
        {/* <TextField
          required
          width={60}
          label={texts.create.paid_time}
          type="number"
          value={partnerInfo?.membership_time_paid || "0"}
        />
        <Autocomplete
          required
          label={texts.create.unit}
          width={115}
          options={timeUnits}
        /> */}
      </PartnerData>
      <PartnerData>
        <TextField
          width={200}
          label={texts.created_by}
          value={`@${createdBy}`}
          type="text"
          disabled
          disabledAutocompleted
        />
        <Autocomplete
          required
          label={texts.trainer}
          width={200}
          options={trainers}
          setValue={`${partnerInfo?.trainer_id}`}
        />
      </PartnerData>
      <ButtonContainer>
        <TextButton content="Cancelar" />
        <TextButton content="Guardar" cta />
      </ButtonContainer>
    </Details>
  )
}

export default DetailsEdition
