import React, { useContext, useState } from "react"
import { PartnersContext } from "contexts/Partners"
import { editPartnerAction } from "helpers/partners"
import PartnerInterface from "interfaces/partners/PartnerInterface"
import partnerTexts from "strings/partners.json"
import generalTexts from "strings/general.json"
import TextField from "components/UI/TextField"
import TextButton from "components/UI/TextButton"
import Checkbox from "components/UI/Checkbox"
import cleanPartnerData from "../../../Helpers/functional/cleanPartnerData"
import {
  Details,
  PartnerData,
  CheckboxContainer,
  ButtonContainer,
} from "./styles"

interface DetailEditInterface {
  partnerInfo: PartnerInterface
}

function DetailsEdition({ partnerInfo }: DetailEditInterface) {
  const {
    nameRef,
    lastNameRef,
    identificationRef,
    emailRef,
    phoneRef,
    wantsSubscription,
    setWantsSubscription,
    setModalHasChanges,
    setHasChanges,
    setDetailState,
    setModalSuccess,
    setModalError,
  } = useContext(PartnersContext)

  const [newData, setNewData] = useState<PartnerInterface>(partnerInfo)

  const discardChanges = () => {
    setModalHasChanges(false)
    setNewData(partnerInfo)
    setHasChanges(false)
    setDetailState("view")
  }

  const validateInputs = async () => {
    await nameRef.current?.focus()
    await lastNameRef.current?.focus()
    await identificationRef.current?.focus()
    await emailRef.current?.focus()
    await phoneRef.current?.focus()

    return (
      nameRef.current.attributes.getNamedItem("data-error").value === "false" &&
      lastNameRef.current.attributes.getNamedItem("data-error").value ===
        "false" &&
      identificationRef.current.attributes.getNamedItem("data-error").value ===
        "false" &&
      emailRef.current.attributes.getNamedItem("data-error").value ===
        "false" &&
      phoneRef.current.attributes.getNamedItem("data-error").value === "false"
    )
  }

  const saveChanges = async (e: any) => {
    e.preventDefault()

    const inputValidation = await validateInputs()

    if (inputValidation) {
      const editPartner = await editPartnerAction({
        ...newData,
        name: cleanPartnerData(newData.name),
        last_name: cleanPartnerData(newData.last_name),
        free_pass: newData.free_pass,
      })

      if (editPartner) {
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

  return (
    <Details>
      <PartnerData>
        <TextField
          width={190}
          label={generalTexts.labels.name}
          required
          value={newData.name}
          type="text"
          reference={nameRef}
          onChange={e => {
            setNewData({ ...newData, name: e.target.value })
            setHasChanges(true)
          }}
        />
        <TextField
          width={190}
          label={generalTexts.labels.lastName}
          required
          value={newData.last_name}
          type="text"
          reference={lastNameRef}
          onChange={e => {
            setNewData({ ...newData, last_name: e.target.value })
            setHasChanges(true)
          }}
        />
      </PartnerData>
      <PartnerData>
        <TextField
          width={190}
          label={generalTexts.labels.email}
          value={newData.email}
          type="email"
          reference={emailRef}
          onChange={e => {
            setNewData({ ...newData, email: e.target.value })
            setHasChanges(true)
          }}
        />
        <TextField
          width={190}
          label={generalTexts.labels.identificationNumber}
          value={newData.identification_number}
          type="text"
          reference={identificationRef}
          onChange={e => {
            setNewData({ ...newData, identification_number: e.target.value })
            setHasChanges(true)
          }}
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
          onChange={e => {
            setNewData({
              ...newData,
              phone: e.target.value,
            })
            setHasChanges(true)
          }}
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
              setHasChanges(true)
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
