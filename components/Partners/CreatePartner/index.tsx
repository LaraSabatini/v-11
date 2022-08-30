import React, { useContext, useState } from "react"
import PartnerInterface from "interfaces/partners/PartnerInterface"
import createPartner from "services/CreatePartner.service"
import { PartnersContext } from "contexts/Partners"
import ModalForm from "components/UI/ModalForm"
import TextField from "components/UI/TextField"
import Checkbox from "components/UI/Checkbox"
import texts from "strings/partners.json"
import InputCalendar from "components/UI/InputCalendar"
import Autocomplete from "components/UI/Autocomplete"
import {
  Form,
  HorizontalGroup,
  CheckboxContainer,
  SubContainer,
} from "./styles"

interface CreateInterface {
  cancelCreate: () => void
}

const CreatePartner = ({ cancelCreate }: CreateInterface) => {
  const {
    timeUnits,
    nameRef,
    lastNameRef,
    identificationRef,
    birthDateRef,
    emailRef,
    paidTimeRef,
    paidTimeUnitRef,
    trainertRef,
    setModalSuccess,
    setModalError,
  } = useContext(PartnersContext)

  const [isChecked, setIsChecked] = useState<boolean>(false)

  const [newPartnerData, setNewPartnerData] = useState<PartnerInterface>({
    name: "",
    last_name: "",
    identification_number: "",
    birth_date: "",
    email: "",
    membership_start_date: "",
    membership_time_paid: "",
    payment_expire_date: "",
    payment_is_active: false,
    created_by: null,
    trainer_id: null,
    free_pass: 0,
  })

  const [paidTime, setPaidTime] = useState<number>(0)
  const [paidTimeUnit, setPaidTimeUnit] = useState<{
    id: number
    display_name: string
  }>()

  const today = new Date()
  const day = today.getDate()
  const month = today.getMonth()
  const year = today.getFullYear()

  const addMonths = (numOfMonths: number, date = new Date()) => {
    date.setMonth(date.getMonth() + numOfMonths)
    return date
  }

  const handleCreate = async e => {
    e.preventDefault()

    await nameRef.current?.focus()
    await lastNameRef.current?.focus()
    await identificationRef.current?.focus()
    await birthDateRef.current?.focus()
    await emailRef.current?.focus()
    await paidTimeRef.current?.focus()
    await paidTimeUnitRef.current?.focus()
    await trainertRef.current?.focus()

    if (
      nameRef.current.attributes.getNamedItem("data-error").value === "false" &&
      lastNameRef.current.attributes.getNamedItem("data-error").value ===
        "false" &&
      identificationRef.current.attributes.getNamedItem("data-error").value ===
        "false" &&
      birthDateRef.current.attributes.getNamedItem("data-error").value ===
        "false" &&
      emailRef.current.attributes.getNamedItem("data-error").value ===
        "false" &&
      paidTimeRef.current.attributes.getNamedItem("data-error").value ===
        "false" &&
      paidTimeUnitRef.current.attributes.getNamedItem("data-error").value ===
        "false"
    ) {
      let expireDate = new Date()
      if (paidTimeUnit.id === 1) {
        expireDate.setDate(today.getDate() + paidTime)
      } else if (paidTimeUnit.id === 2) {
        expireDate = addMonths(paidTime, today)
      } else {
        expireDate.setFullYear(expireDate.getFullYear() + paidTime)
      }

      const finalExpireDay =
        expireDate.getDate() > 9
          ? expireDate.getDate()
          : `0${expireDate.getDate()}`

      const finalExpireMonth =
        expireDate.getMonth() + 1 > 9
          ? expireDate.getMonth() + 1
          : `0${expireDate.getMonth() + 1}`

      const body = {
        ...newPartnerData,
        id: 0,
        birth_date:
          newPartnerData.birth_date === "" ? "-" : newPartnerData.birth_date,
        membership_start_date: `${day}/${month + 1}/${year}`,
        payment_expire_date: `${finalExpireDay}/${finalExpireMonth}/${expireDate.getFullYear()}`,
        membership_time_paid: `${paidTime} ${paidTimeUnit.display_name}`,
        payment_is_active: 1,
        created_by: parseInt(localStorage.getItem("id"), 10),
        free_pass:
          paidTimeUnit.id !== 1 || newPartnerData.trainer_id !== null ? 1 : 0,
      }

      const apiValidation = await createPartner(body)
      if (apiValidation.message === "partner created successfully") {
        setModalSuccess({
          status: "success",
          icon: "IconCheckModal",
          title: `${texts.create.success.title}`,
          content: `${texts.create.success.content}`,
        })
        cancelCreate()
      } else {
        setModalError({
          status: "alert",
          icon: "IconExclamation",
          title: `${texts.create.error.title}`,
          content: `${texts.create.error.content}`,
        })
      }
    }
  }

  return (
    <ModalForm
      title={texts.create.title}
      cancelButtonContent={texts.create.cancel_button}
      submitButtonContent={texts.create.submit_button}
      submit={handleCreate}
      cancelFunction={cancelCreate}
    >
      <Form>
        <HorizontalGroup>
          <TextField
            required
            width={180}
            label={texts.create.name}
            type="text"
            reference={nameRef}
            onChange={e =>
              setNewPartnerData({ ...newPartnerData, name: e.target.value })
            }
          />
          <TextField
            required
            width={180}
            label={texts.create.last_name}
            type="text"
            reference={lastNameRef}
            onChange={e =>
              setNewPartnerData({
                ...newPartnerData,
                last_name: e.target.value,
              })
            }
          />
        </HorizontalGroup>
        <HorizontalGroup>
          <TextField
            required
            width={180}
            label={texts.create.identification}
            type="text"
            reference={identificationRef}
            onChange={e =>
              setNewPartnerData({
                ...newPartnerData,
                identification_number: e.target.value,
              })
            }
          />
          <InputCalendar
            width={180}
            label={texts.create.birth_date}
            reference={birthDateRef}
            onChange={e =>
              setNewPartnerData({
                ...newPartnerData,
                birth_date: e.selectedChangeDate,
              })
            }
          />
        </HorizontalGroup>
        <HorizontalGroup>
          <TextField
            required
            width={180}
            label={texts.create.email}
            type="email"
            reference={emailRef}
            onChange={e =>
              setNewPartnerData({
                ...newPartnerData,
                email: e.target.value,
              })
            }
          />
          <SubContainer>
            <TextField
              required
              width={60}
              label={texts.create.paid_time}
              type="number"
              reference={paidTimeRef}
              onChange={e => setPaidTime(parseInt(e.target.value, 10))}
            />
            <Autocomplete
              required
              label={texts.create.unit}
              width={115}
              options={timeUnits}
              ref={paidTimeUnitRef}
              onChangeProps={(e: { id: number; display_name: string }) => {
                setPaidTimeUnit(e)
                if (e.id !== 1) {
                  setIsChecked(true)
                } else {
                  setIsChecked(false)
                }
              }}
            />
          </SubContainer>
        </HorizontalGroup>
        <HorizontalGroup>
          <Autocomplete
            label={texts.create.trainer}
            width={180}
            options={timeUnits}
            ref={trainertRef}
            onChangeProps={(e: { id: number; display_name: string }) =>
              setNewPartnerData({
                ...newPartnerData,
                trainer_id: e.id,
              })
            }
          />
        </HorizontalGroup>
        <CheckboxContainer>
          <Checkbox
            checked={isChecked || newPartnerData.trainer_id !== null}
            isDisabled
            idParam="free-pass"
          />
          <p>{texts.create.free_pass}</p>
        </CheckboxContainer>
      </Form>
    </ModalForm>
  )
}

export default CreatePartner
