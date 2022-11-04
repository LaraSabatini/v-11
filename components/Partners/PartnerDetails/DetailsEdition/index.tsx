import React, { useEffect, useState, useContext } from "react"
// DATA STORAGE & TYPES
import { editPartnerAction } from "helpers/partners"
import { PartnersContext } from "contexts/Partners"
import PartnerInterface from "interfaces/partners/PartnerInterface"
import partnerTexts from "strings/partners.json"
import generalTexts from "strings/general.json"
import { cleanPartnerData } from "utils"
// COMPONENTS & STYLING
import TextField from "components/UI/TextField"
import TextButton from "components/UI/TextButton"
import Checkbox from "components/UI/Checkbox"
import ModalChanges from "../ModalChanges"
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

function DetailsEdition({ partnerInfo, createdBy }: DetailEditInterface) {
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
      const apiValidation = await editPartnerAction({
        ...newData,
        name: cleanPartnerData(newData.name),
        last_name: cleanPartnerData(newData.last_name),
        free_pass: newData.free_pass,
      })

      if (apiValidation) {
        setModalSuccess({
          status: "success",
          icon: "IconCheckModal",
          title: `${generalTexts.modalTitles.success}`,
          content: `${partnerTexts.edit.success.content}`,
        })
        setDetailState("view")
        setHasChanges(false)
      } else {
        setModalError({
          status: "alert",
          icon: "IconExclamation",
          title: `${generalTexts.modalTitles.error}`,
          content: `${partnerTexts.edit.error.content}`,
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
        <ModalChanges
          cancelDiscard={cancelDiscard}
          discardChanges={discardChanges}
        />
      )}
      <PartnerData>
        <TextField
          width={190}
          label={generalTexts.labels.name}
          required
          value={newData.name}
          type="text"
          reference={nameRef}
          onChange={e => setNewData({ ...newData, name: e.target.value })}
        />
        <TextField
          width={190}
          label={generalTexts.labels.lastName}
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
          label={generalTexts.labels.email}
          value={newData.email}
          type="email"
          reference={emailRef}
          onChange={e => setNewData({ ...newData, email: e.target.value })}
        />
        <TextField
          width={190}
          label={generalTexts.labels.identificationNumber}
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
          label={generalTexts.labels.phoneNumber}
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
          label={partnerTexts.member_since}
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
          label={partnerTexts.created_by}
          value={`@${createdBy}`}
          type="text"
          disabled
          disabledAutocompleted
        />
      </PartnerData>
      <ButtonContainer>
        <TextButton
          onClick={discardChanges}
          content={generalTexts.actions.cancel}
        />
        <TextButton
          onClick={saveChanges}
          content={generalTexts.actions.save}
          cta
        />
      </ButtonContainer>
    </Details>
  )
}

export default DetailsEdition
