import React, { useContext } from "react"
import { Lessons } from "contexts/Lessons"
import generalTexts from "strings/general.json"
import trainerTexts from "strings/trainers.json"
import TextField from "components/UI/TextField"
import InputCalendar from "components/UI/InputCalendar"
import { HorizontalGroup } from "../styles"

function CreateClient() {
  const {
    birthDateRef,
    setNewPartnerData,
    newPartnerData,
    identificationError,
    nameRef,
    lastNameRef,
    identificationNumberRef,
  } = useContext(Lessons)

  return (
    <div>
      <HorizontalGroup>
        <TextField
          label={generalTexts.labels.name}
          required
          type="text"
          width={200}
          reference={nameRef}
          onChange={e => {
            setNewPartnerData({ ...newPartnerData, name: e.target.value })
          }}
        />
        <TextField
          label={generalTexts.labels.lastName}
          required
          type="text"
          width={200}
          reference={lastNameRef}
          onChange={e => {
            setNewPartnerData({
              ...newPartnerData,
              last_name: e.target.value,
            })
          }}
        />
        <TextField
          label={generalTexts.labels.identificationNumber}
          required
          type="text"
          width={200}
          backError={identificationError}
          backErrorMessage={trainerTexts.createPurchase.errorMessage}
          reference={identificationNumberRef}
          onChange={e => {
            setNewPartnerData({
              ...newPartnerData,
              identification_number: e.target.value,
            })
          }}
        />
      </HorizontalGroup>
      <HorizontalGroup>
        <InputCalendar
          label={generalTexts.labels.birthDate}
          reference={birthDateRef}
          width={200}
          onChange={e => {
            setNewPartnerData({
              ...newPartnerData,
              birth_date: e.selectedChangeDate,
            })
          }}
        />
        <TextField
          label={generalTexts.labels.email}
          type="email"
          width={200}
          onChange={e => {
            setNewPartnerData({
              ...newPartnerData,
              email: e.target.value,
            })
          }}
        />
        <TextField
          label={generalTexts.labels.phoneNumber}
          type="text"
          width={200}
          onChange={e => {
            setNewPartnerData({
              ...newPartnerData,
              phone: e.target.value,
            })
          }}
        />
      </HorizontalGroup>
    </div>
  )
}

export default CreateClient
