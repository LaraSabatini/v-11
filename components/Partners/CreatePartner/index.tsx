import React, { useContext, useState, useEffect } from "react"
// SERVICES
import { createPartner, searchPartner } from "services/Partners/Partner.service"
import { createPartnerPayment } from "services/Partners/PartnerPayments.service"
import { getPrices } from "services/Partners/Prices.service"
import getCombos from "services/Partners/GetCombos.service"
import {
  searchByUserAndDate,
  updateDigitalPayment,
  createDigitalPayment,
} from "services/Finances/DigitalPayments.service"
// INTERFACES
import PartnerInterface from "interfaces/partners/PartnerInterface"
import PaymentInterface from "interfaces/partners/PaymentInterface"
// CONTEXTS
import { PartnersContext } from "contexts/Partners"
import texts from "strings/partners.json"
// COMPONENTS
import ModalForm from "components/UI/ModalForm"
import TextField from "components/UI/TextField"
import InputCalendar from "components/UI/InputCalendar"
import Checkbox from "components/UI/Checkbox"
import MakePayment from "./MakePayment"
import { Form, HorizontalGroup, CheckboxContainer } from "./styles"

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
    setModalSuccess,
    setModalError,
    paidTimeUnitRef,
    paidTimeRef,
    clasesRef,
    paymentRef,
    paidTimeUnit,
    paidTime,
    setPrices,
    setCombos,
    comboSelected,
    amountOfClases,
    paymentMethodSelected,
    finalPrice,
    paymentMethods,
    phoneRef,
    wantsSubscription,
    setWantsSubscription,
    scheduleSelected,
    usesDay,
    paymentUserRef,
    paymentUserSelected,
    months,
  } = useContext(PartnersContext)
  const [view, setView] = useState<number>(1)
  const [partnerDuplicated, setPartnerDuplicated] = useState<boolean>(false)

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
    await phoneRef.current?.focus()
    await birthDateRef.current?.focus()
    await emailRef.current?.focus()

    if (
      nameRef.current.attributes.getNamedItem("data-error").value === "false" &&
      lastNameRef.current.attributes.getNamedItem("data-error").value ===
        "false" &&
      phoneRef.current.attributes.getNamedItem("data-error").value ===
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

      const seeDuplicated = await searchPartner(
        newPartnerData.identification_number,
        1,
      )

      if (seeDuplicated.data.length > 0) {
        setPartnerDuplicated(true)
      } else {
        const body = {
          ...newPartnerData,
          id: 0,
          name,
          last_name: lastName,
          birth_date:
            newPartnerData.birth_date === "" ? "-" : newPartnerData.birth_date,
          membership_start_date: `${day}/${month}/${year}`,
          created_by: parseInt(localStorage.getItem("id"), 10),
        }

        setNewPartnerData(body)
        setView(2)
      }
    }
  }

  const finalizeCreate = async e => {
    e.preventDefault()
    await paidTimeUnitRef.current?.focus()
    await paidTimeRef.current?.focus()
    await clasesRef.current?.focus()
    await paymentRef.current?.focus()
    await paymentUserRef.current?.focus()

    let success = false
    if (
      paidTimeUnitRef.current.attributes.getNamedItem("data-error").value ===
        "false" &&
      paidTimeRef.current.attributes.getNamedItem("data-error").value ===
        "false" &&
      clasesRef.current.attributes.getNamedItem("data-error").value ===
        "false" &&
      paymentRef.current.attributes.getNamedItem("data-error").value === "false"
    ) {
      const body: PartnerInterface = {
        ...newPartnerData,
        free_pass:
          paidTimeUnit?.id !== null &&
          paidTimeUnit !== undefined &&
          paidTimeUnit?.id !== 1
            ? 1
            : 0,
        is_student: scheduleSelected.length > 0 ? "SI" : "NO",
      }

      const apiValidation = await createPartner(body)

      if (apiValidation.message === "partner created successfully") {
        success = true
        const newDate = new Date(today.setMonth(today.getMonth() + paidTime))
        const expireDate = newDate.getDate()
        const expireMonth = newDate.getMonth()
        const expireYear = newDate.getFullYear()
        const finalExpireDay = expireDate > 9 ? expireDate : `0${expireDate}`
        let finalExpireMonth
        if (comboSelected !== null && comboSelected !== undefined) {
          finalExpireMonth =
            expireMonth + 2 > 9 ? expireMonth + 2 : `0${expireMonth + 2}`
        } else {
          finalExpireMonth =
            expireMonth + 1 > 9 ? expireMonth + 1 : `0${expireMonth + 1}`
        }

        let finalTime = 0
        if (paidTime !== null && paidTime !== 0) {
          if (usesDay) {
            finalTime = paidTime - 1
          } else {
            finalTime = paidTime
          }
        } else {
          finalTime = 0
        }

        const paymentBody: PaymentInterface = {
          id: 0,
          partner_id: apiValidation.partnerId,
          partner_name: newPartnerData.name,
          partner_last_name: newPartnerData.last_name,
          combo:
            comboSelected !== null && comboSelected !== undefined
              ? comboSelected
              : 0,
          time_paid: paidTimeUnit.id === 1 ? finalTime : paidTime,
          time_paid_unit:
            paidTimeUnit !== undefined && paidTimeUnit?.id !== null
              ? paidTimeUnit.id
              : "",
          clases_paid: amountOfClases !== undefined ? amountOfClases : 0,
          payment_method_id: paymentMethodSelected,
          payment_method_name: paymentMethods.filter(
            pm => pm.id === paymentMethodSelected,
          )[0].display_name,
          price_paid: finalPrice,
          date: `${day}-${month}-${year}`,
          payment_expire_date:
            (paidTimeUnit !== undefined && paidTimeUnit.id === 2) ||
            (comboSelected !== null && comboSelected !== undefined)
              ? `${finalExpireDay}-${finalExpireMonth}-${expireYear}`
              : "",
          days_and_hours:
            scheduleSelected.length > 0 ? `${scheduleSelected}` : "",
        }

        const createPayment = await createPartnerPayment(paymentBody)
        if (createPayment.message === "partnerPayment created successfully") {
          success = true
        } else {
          success = false
        }
      }

      if (paymentMethodSelected === 2) {
        const searchIfExists = await searchByUserAndDate(
          paymentUserSelected.id,
          `${day}-${month}-${year}`,
        )

        if (searchIfExists.data.length > 0) {
          const digitalPaymentBody = {
            id: searchIfExists.data[0].id,
            user_id: searchIfExists.data[0].user_id,
            user_name: searchIfExists.data[0].user_name,
            date: searchIfExists.data[0].date,
            month: searchIfExists.data[0].month,
            month_id: searchIfExists.data[0].month_id,
            total_profit: searchIfExists.data[0].total_profit + finalPrice,
          }
          const editDigitalPayment = await updateDigitalPayment(
            digitalPaymentBody,
          )
          if (editDigitalPayment.message === "payment updated successfully") {
            success = true
          } else {
            success = false
          }
          // editar
        } else {
          // crear
          const digitalPaymentBody = {
            id: 0,
            user_id: paymentUserSelected.id,
            user_name: paymentUserSelected.display_name,
            date: `${day}-${month}-${year}`,
            month: months.filter(m => m.id === today.getMonth() + 1)[0]
              .display_name,
            month_id: today.getMonth() + 1,
            total_profit: finalPrice,
          }
          const createDigital = await createDigitalPayment(digitalPaymentBody)

          if (createDigital.message === "payment created successfully") {
            success = true
          } else {
            success = false
          }
        }
      }

      if (success) {
        setModalSuccess({
          status: "success",
          icon: "IconCheckModal",
          title: `${texts.create.success.title}`,
          content: `${texts.create.success.content}`,
        })
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

  const fillPrices = async () => {
    const data = await getPrices()
    setPrices(data.data)

    const combosData = await getCombos()
    setCombos(combosData.data)
  }

  useEffect(() => {
    fillPrices()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
              width={180}
              label={texts.create.identification}
              type="text"
              required
              backError={partnerDuplicated}
              backErrorMessage={partnerDuplicated && "El socio ya existe"}
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
            <TextField
              width={180}
              required={wantsSubscription}
              label="N° de telefono"
              type="text"
              reference={phoneRef}
              onChange={e =>
                setNewPartnerData({
                  ...newPartnerData,
                  phone: e.target.value,
                })
              }
            />
          </HorizontalGroup>
          <CheckboxContainer>
            <Checkbox
              onChange={() => {
                if (newPartnerData.subs === 0) {
                  setNewPartnerData({ ...newPartnerData, subs: 1 })
                  setWantsSubscription(true)
                } else {
                  setNewPartnerData({ ...newPartnerData, subs: 0 })
                  setWantsSubscription(false)
                }
              }}
              ownState
              checked={wantsSubscription}
              idParam="subs"
            />
            <p>Desea recibir noticias</p>
          </CheckboxContainer>
        </Form>
      )}
      {view === 2 && <MakePayment />}
    </ModalForm>
  )
}

export default CreatePartner
