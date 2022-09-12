import React, { useRef, useEffect, useState, useContext } from "react"
import { PartnersContext } from "contexts/Partners"
import editPartner from "services/Partners/EditPartner.service"
import PartnerInterface from "interfaces/partners/PartnerInterface"
import getTrainers from "services/Trainers/GetTrainers.service"
import TrainerInterface from "interfaces/trainers/TrainerInterface"
import texts from "strings/partners.json"
import ModalAlert from "components/UI/ModalAlert"
import TextField from "components/UI/TextField"
import TextButton from "components/UI/TextButton"
import Autocomplete from "components/UI/Autocomplete"
import { PartnerData, Details, ButtonContainer } from "./styles"

interface DetailEditInterface {
  partnerInfo: PartnerInterface
  createdBy: string
}

const DetailsEdition = ({ partnerInfo, createdBy }: DetailEditInterface) => {
  const {
    setHasChanges,
    modalHasChanges,
    setModalHasChanges,
    setDetailState,
    nameRef,
    lastNameRef,
    identificationRef,
    emailRef,
    trainertRef,
    setModalSuccess,
    setModalError,
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
    data.data.map((trainer: TrainerInterface) =>
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
      newData.trainer_id !== partnerInfo.trainer_id
    ) {
      setHasChanges(true)
    } else {
      setHasChanges(false)
    }
  }

  const cancelDiscard = () => {
    setModalHasChanges(false)
  }

  const discardChanges = () => {
    setModalHasChanges(false)
    setNewData(partnerInfo)
    setHasChanges(false)
    setDetailState("view")
  }

  const saveChanges = async e => {
    e.preventDefault()

    await nameRef.current?.focus()
    await lastNameRef.current?.focus()
    await identificationRef.current?.focus()
    await emailRef.current?.focus()
    await trainertRef.current?.focus()
    await paymentExpireDateRef.current?.focus()

    if (
      nameRef.current.attributes.getNamedItem("data-error").value === "false" &&
      lastNameRef.current.attributes.getNamedItem("data-error").value ===
        "false" &&
      identificationRef.current.attributes.getNamedItem("data-error").value ===
        "false" &&
      emailRef.current.attributes.getNamedItem("data-error").value ===
        "false" &&
      paymentExpireDateRef.current.attributes.getNamedItem("data-error")
        .value === "false"
    ) {
      const inputName = newData.name.toLowerCase()
      const name = inputName.charAt(0).toUpperCase() + inputName.slice(1)

      const inputLastName = newData.last_name.toLowerCase()
      const lastName =
        inputLastName.charAt(0).toUpperCase() + inputLastName.slice(1)

      let freePass = newData.free_pass

      if (newData.trainer_id !== null || newData.free_pass === 1) {
        freePass = 1
      }

      const body = {
        ...newData,
        name,
        last_name: lastName,
        free_pass: freePass,
      }

      const apiValidation = await editPartner(body)

      if (apiValidation.message === "partner updated successfully") {
        setModalSuccess({
          status: "success",
          icon: "IconCheckModal",
          title: `${texts.edit.success.title}`,
          content: `${texts.edit.success.content}`,
        })
        setDetailState("view")
        setHasChanges(false)
      } else {
        setModalError({
          status: "alert",
          icon: "IconExclamation",
          title: `${texts.edit.error.title}`,
          content: `${texts.edit.error.content}`,
        })
        setHasChanges(false)
      }
    }
  }

  useEffect(() => {
    checkDiff()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newData])

  return (
    <Details>
      {modalHasChanges && (
        <ModalAlert
          success={false}
          message={{
            status: `alert`,
            icon: `IconAlert`,
            title: `${texts.modal_changes.title}`,
            content: `${texts.modal_changes.content}`,
          }}
          closeModal={cancelDiscard}
          closeRefresh={cancelDiscard}
          mainButtonContent={texts.modal_changes.main_button}
          secondButtonContent={texts.modal_changes.cancel_button}
          mainAction={discardChanges}
          isNotice
        />
      )}
      <PartnerData>
        <TextField
          width={190}
          label={texts.create.name}
          required
          value={newData.name}
          type="text"
          reference={nameRef}
          onChange={e => setNewData({ ...newData, name: e.target.value })}
        />
        <TextField
          width={190}
          label={texts.create.last_name}
          required
          value={newData.last_name}
          type="text"
          reference={lastNameRef}
          onChange={e => setNewData({ ...newData, last_name: e.target.value })}
        />
      </PartnerData>
      <PartnerData>
        <TextField
          width={190}
          label={texts.create.email}
          value={newData.email}
          type="email"
          reference={emailRef}
          onChange={e => setNewData({ ...newData, email: e.target.value })}
        />
        <TextField
          width={190}
          label={texts.create.identification}
          value={newData.identification_number}
          type="text"
          reference={identificationRef}
          onChange={e =>
            setNewData({ ...newData, identification_number: e.target.value })
          }
        />
      </PartnerData>
      <PartnerData />
      <PartnerData>
        <TextField
          width={190}
          label={texts.edit.member_since}
          value={partnerInfo?.membership_start_date}
          type="text"
          disabled
          disabledAutocompleted
        />
      </PartnerData>
      <PartnerData>
        <TextField
          width={190}
          label={texts.created_by}
          value={`@${createdBy}`}
          type="text"
          disabled
          disabledAutocompleted
        />
        <Autocomplete
          label={texts.trainer}
          width={190}
          options={trainers}
          setValue={hasTrainer}
          ref={trainertRef}
          onChangeProps={(e: { id: number; display_name: string }) =>
            setNewData({
              ...newData,
              trainer_id: e.id,
            })
          }
        />
      </PartnerData>
      <ButtonContainer>
        <TextButton onClick={discardChanges} content={texts.edit.cancel} />
        <TextButton onClick={saveChanges} content={texts.edit.save} cta />
      </ButtonContainer>
    </Details>
  )
}

export default DetailsEdition
