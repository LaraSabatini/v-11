/* eslint-disable no-console */
import React, { useRef, useEffect, useState, useContext } from "react"
import { PartnersContext } from "contexts/Partners"
import PartnerInterface from "interfaces/partners/PartnerInterface"
import getTrainers from "services/GetTrainers.service"
import texts from "strings/partners.json"
import ModalAlert from "components/UI/ModalAlert"
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
  const {
    setHasChanges,
    hasChanges,
    modalHasChanges,
    setModalHasChanges,
    setDetailState,
  } = useContext(PartnersContext)

  const [trainers, setTrainers] = useState<
    { id: number; display_name: string }[]
  >([])
  const [hasTrainer, setHasTrainer] = useState<string>("")
  const [newData, setNewData] = useState<PartnerInterface>(partnerInfo)
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

    if (partnerInfo.trainer_id === 0) {
      setHasTrainer("")
    } else {
      const getTrainer = arrayTrainers.filter(
        trainer => trainer.id === partnerInfo.trainer_id,
      )
      setHasTrainer(getTrainer[0].display_name)
    }
  }

  useEffect(() => {
    fillTrainersData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [partnerInfo])

  const checkDiff = () => {
    if (
      newData.name !== partnerInfo.name ||
      newData.last_name !== partnerInfo.last_name ||
      newData.email !== partnerInfo.email ||
      newData.identification_number !== partnerInfo.identification_number ||
      newData.payment_expire_date !== partnerInfo.payment_expire_date ||
      newData.trainer_id !== partnerInfo.trainer_id
    ) {
      setHasChanges(true)
    } else {
      setHasChanges(false)
    }
  }

  useEffect(() => {
    checkDiff()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newData])

  console.log(hasChanges)

  const cancelDiscard = () => {
    console.log(cancelDiscard)
    setModalHasChanges(false)
  }

  const discardChanges = () => {
    console.log("discardChanges")
    setModalHasChanges(false)
    setNewData(partnerInfo)
    setDetailState("view")
  }

  return (
    <Details>
      {modalHasChanges && (
        <ModalAlert
          success={false}
          message={{
            status: `alert`,
            icon: `IconAlert`,
            title: "¿Deseas descartar los cambios realizados?",
            content: `Si descartas los cambios no se guardara tu progreso`,
          }}
          closeModal={cancelDiscard}
          closeRefresh={cancelDiscard}
          mainButtonContent="Descartar cambios"
          secondButtonContent="Cancelar"
          mainAction={discardChanges}
          isNotice
        />
      )}
      <PartnerData>
        <TextField
          width={200}
          label={texts.create.name}
          required
          value={newData.name}
          type="text"
          onChange={e => setNewData({ ...newData, name: e.target.value })}
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
          setValue={hasTrainer}
          // eslint-disable-next-line no-console
          onChangeProps={e => console.log(e)}
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
