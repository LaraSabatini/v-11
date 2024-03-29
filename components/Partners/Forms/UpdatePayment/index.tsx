import React, { useContext, useState, useEffect } from "react"
import { PartnersContext } from "contexts/Partners"
import { GeneralContext } from "contexts/GeneralContext"
import CombosInterface from "interfaces/partners/CombosInterface"
import PaymentInterface from "interfaces/partners/PaymentInterface"
import PartnerInterface from "interfaces/partners/PartnerInterface"
import {
  createBoulderPurchaseAction,
  makeAppropiatePayment,
} from "helpers/payments"
import {
  createPartnerPaymentAction,
  editPartnerPaymentAction,
  editPartnerAction,
} from "helpers/partners"
import { expireDateReminderEmail } from "services/SendEmail.service"
import { timeUnits, months, day, month, year } from "const/time"
import { paymentMethods, paymentUsers } from "const/finances"
import { getExpirationDate, evaluateFinalTime } from "utils"
import partnerTexts from "strings/partners.json"
import generalTexts from "strings/general.json"
import financesTexts from "strings/finances.json"
import InputCalendar from "components/UI/InputCalendar"
import ModalForm from "components/UI/ModalForm"
import Autocomplete from "components/UI/Autocomplete"
import TextField from "components/UI/TextField"
import Checkbox from "components/UI/Checkbox"
import checkIfCanUpdatePayment from "../../Helpers/functional/checkIfcanUpdatePayment"
import calculatePriceForMonthOrDay from "../../Helpers/functional/calculatePrice"
import { HorizontalGroup, SubContainer, CheckboxContainer } from "../styles"

interface UpdatePaymentInterface {
  cancelEdit: (arg?: any) => void
  partnerInfo: PartnerInterface
  initialPayment: PaymentInterface
}

function UpdatePaymentForm({
  cancelEdit,
  partnerInfo,
  initialPayment,
}: UpdatePaymentInterface) {
  const {
    combos,
    setNewValues,
    newValues,
    comboRef,
    setComboSelected,
    comboSelected,
    paidTimeRef,
    setPaidTime,
    paidTime,
    paidTimeUnitRef,
    setPaidTimeUnit,
    setIsChecked,
    paymentRef,
    setPaymentMethodSelected,
    finalPrice,
    setPaymentUserSelected,
    paymentMethodSelected,
    paymentUserRef,
    startDateRef,
    dateSelectedToStart,
    setDateSelectedToStart,
    isChecked,
    paidTimeUnit,
    usesDay,
    setUsesDay,
    // setModalErrorAddDays,
    paymentUserSelected,
    setModalSuccess,
    setModalError,
    calculatePrice,
  } = useContext(PartnersContext)

  const { prices } = useContext(GeneralContext)

  const [disabledButton, setDisabledButton] = useState<boolean>(false)

  const today = `${day}-${month}-${year}`

  const validateInputs = async () => {
    await paidTimeRef.current?.focus()
    await paidTimeUnitRef.current?.focus()

    return (
      paidTimeRef.current.attributes.getNamedItem("data-error").value ===
        "false" &&
      paidTimeUnitRef.current.attributes.getNamedItem("data-error").value ===
        "false"
    )
  }

  const comboCondition =
    newValues?.combo !== null &&
    newValues?.combo !== undefined &&
    newValues?.combo !== 0

  const addPayment = async () => {
    let itemId = 0
    let itemName = ""
    let profit = 0

    if (comboCondition) {
      itemId = 1
      itemName = `${financesTexts.combo}`
      profit =
        paymentMethodSelected === 1 ? combos[0].price_cash : combos[0].price_mp
    } else {
      itemId = paidTimeUnit.id === 1 ? 2 : 3
      itemName =
        paidTimeUnit.id === 1
          ? `${financesTexts.day}`
          : `${financesTexts.month}`

      const finalProfit = calculatePriceForMonthOrDay(
        paidTimeUnit.id,
        paidTime,
        paymentMethodSelected,
        prices,
      )
      profit = finalProfit
    }

    const createBoulderPurchaseCall = await createBoulderPurchaseAction({
      id: 0,
      date: today,
      item_id: itemId,
      item_name: itemName,
      amount_of_items: comboCondition ? 1 : paidTime,
      profit,
      payment_method_id: paymentMethodSelected,
      created_by: parseInt(localStorage.getItem("id"), 10),
    })

    return createBoulderPurchaseCall.status === 200
  }

  const handleEdit = async (e: any) => {
    e.preventDefault()

    let success = false
    let canPurchase = false

    if (comboSelected === null) {
      const validate = await validateInputs()
      canPurchase = validate
    } else {
      canPurchase = true
    }

    await paymentRef.current?.focus()

    if (paymentMethodSelected === 2) {
      await paymentUserRef.current?.focus()
      canPurchase =
        paymentUserRef.current.attributes.getNamedItem("data-error").value ===
        "false"
    }

    const checkValidityOfPayment = checkIfCanUpdatePayment(initialPayment)

    if (comboCondition && checkValidityOfPayment.combos) {
      canPurchase = true
    } else if (
      paidTime > 0 &&
      paidTimeUnit.id === 1 &&
      checkValidityOfPayment.days
    ) {
      canPurchase = true
    } else if (
      paidTime > 0 &&
      paidTimeUnit.id === 2 &&
      checkValidityOfPayment.months
    ) {
      canPurchase = true
    } else {
      canPurchase = false
    }

    // if (!canPurchase) {
    //   setModalErrorAddDays({
    //     status: "alert",
    //     icon: "IconExclamation",
    //     title: `${partnerTexts.cannotAddDays.title}`,
    //     content: `${partnerTexts.cannotAddDays.content}`,
    //   })
    // } else {
    setDisabledButton(true)

    const expirationDate = getExpirationDate({
      date: dateSelectedToStart,
      paidTime: paidTimeUnit !== undefined ? paidTime : 0,
      paidTimeUnit: paidTimeUnit?.id !== undefined ? paidTimeUnit?.id : 0,
      comboSelected:
        comboSelected !== null && comboSelected !== undefined
          ? comboSelected
          : 0,
    })

    const makeBoulderPurchase = await addPayment()
    success = makeBoulderPurchase

    if (paymentMethodSelected === 2) {
      const executePurchase = await makeAppropiatePayment(
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
      success = executePurchase.status === 200
    }

    if (
      checkValidityOfPayment.combos &&
      checkValidityOfPayment.days &&
      checkValidityOfPayment.months
    ) {
      const createPartnerPayment = await createPartnerPaymentAction({
        ...newValues,
        time_paid:
          paidTimeUnit.id === 1
            ? evaluateFinalTime(newValues.time_paid, usesDay)
            : newValues.time_paid,
        price_paid: finalPrice,
        payment_expire_date: expirationDate,
        date: dateSelectedToStart,
        created_by: parseInt(localStorage.getItem("id"), 10),
      })

      success = createPartnerPayment.status === 200
    } else {
      const updatePartnerPayment = await editPartnerPaymentAction({
        ...initialPayment,
        time_paid: usesDay
          ? initialPayment.time_paid + paidTime - 1
          : initialPayment.time_paid + paidTime,
        date: today,
        created_by: parseInt(localStorage.getItem("id"), 10),
      })
      success = updatePartnerPayment.status === 200
    }

    const newPartnerInfo = { ...partnerInfo }
    if (partnerInfo.free_pass === 0 && paidTimeUnit.id === 2) {
      newPartnerInfo.free_pass = 1
    }
    if (partnerInfo.free_pass === 1 && paidTimeUnit.id === 1) {
      newPartnerInfo.free_pass = 0
    }

    const editPartnerData = await editPartnerAction(newPartnerInfo)
    success = editPartnerData.status === 200

    if (partnerInfo.email !== "") {
      const itemName =
        paidTimeUnit.id === 1
          ? `${financesTexts.day}`
          : `${financesTexts.month}`

      const emailBody = {
        recipients: partnerInfo.email,
        subject: "Información de compra",
        item: `${comboCondition ? 1 : paidTime} x ${itemName}`,
        url: `https://calendar.google.com/calendar/render?action=TEMPLATE&dates=${expirationDate.slice(
          6,
          10,
        )}${expirationDate.slice(3, 5)}${expirationDate.slice(
          0,
          2,
        )}%2F${expirationDate.slice(6, 10)}${expirationDate.slice(
          3,
          5,
        )}${expirationDate.slice(0, 2)}&details=Tu%20compra%20de%20%20${
          comboCondition ? 1 : paidTime
        }%20x%20${itemName}%20vence%20hoy%21&location=https%3A%2F%2Fwww.google.com%2Fmaps%2Fplace%2FV_Once_Escalada%2F%40-34.6118186%2C-58.4122726%2C17z%2Fdata%3D%213m1%214b1%214m5%213m4%211s0x95bccb0a038ffc5d%3A0xa8cd4418a36f0576%218m2%213d-34.6118186%214d-58.4100786&text=Vencimiento%20de%20pago`,
        expDate: expirationDate,
      }
      const sendMail = await expireDateReminderEmail(emailBody)
      success = sendMail.status === 200
    }
    // }

    if (success) {
      setModalSuccess({
        status: "success",
        icon: "IconCheckModal",
        title: `${generalTexts.modalTitles.success}`,
        content: `${partnerTexts.updatePaymentSuccess.content}`,
      })
    } else if (!success && canPurchase) {
      setModalError({
        status: "alert",
        icon: "IconExclamation",
        title: `${generalTexts.modalTitles.error}`,
        content: `${partnerTexts.updatePaymentError.content}`,
      })
    }
  }

  const combosAutocomplete = []
  combos?.map((combo: CombosInterface) =>
    combosAutocomplete.push({
      id: combo.id,
      display_name: combo.name,
    }),
  )

  useEffect(() => {
    calculatePrice(prices)
    //   eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paidTimeUnit, paidTime, paymentMethodSelected, comboSelected])

  return (
    <ModalForm
      title={`${partnerTexts.edit.title} - ${partnerInfo.name} ${partnerInfo.last_name}`}
      cancelButtonContent={generalTexts.actions.cancel}
      submitButtonContent={generalTexts.actions.confirm}
      submit={handleEdit}
      cancelFunction={cancelEdit}
      disabledButton={disabledButton}
    >
      <HorizontalGroup>
        <Autocomplete
          label={partnerTexts.combo}
          width={180}
          options={combosAutocomplete}
          setValue={
            newValues.combo !== 0 && newValues.combo !== null
              ? combos.filter(
                  (combo: CombosInterface) => combo.id === newValues.combo,
                )[0].name
              : ""
          }
          ref={comboRef}
          onChangeProps={(e: { id: number; display_name: string }) => {
            setComboSelected(e.id)
            setNewValues({ ...newValues, combo: e.id })
          }}
        />
        <TextField
          label={partnerTexts.combo_price}
          type="number"
          disabledAutocompleted
          disabled
          width={100}
          value={
            comboSelected !== null && comboSelected !== undefined
              ? `${
                  combos.filter(
                    (combo: CombosInterface) => combo.id === comboSelected,
                  )[0]?.price_cash
                } /  ${
                  combos.filter(
                    (combo: CombosInterface) => combo.id === comboSelected,
                  )[0]?.price_mp
                }`
              : ""
          }
        />
      </HorizontalGroup>
      {comboSelected === null && (
        <HorizontalGroup>
          <SubContainer>
            <TextField
              width={60}
              label={partnerTexts.time}
              type="number"
              reference={paidTimeRef}
              required={comboSelected === null}
              onChange={e => {
                const number = parseInt(e.target.value, 10)
                // eslint-disable-next-line no-restricted-globals
                if (isNaN(number)) {
                  setPaidTime(0)
                  setNewValues({ ...newValues, time_paid: 0 })
                } else {
                  setPaidTime(number)
                  setNewValues({ ...newValues, time_paid: number })
                }
              }}
            />
            <Autocomplete
              label={partnerTexts.create.unit}
              required={paidTime !== 0 && paidTime !== ""}
              width={115}
              options={timeUnits}
              setValue={
                newValues.time_paid_unit !== 0
                  ? timeUnits.filter(
                      tu => tu.id === newValues.time_paid_unit,
                    )[0]?.display_name
                  : ""
              }
              ref={paidTimeUnitRef}
              onChangeProps={(e: { id: number; display_name: string }) => {
                setPaidTimeUnit(e)
                setNewValues({ ...newValues, time_paid_unit: e.id })
                if (e.id !== 1) {
                  setIsChecked(true)
                } else {
                  setIsChecked(false)
                }
              }}
            />
          </SubContainer>
        </HorizontalGroup>
      )}
      <HorizontalGroup>
        <Autocomplete
          required
          label={partnerTexts.payment_method}
          width={150}
          options={paymentMethods}
          setValue={
            newValues.payment_method_name !== "0"
              ? `${newValues.payment_method_name}`
              : ""
          }
          ref={paymentRef}
          onChangeProps={(e: { id: number; display_name: string }) => {
            setPaymentMethodSelected(e.id)
            setNewValues({
              ...newValues,
              payment_method_name: e.display_name,
              payment_method_id: e.id,
            })
            if (e.id === 1) {
              setPaymentUserSelected(null)
            }
          }}
        />
        <TextField
          label={partnerTexts.final_price}
          type="text"
          disabledAutocompleted
          disabled
          width={130}
          value={`${finalPrice}` || ""}
        />
      </HorizontalGroup>
      {paymentMethodSelected === 2 && (
        <HorizontalGroup>
          <Autocomplete
            required
            label={generalTexts.payments.digital_user}
            width={150}
            options={paymentUsers}
            ref={paymentUserRef}
            onChangeProps={(e: { id: number; display_name: string }) =>
              setPaymentUserSelected(e)
            }
          />
        </HorizontalGroup>
      )}
      <HorizontalGroup>
        <InputCalendar
          reference={startDateRef}
          label={partnerTexts.start_date}
          width={200}
          valueCalendar={dateSelectedToStart}
          onChange={e =>
            setDateSelectedToStart(
              `${e.selectedChangeDate.slice(0, 2)}-${e.selectedChangeDate.slice(
                3,
                5,
              )}-${e.selectedChangeDate.slice(6, 10)}`,
            )
          }
        />
      </HorizontalGroup>
      <div style={{ display: "flex", gap: "10px" }}>
        <CheckboxContainer>
          <Checkbox checked={isChecked} isDisabled idParam="free-pass" />
          <p>{partnerTexts.free_pass}</p>
        </CheckboxContainer>
        {paidTimeUnit.id === 1 && (
          <CheckboxContainer>
            <Checkbox
              ownState
              checked={usesDay}
              onChange={() => setUsesDay(!usesDay)}
              idParam="use-day"
            />
            <p>{partnerTexts.usesDay}</p>
          </CheckboxContainer>
        )}
      </div>
    </ModalForm>
  )
}

export default UpdatePaymentForm
