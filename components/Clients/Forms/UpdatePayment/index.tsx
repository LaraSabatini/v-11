import React, { useContext, useState } from "react"
import { PartnersContext } from "contexts/Partners"
import { timeUnits } from "const/time"
import { paymentMethods, paymentUsers } from "const/finances"
import partnerTexts from "strings/partners.json"
import generalTexts from "strings/general.json"
import CombosInterface from "interfaces/partners/CombosInterface"
import PaymentInterface from "interfaces/partners/PaymentInterface"
import InputCalendar from "components/UI/InputCalendar"
import ModalForm from "components/UI/ModalForm"
import Autocomplete from "components/UI/Autocomplete"
import TextField from "components/UI/TextField"
import Checkbox from "components/UI/Checkbox"
import checkIfCanUpdatePayment from "../../Helpers/functional/checkIfcanUpdatePayment"
import { HorizontalGroup, SubContainer, CheckboxContainer } from "./styles"

interface EditPaymentInterface {
  cancelEdit: (arg?: any) => void
  partnerName: string
  partnerLastName: string
  initialPayment: PaymentInterface
}

function UpdatePaymentForm({
  cancelEdit,
  partnerName,
  partnerLastName,
  initialPayment,
}: EditPaymentInterface) {
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
    setPaymentUserSelected,
    paymentRef,
    setPaymentMethodSelected,
    finalPrice,
    paymentMethodSelected,
    paymentUserRef,
    startDateRef,
    dateSelectedToStart,
    setDateSelectedToStart,
    isChecked,
    paidTimeUnit,
    usesDay,
    setUsesDay,
    setModalErrorAddDays,
  } = useContext(PartnersContext)

  const [disabledButton, setDisabledButton] = useState<boolean>(false)

  const comboCondition =
    newValues?.combo !== null &&
    newValues?.combo !== undefined &&
    newValues?.combo !== 0

  const validateComboInputs = async () => {
    await paidTimeRef.current?.focus()
    await paidTimeUnitRef.current?.focus()

    return (
      paidTimeRef.current.attributes.getNamedItem("data-error").value ===
        "false" &&
      paidTimeUnitRef.current.attributes.getNamedItem("data-error").value ===
        "false"
    )
  }

  const handleEdit = async (e: any) => {
    e.preventDefault()
    setDisabledButton(true)

    let success = false
    let canPurchase = false

    const comboInputValidation = await validateComboInputs()

    if (comboSelected === null) {
      canPurchase = comboInputValidation
    } else {
      canPurchase = false
    }
    await paymentRef.current?.focus()

    if (paymentMethodSelected === 2) {
      await paymentUserRef.current?.focus()
      canPurchase =
        paymentUserRef.current.attributes.getNamedItem("data-error").value ===
        "false"
    }

    const checkValidity = checkIfCanUpdatePayment(initialPayment)

    if (comboCondition && checkValidity.combos) {
      canPurchase = true
    } else if (paidTime > 0 && paidTimeUnit.id === 1 && checkValidity.days) {
      canPurchase = true
    } else if (paidTime > 0 && paidTimeUnit.id === 2 && checkValidity.months) {
      canPurchase = true
    } else {
      canPurchase = false
    }

    if (!canPurchase) {
      setModalErrorAddDays({
        status: "alert",
        icon: "IconExclamation",
        title: `${partnerTexts.cannotAddDays.title}`,
        content: `${partnerTexts.cannotAddDays.content}`,
      })
    }

    if (canPurchase) {
      setDisabledButton(true)

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
        success = executePurchase
      }

      if (checkValidity.combos && checkValidity.days && checkValidity.months) {
        const expirationDate = getExpirationDate(
          dateSelectedToStart,
          paidTime,
          comboSelected,
        )
        const createPartnerPayment = await createPartnerPaymentAction({
          ...newValues,
          time_paid: newValues.time_paid,
          price_paid: finalPrice,
          payment_expire_date:
            (paidTimeUnit !== undefined && paidTimeUnit.id === 2) ||
            (comboSelected !== null && comboSelected !== undefined)
              ? expirationDate
              : "",
          date: dateSelectedToStart,
          created_by: parseInt(localStorage.getItem("id"), 10),
        })

        success = createPartnerPayment
      } else {
        const updatePartnerPayment = await editPartnerPaymentAction({
          ...initialPayment,
          time_paid: usesDay
            ? initialPayment.time_paid + paidTime - 1
            : initialPayment.time_paid + paidTime,
          date: today,
          created_by: parseInt(localStorage.getItem("id"), 10),
        })
        success = updatePartnerPayment
      }
    }
  }

  const combosAutocomplete = []
  combos.map((combo: CombosInterface) =>
    combosAutocomplete.push({
      id: combo.id,
      display_name: combo.name,
    }),
  )

  return (
    <ModalForm
      title={`${partnerTexts.edit.title} - ${partnerName} ${partnerLastName}`}
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
          label="Fecha de inicio"
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
