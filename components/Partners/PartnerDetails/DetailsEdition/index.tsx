import React, { useEffect, useState, useContext } from "react"
// SERVICES
import { editPartner } from "services/Partners/Partner.service"
// DATA STORAGE & TYPES
import { PartnersContext } from "contexts/Partners"
import PartnerInterface from "interfaces/partners/PartnerInterface"
import texts from "strings/partners.json"
// COMPONENTS & STYLING
import ModalAlert from "components/UI/ModalAlert"
import TextField from "components/UI/TextField"
import TextButton from "components/UI/TextButton"
import Checkbox from "components/UI/Checkbox"
import {
  PartnerData,
  Details,
  ButtonContainer,
  CheckboxContainer,
} from "./styles"

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
    phoneRef,
    wantsSubscription,
    setWantsSubscription,
  } = useContext(PartnersContext)

  const [newData, setNewData] = useState<PartnerInterface>(partnerInfo)

  const checkDiff = () => {
    if (
      newData.name !== partnerInfo.name ||
      newData.last_name !== partnerInfo.last_name ||
      newData.email !== partnerInfo.email ||
      newData.identification_number !== partnerInfo.identification_number
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
    await phoneRef.current?.focus()

    if (
      nameRef.current.attributes.getNamedItem("data-error").value === "false" &&
      lastNameRef.current.attributes.getNamedItem("data-error").value ===
        "false" &&
      identificationRef.current.attributes.getNamedItem("data-error").value ===
        "false" &&
      emailRef.current.attributes.getNamedItem("data-error").value ===
        "false" &&
      phoneRef.current.attributes.getNamedItem("data-error").value === "false"
    ) {
      const inputName = newData.name.toLowerCase()
      const name = inputName.charAt(0).toUpperCase() + inputName.slice(1)

      const inputLastName = newData.last_name.toLowerCase()
      const lastName =
        inputLastName.charAt(0).toUpperCase() + inputLastName.slice(1)

      const freePass = newData.free_pass

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
          width={180}
          required={wantsSubscription}
          label="N° de telefono"
          type="text"
          value={newData.phone}
          reference={phoneRef}
          onChange={e =>
            setNewData({
              ...newData,
              phone: e.target.value,
            })
          }
        />
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
        <CheckboxContainer>
          <Checkbox
            onChange={() => {
              if (newData.subs === 0) {
                setNewData({ ...newData, subs: 1 })
                setWantsSubscription(true)
              } else {
                setNewData({ ...newData, subs: 0 })
                setWantsSubscription(false)
              }
            }}
            ownState
            checked={wantsSubscription}
            idParam="subs"
          />
          <p>Desea recibir noticias</p>
        </CheckboxContainer>
        <TextField
          width={190}
          label={texts.created_by}
          value={`@${createdBy}`}
          type="text"
          disabled
          disabledAutocompleted
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
