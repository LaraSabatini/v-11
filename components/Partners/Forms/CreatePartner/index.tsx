import React, { useContext, useState, useEffect } from "react"
import { PartnersContext } from "contexts/Partners"
import { months, day, month, year } from "const/time"
import { paymentMethods } from "const/finances"
import { getExpirationDate, evaluateFinalTime } from "utils"
import { searchPartnerAction } from "helpers/partners"
import { makeAppropiatePayment } from "helpers/payments"
import createPartnerLogic from "services/BusinessLogic/createPartner.service"
import PartnerInterface from "interfaces/partners/PartnerInterface"
import partnerTexts from "strings/partners.json"
import generalTexts from "strings/general.json"
import ModalForm from "components/UI/ModalForm"
import TextField from "components/UI/TextField"
import InputCalendar from "components/UI/InputCalendar"
import Checkbox from "components/UI/Checkbox"
import cleanPartnerData from "../../Helpers/functional/cleanPartnerData"
import PaymentForm from "./PaymentForm"
import { Form, HorizontalGroup, CheckboxContainer } from "../styles"

interface CreateInterface {
  cancelCreate: () => void
}

function CreatePartnerForm({ cancelCreate }: CreateInterface) {
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
    paymentRef,
    paidTimeUnit,
    paidTime,
    comboSelected,
    paymentMethodSelected,
    finalPrice,
    phoneRef,
    wantsSubscription,
    setWantsSubscription,
    usesDay,
    paymentUserRef,
    paymentUserSelected,
    disableCreatePartnerFormButton,
    setDisableCreatePartnerFormButton,
    dateSelectedToStart,
  } = useContext(PartnersContext)

  const [view, setView] = useState<number>(1)
  const [partnerDuplicated, setPartnerDuplicated] = useState<boolean>(false)

  const today = `${day}-${month}-${year}`

  const validatePartnerDataInputs = async () => {
    await nameRef.current?.focus()
    await lastNameRef.current?.focus()
    await identificationRef.current?.focus()
    await phoneRef.current?.focus()
    await birthDateRef.current?.focus()
    await emailRef.current?.focus()

    return (
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
    )
  }

  const goNextForm = async (e: any) => {
    e.preventDefault()

    const validateInputs = await validatePartnerDataInputs()

    if (validateInputs) {
      const seeDuplicatedPartner = await searchPartnerAction(
        newPartnerData.identification_number,
      )

      if (seeDuplicatedPartner.data.length > 0) {
        setPartnerDuplicated(true)
      } else {
        const body = {
          ...newPartnerData,
          id: 0,
          name: cleanPartnerData(newPartnerData.name),
          last_name: cleanPartnerData(newPartnerData.last_name),
          birth_date:
            newPartnerData.birth_date === "" ? "-" : newPartnerData.birth_date,
          membership_start_date: today,
          created_by: parseInt(localStorage.getItem("id"), 10),
        }

        setNewPartnerData(body)
        setDisableCreatePartnerFormButton(true)
        setView(2)
      }
    }
  }

  const validatePaymentInputs = async () => {
    await paidTimeUnitRef.current?.focus()
    await paidTimeRef.current?.focus()
    await paymentRef.current?.focus()
    await paymentUserRef.current?.focus()

    const canValidate =
      paidTimeUnitRef.current.attributes.getNamedItem("data-error").value ===
        "false" &&
      paidTimeRef.current.attributes.getNamedItem("data-error").value ===
        "false" &&
      paymentRef.current.attributes.getNamedItem("data-error").value === "false"

    return canValidate
  }

  const comboCondition =
    comboSelected !== null && comboSelected !== undefined && comboSelected !== 0

  const finalizeCreate = async (e: any) => {
    e.preventDefault()
    let success = false

    const executeFunction = await validatePaymentInputs()
    if (executeFunction) {
      setDisableCreatePartnerFormButton(true)

      const partnerBody: PartnerInterface = {
        ...newPartnerData,
        free_pass:
          paidTimeUnit?.id !== null &&
          paidTimeUnit !== undefined &&
          paidTimeUnit?.id !== 1
            ? 1
            : 0,
        is_student: comboCondition
          ? `${generalTexts.yes}`
          : `${generalTexts.no}`,
      }

      const expirationDate = getExpirationDate({
        date: dateSelectedToStart,
        paidTime: paidTimeUnit !== undefined ? paidTime : 0,
        paidTimeUnit: paidTimeUnit?.id !== undefined ? paidTimeUnit?.id : 0,
        comboSelected:
          comboSelected !== null && comboSelected !== undefined
            ? comboSelected
            : 0,
      })

      const partnerPaymentBody: {
        combo: number
        time_paid: number
        time_paid_unit: number
        payment_method_id: number
        payment_method_name: string
        price_paid: number
        payment_expire_date: string
      } = {
        combo:
          comboSelected !== null && comboSelected !== undefined
            ? comboSelected
            : 0,
        time_paid:
          paidTimeUnit.id === 1
            ? evaluateFinalTime(paidTime, usesDay)
            : paidTime,
        time_paid_unit:
          paidTimeUnit !== undefined && paidTimeUnit?.id !== null
            ? paidTimeUnit.id
            : "",
        payment_method_id: paymentMethodSelected,
        payment_method_name: paymentMethods.filter(
          pm => pm.id === paymentMethodSelected,
        )[0].display_name,
        price_paid: finalPrice,
        payment_expire_date: expirationDate,
      }

      let itemId = 0
      let itemName = ""

      if (comboCondition) {
        itemId = 1
        itemName = `${partnerTexts.combo}`
      } else {
        itemId = paidTimeUnit.id === 1 ? 2 : 3
        itemName =
          paidTimeUnit.id === 1
            ? `${partnerTexts.day}`
            : `${partnerTexts.month}`
      }

      const boulderPaymentBody: {
        id: number
        item_id: number
        item_name: string
        amount_of_items: number
      } = {
        id: 0,
        item_id: itemId,
        item_name: itemName,
        amount_of_items: comboCondition ? 1 : paidTime,
      }

      const callCreatePartner = await createPartnerLogic({
        partner: partnerBody,
        partnerPayment: partnerPaymentBody,
        boulderPayment: boulderPaymentBody,
      })

      if (paymentMethodSelected === 2) {
        const executeDigitalPayment = await makeAppropiatePayment(
          paymentUserSelected.id,
          finalPrice,
          {
            id: 0,
            user_id: paymentUserSelected.id,
            user_name: paymentUserSelected.display_name,
            date: today,
            month: months.filter(m => m.id === parseInt(`${month}`, 10))[0]
              .display_name,
            month_id: parseInt(`${month}`, 10),
            total_profit: finalPrice,
            created_by: parseInt(localStorage.getItem("id"), 10),
          },
        )
        success = executeDigitalPayment.status === 200
      }
      if (success && callCreatePartner.message.status === 200) {
        setModalSuccess(callCreatePartner.message.message)
        setDisableCreatePartnerFormButton(false)
      } else {
        setModalError(callCreatePartner.message.message)
        setDisableCreatePartnerFormButton(false)
      }
    }
  }

  useEffect(() => {
    if (view === 2) {
      setDisableCreatePartnerFormButton(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view])

  return (
    <ModalForm
      title={
        view === 1
          ? `${partnerTexts.create.title}`
          : `${partnerTexts.create.payment}`
      }
      cancelButtonContent={generalTexts.actions.cancel}
      submitButtonContent={
        view === 1
          ? `${generalTexts.actions.next}`
          : `${generalTexts.actions.create}`
      }
      submit={view === 1 ? goNextForm : finalizeCreate}
      cancelFunction={cancelCreate}
      disabledButton={disableCreatePartnerFormButton}
    >
      {view === 1 && (
        <Form>
          <HorizontalGroup>
            <TextField
              required
              width={180}
              label={generalTexts.labels.name}
              type="text"
              reference={nameRef}
              onChange={e => {
                setNewPartnerData({ ...newPartnerData, name: e.target.value })
              }}
            />
            <TextField
              required
              width={180}
              label={generalTexts.labels.lastName}
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
              label={generalTexts.labels.identificationNumber}
              type="text"
              required
              backError={partnerDuplicated}
              backErrorMessage={
                partnerDuplicated && `${partnerTexts.partnerAlreadyExists}`
              }
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
              label={generalTexts.labels.birthDate}
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
              label={generalTexts.labels.email}
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
              label={generalTexts.labels.phoneNumber}
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
            <p>{partnerTexts.wants_sub}</p>
          </CheckboxContainer>
        </Form>
      )}
      {view === 2 && <PaymentForm />}
    </ModalForm>
  )
}

export default CreatePartnerForm
