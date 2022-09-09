import React, { useContext, useState } from "react"
// import getTrainers from "services/Trainers/GetTrainers.service"
// import createPartner from "services/Partners/CreatePartner.service"
import { PartnersContext } from "contexts/Partners"
import ModalForm from "components/UI/ModalForm"
import TextField from "components/UI/TextField"
import texts from "strings/partners.json"
import InputCalendar from "components/UI/InputCalendar"
import MakePayment from "./MakePayment"

import { Form, HorizontalGroup } from "./styles"

interface CreateInterface {
  cancelCreate: () => void
}

const CreatePartner = ({ cancelCreate }: CreateInterface) => {
  const {
    nameRef,
    lastNameRef,
    identificationRef,
    birthDateRef,
    emailRef,
    newPartnerData,
    setNewPartnerData,
    // setModalSuccess,
    // setModalError,
    paidTimeUnitRef,
    paidTimeRef,
    trainertRef,
    clasesRef,
    paymentRef,
    paidTimeUnit,
    paidTime,
  } = useContext(PartnersContext)
  const [view, setView] = useState<number>(1)

  const today = new Date()
  const getDay = today.getDate()
  const getMonth = today.getMonth()
  const year = today.getFullYear()

  const day = getDay > 9 ? getDay : `0${getDay}`
  const month = getMonth + 1 > 9 ? getMonth + 1 : `0${getMonth + 1}`

  const handleCreate = async e => {
    e.preventDefault()

    await nameRef.current?.focus()
    await lastNameRef.current?.focus()
    await identificationRef.current?.focus()
    await birthDateRef.current?.focus()
    await emailRef.current?.focus()

    if (
      nameRef.current.attributes.getNamedItem("data-error").value === "false" &&
      lastNameRef.current.attributes.getNamedItem("data-error").value ===
        "false" &&
      identificationRef.current.attributes.getNamedItem("data-error").value ===
        "false" &&
      birthDateRef.current.attributes.getNamedItem("data-error").value ===
        "false" &&
      emailRef.current.attributes.getNamedItem("data-error").value === "false"
    ) {
      const inputName = newPartnerData.name.toLowerCase()
      const name = inputName.charAt(0).toUpperCase() + inputName.slice(1)

      const inputLastName = newPartnerData.last_name.toLowerCase()
      const lastName =
        inputLastName.charAt(0).toUpperCase() + inputLastName.slice(1)

      const body = {
        ...newPartnerData,
        id: 0,
        name,
        last_name: lastName,
        birth_date:
          newPartnerData.birth_date === "" ? "-" : newPartnerData.birth_date,
        membership_start_date: `${day}/${month}/${year}`,
        payment_is_active: 1,
        created_by: parseInt(localStorage.getItem("id"), 10),
      }

      setNewPartnerData(body)
      setView(2)
    }
  }

  const addMonths = (numOfMonths: number, date = new Date()) => {
    date.setMonth(date.getMonth() + numOfMonths)
    return date
  }

  const finalizeCreate = async e => {
    e.preventDefault()
    await paidTimeUnitRef.current?.focus()
    await paidTimeRef.current?.focus()
    await trainertRef.current?.focus()
    await clasesRef.current?.focus()
    await paymentRef.current?.focus()

    if (
      paidTimeUnitRef.current.attributes.getNamedItem("data-error").value ===
        "false" &&
      paidTimeRef.current.attributes.getNamedItem("data-error").value ===
        "false" &&
      trainertRef.current.attributes.getNamedItem("data-error").value ===
        "false" &&
      clasesRef.current.attributes.getNamedItem("data-error").value ===
        "false" &&
      paymentRef.current.attributes.getNamedItem("data-error").value === "false"
    ) {
      // eslint-disable-next-line no-console
      console.log("success")

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

      // setear nuevo partner
      // setear nuevo pago
      const body = {
        ...newPartnerData,
        membership_time_paid: `${paidTime} ${paidTimeUnit.display_name}`,
        payment_expire_date:
          paidTimeUnit.id !== 1
            ? `${finalExpireDay}/${finalExpireMonth}/${expireDate.getFullYear()}`
            : "",
        trainer_id:
          newPartnerData.trainer_id === null ? null : newPartnerData.trainer_id,
        free_pass:
          paidTimeUnit.id !== 1 || newPartnerData.trainer_id !== null ? 1 : 0,
      }

      // eslint-disable-next-line no-console
      console.log(body)

      // const apiValidation = await createPartner(body)
      // if (apiValidation.message === "partner created successfully") {
      //   setModalSuccess({
      //     status: "success",
      //     icon: "IconCheckModal",
      //     title: `${texts.create.success.title}`,
      //     content: `${texts.create.success.content}`,
      //   })
      //   cancelCreate()
      // } else {
      //   setModalError({
      //     status: "alert",
      //     icon: "IconExclamation",
      //     title: `${texts.create.error.title}`,
      //     content: `${texts.create.error.content}`,
      //   })
      // }
    }
  }

  return (
    <ModalForm
      title={view === 1 ? "Crear socio" : "Pago"}
      cancelButtonContent="Cancelar"
      submitButtonContent={view === 1 ? "Siguiente" : "Crear"}
      submit={view === 1 ? handleCreate : finalizeCreate}
      cancelFunction={cancelCreate}
    >
      {view === 1 && (
        <Form>
          <HorizontalGroup>
            <TextField
              required
              width={180}
              label={texts.create.name}
              type="text"
              reference={nameRef}
              onChange={e => {
                setNewPartnerData({ ...newPartnerData, name: e.target.value })
              }}
            />
            <TextField
              required
              width={180}
              label={texts.create.last_name}
              type="text"
              reference={lastNameRef}
              onChange={e => {
                setNewPartnerData({
                  ...newPartnerData,
                  last_name: e.target.value,
                })
              }}
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
          </HorizontalGroup>
        </Form>
      )}
      {view === 2 && <MakePayment />}
    </ModalForm>
  )
}

export default CreatePartner
