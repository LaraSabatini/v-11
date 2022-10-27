import React, { useContext, useState, useEffect } from "react"
// SERVICES
import { createPartner, searchPartner } from "services/Partners/Partner.service"
import { createPartnerPayment } from "services/Partners/PartnerPayments.service"
import { getPrices } from "services/Partners/Prices.service"
import getCombos from "services/Partners/GetCombos.service"
import {
  searchDigitalPaymentByUserAndDate,
  updateDigitalPayment,
  createDigitalPayment,
} from "services/Finances/DigitalPayments.service"
import { createBoulderPurchase } from "services/Finances/Bouderpurchases.service"
// DATA STORAGE & TYPES
import { PartnersContext } from "contexts/Partners"
import partnerTexts from "strings/partners.json"
import generalTexts from "strings/general.json"
import PartnerInterface from "interfaces/partners/PartnerInterface"
import PaymentInterface from "interfaces/partners/PaymentInterface"
import { paymentMethods } from "const/finances"
import { months, day, month, year } from "const/time"
import cleanPartnerData from "utils/cleanPartnerData"
import getExpirationDate from "utils/getExpirationDate"
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
    setPrices,
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
    prices,
    disableCreatePartnerFormButton,
    setDisableCreatePartnerFormButton,
  } = useContext(PartnersContext)
  const [view, setView] = useState<number>(1)
  const [partnerDuplicated, setPartnerDuplicated] = useState<boolean>(false)

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
      const formatName = cleanPartnerData(newPartnerData.name)
      const formatLastName = cleanPartnerData(newPartnerData.last_name)

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
          name: formatName,
          last_name: formatLastName,
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

  const createPayment = async partnerId => {
    let success: boolean = false

    const expirationDate = getExpirationDate(paidTime, comboSelected)

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
      partner_id: partnerId,
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
    }

    const createPaymentCall = await createPartnerPayment(paymentBody)

    success =
      createPaymentCall.message === "partnerPayment created successfully"
    return success
  }

  const createDigitalPaymentFunc = async () => {
    let success: boolean = false
    const searchIfExists = await searchDigitalPaymentByUserAndDate(
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
      const editDigitalPayment = await updateDigitalPayment(digitalPaymentBody)

      if (editDigitalPayment.message === "payment updated successfully") {
        success = true
      } else {
        success = false
      }
    } else {
      const digitalPaymentBody = {
        id: 0,
        user_id: paymentUserSelected.id,
        user_name: paymentUserSelected.display_name,
        date: `${day}-${month}-${year}`,
        month: months.filter(m => m.id === parseInt(`${month}`, 10))[0]
          .display_name,
        month_id: parseInt(`${month}`, 10),
        total_profit: finalPrice,
      }

      const createDigital = await createDigitalPayment(digitalPaymentBody)

      success = createDigital.message === "payment created successfully"
    }
    return success
  }

  const createDayOrMonthPurchase = async () => {
    let success: boolean = false

    let finalProfit = 0
    if (paidTimeUnit.id === 1) {
      if (paidTime === 8) {
        finalProfit =
          paymentMethodSelected === 1
            ? prices[1].price_cash
            : prices[1].price_mp
      } else if (paidTime === 4) {
        finalProfit =
          paymentMethodSelected === 1
            ? prices[6].price_cash
            : prices[6].price_mp
      } else {
        finalProfit =
          paymentMethodSelected === 1
            ? paidTime * prices[0].price_cash
            : paidTime * prices[0].price_mp
      }
    } else {
      finalProfit =
        paymentMethodSelected === 1
          ? paidTime * prices[2].price_cash
          : paidTime * prices[2].price_mp
    }

    const boulderPurchaseBody = {
      id: 0,
      date: `${day}-${month}-${year}`,
      item_id: paidTimeUnit.id === 1 ? 2 : 3,
      item_name:
        paidTimeUnit.id === 1 ? `${partnerTexts.day}` : `${partnerTexts.month}`,
      amount_of_items: paidTime,
      profit: finalProfit,
      payment_method_id: paymentMethodSelected,
      created_by: parseInt(localStorage.getItem("id"), 10),
    }

    const createBoulderPurchaseCall = await createBoulderPurchase(
      boulderPurchaseBody,
    )
    success =
      createBoulderPurchaseCall.message === "bouderPayment created successfully"

    return success
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

      const body: PartnerInterface = {
        ...newPartnerData,
        free_pass:
          paidTimeUnit?.id !== null &&
          paidTimeUnit !== undefined &&
          paidTimeUnit?.id !== 1
            ? 1
            : 0,
        is_student: `${generalTexts.no.toUpperCase()}`,
      }
      const apiValidation = await createPartner(body)

      if (apiValidation.message === "partner created successfully") {
        const executePurchase = await createPayment(apiValidation.partnerId)
        success = executePurchase
      }

      if (paymentMethodSelected === 2) {
        const executePurchase = await createDigitalPaymentFunc()
        success = executePurchase
      }

      const comboCondition =
        comboSelected !== null &&
        comboSelected !== undefined &&
        comboSelected !== 0

      if (comboCondition) {
        const boulderPurchaseBody = {
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
        }

        const createBoulderPurchaseCall = await createBoulderPurchase(
          boulderPurchaseBody,
        )
        success =
          createBoulderPurchaseCall.message ===
          "bouderPayment created successfully"
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
      submit={view === 1 ? handleCreate : finalizeCreate}
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
