import React, { useContext, useState, useEffect } from "react"
// SERVICES
import getCombos from "services/Partners/GetCombos.service"
// DATA STORAGE & TYPES
import {
  createPartnerAction,
  searchPartnerAction,
  createPartnerPaymentAction,
} from "helpers/partners"
import {
  createBoulderPurchaseAction,
  makeAppropiatePayment,
} from "helpers/payments"
import { GeneralContext } from "contexts/GeneralContext"
import { PartnersContext } from "contexts/Partners"
import partnerTexts from "strings/partners.json"
import generalTexts from "strings/general.json"
import { paymentMethods } from "const/finances"
import { months, day, month, year } from "const/time"
import { cleanPartnerData, getExpirationDate, evaluateFinalTime } from "utils"
// COMPONENTS
import ModalForm from "components/UI/ModalForm"
import TextField from "components/UI/TextField"
import InputCalendar from "components/UI/InputCalendar"
import Checkbox from "components/UI/Checkbox"
import calcPriceMonthOrDay from "../utils/calcPriceForMonthOrDayPurchase"
import MakePayment from "./MakePayment"
import { Form, HorizontalGroup, CheckboxContainer } from "./styles"

interface CreateInterface {
  cancelCreate: () => void
}

function CreatePartner({ cancelCreate }: CreateInterface) {
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
    setCombos,
    comboSelected,
    paymentMethodSelected,
    finalPrice,
    phoneRef,
    wantsSubscription,
    setWantsSubscription,
    usesDay,
    paymentUserRef,
    paymentUserSelected,
    combos,
    disableCreatePartnerFormButton,
    setDisableCreatePartnerFormButton,
  } = useContext(PartnersContext)
  const [view, setView] = useState<number>(1)
  const [partnerDuplicated, setPartnerDuplicated] = useState<boolean>(false)
  const { prices } = useContext(GeneralContext)

  const goNextForm = async e => {
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
          membership_start_date: `${day}/${month}/${year}`,
          created_by: parseInt(localStorage.getItem("id"), 10),
        }

        setNewPartnerData(body)
        setDisableCreatePartnerFormButton(true)
        setView(2)
      }
    }
  }

  const createPayment = async (partnerId: number) => {
    const expirationDate = getExpirationDate(paidTime, comboSelected)

    const createPaymentCall = await createPartnerPaymentAction({
      id: 0,
      partner_id: partnerId,
      partner_name: newPartnerData.name,
      partner_last_name: newPartnerData.last_name,
      combo:
        comboSelected !== null && comboSelected !== undefined
          ? comboSelected
          : 0,
      time_paid:
        paidTimeUnit.id === 1 ? evaluateFinalTime(paidTime, usesDay) : paidTime,
      time_paid_unit:
        paidTimeUnit !== undefined && paidTimeUnit?.id !== null
          ? paidTimeUnit.id
          : "",
      payment_method_id: paymentMethodSelected,
      payment_method_name: paymentMethods.filter(
        pm => pm.id === paymentMethodSelected,
      )[0].display_name,
      price_paid: finalPrice,
      date: `${day}-${month}-${year}`,
      payment_expire_date:
        (paidTimeUnit !== undefined && paidTimeUnit.id === 2) ||
        (comboSelected !== null && comboSelected !== undefined)
          ? expirationDate
          : "",
      created_by: parseInt(localStorage.getItem("id"), 10),
    })

    return createPaymentCall
  }

  const createDayOrMonthPurchase = async () => {
    const finalProfit = calcPriceMonthOrDay(
      paidTimeUnit.id,
      paidTime,
      paymentMethodSelected,
      prices,
    )

    const createBoulderPurchaseCall = await createBoulderPurchaseAction({
      id: 0,
      date: `${day}-${month}-${year}`,
      item_id: paidTimeUnit.id === 1 ? 2 : 3,
      item_name:
        paidTimeUnit.id === 1 ? `${partnerTexts.day}` : `${partnerTexts.month}`,
      amount_of_items: paidTime,
      profit: finalProfit,
      payment_method_id: paymentMethodSelected,
      created_by: parseInt(localStorage.getItem("id"), 10),
    })

    return createBoulderPurchaseCall
  }

  const finalizeCreate = async e => {
    e.preventDefault()

    await paidTimeUnitRef.current?.focus()
    await paidTimeRef.current?.focus()
    await paymentRef.current?.focus()
    await paymentUserRef.current?.focus()

    let success = false
    if (
      paidTimeUnitRef.current.attributes.getNamedItem("data-error").value ===
        "false" &&
      paidTimeRef.current.attributes.getNamedItem("data-error").value ===
        "false" &&
      paymentRef.current.attributes.getNamedItem("data-error").value === "false"
    ) {
      setDisableCreatePartnerFormButton(true)

      const createPartner = await createPartnerAction({
        ...newPartnerData,
        free_pass:
          paidTimeUnit?.id !== null &&
          paidTimeUnit !== undefined &&
          paidTimeUnit?.id !== 1
            ? 1
            : 0,
        is_student: `${generalTexts.no.toUpperCase()}`,
      })

      if (createPartner.success) {
        const executePurchase = await createPayment(createPartner.partnerId)
        success = executePurchase
      }

      if (paymentMethodSelected === 2 && createPartner.success) {
        const executePurchase = await makeAppropiatePayment(
          paymentUserSelected.id,
          finalPrice,
          {
            id: 0,
            user_id: paymentUserSelected.id,
            user_name: paymentUserSelected.display_name,
            date: `${day}-${month}-${year}`,
            month: months.filter(m => m.id === parseInt(`${month}`, 10))[0]
              .display_name,
            month_id: parseInt(`${month}`, 10),
            total_profit: finalPrice,
            created_by: parseInt(localStorage.getItem("id"), 10),
          },
        )
        success = executePurchase
      }

      const comboCondition =
        comboSelected !== null &&
        comboSelected !== undefined &&
        comboSelected !== 0

      if (comboCondition) {
        const createBoulderPurchaseCall = await createBoulderPurchaseAction({
          id: 0,
          date: `${day}-${month}-${year}`,
          item_id: 1,
          item_name: `${partnerTexts.combo}`,
          amount_of_items: 1,
          profit:
            paymentMethodSelected === 1
              ? combos[0].price_cash
              : combos[0].price_mp,
          payment_method_id: paymentMethodSelected,
          created_by: parseInt(localStorage.getItem("id"), 10),
        })
        success = createBoulderPurchaseCall
      }
      if (paidTime !== 0) {
        const executePurchase = await createDayOrMonthPurchase()
        success = executePurchase
      }
    }

    if (success) {
      setModalSuccess({
        status: "success",
        icon: "IconCheckModal",
        title: `${generalTexts.modalTitles.success}`,
        content: `${partnerTexts.create.success.content}`,
      })
      setDisableCreatePartnerFormButton(false)
    } else {
      setModalError({
        status: "alert",
        icon: "IconExclamation",
        title: `${generalTexts.modalTitles.error}`,
        content: `${partnerTexts.create.error.content}`,
      })
      setDisableCreatePartnerFormButton(false)
    }
  }

  const getCombosData = async () => {
    const combosData = await getCombos()
    setCombos(combosData.data)
  }

  useEffect(() => {
    getCombosData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
      {view === 2 && <MakePayment />}
    </ModalForm>
  )
}

export default CreatePartner
