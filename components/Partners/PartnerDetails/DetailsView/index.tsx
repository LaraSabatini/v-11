import React, { useState, useContext, useEffect } from "react"
// DATA STORAGE & TYPES
import {
  createPartnerPaymentAction,
  editPartnerPaymentAction,
  deletePartnerAction,
  getPartnerPaymentsByIdAction,
} from "helpers/partners"
import {
  createBoulderPurchaseAction,
  makeAppropiatePayment,
} from "helpers/payments"
import { GeneralContext } from "contexts/GeneralContext"
import { months, day, month, year } from "const/time"
import PartnerInterface from "interfaces/partners/PartnerInterface"
import PaymentInterface from "interfaces/partners/PaymentInterface"
import { PartnersContext } from "contexts/Partners"
import partnerTexts from "strings/partners.json"
import generalTexts from "strings/general.json"
import financesTexts from "strings/finances.json"
import { getExpirationDate, evaluateFinalTime } from "utils"
// COMPONENTS & STYLING
import TextButton from "components/UI/TextButton"
import ModalAlert from "components/UI/ModalAlert"
import Icon from "components/UI/Assets/Icon"
import checkIfCanUpdatePayment from "../../helpers/checkIfCanUpdatePayment"
import EditPayment from "./EditPayment"
import ModalChanges from "../ModalChanges"
import calcPriceMonthOrDay from "../../helpers/calcPriceForMonthOrDayPurchase"
import {
  PartnerData,
  Details,
  RemoveButton,
  ButtonContainer,
  DaysLeft,
} from "./styles"

interface DetailViewInterface {
  partnerInfo: PartnerInterface
  canUpdate: boolean
}

function DetailsView({ partnerInfo, canUpdate }: DetailViewInterface) {
  const {
    setModalSuccess,
    setModalError,
    setNewValues,
    cleanStates,
    newValues,
    paidTime,
    comboSelected,
    finalPrice,
    paidTimeUnit,
    paidTimeUnitRef,
    paymentRef,
    setModalErrorAddDays,
    modalErrorAddDays,
    paymentMethodSelected,
    paymentUserSelected,
    usesDay,
    combos,
    paidTimeRef,
    paymentUserRef,
    setHasChanges,
    modalHasChanges,
    setModalHasChanges,
    dateSelectedToStart,
  } = useContext(PartnersContext)
  const { prices } = useContext(GeneralContext)

  const [initialPayment, setInitialPayment] = useState<PaymentInterface>()
  const [safeModal, setSafeModal] = useState<boolean>(false)
  const [updatePaymentModal, setUpdatePaymentModal] = useState<boolean>(false)
  const [changes, setChanges] = useState<boolean>(false)
  const [variableValues, setVariableValues] = useState([
    { name: "days", value: 0 },
  ])

  const [disabledButton, setDisabledButton] = useState<boolean>(false)

  const [changedDays, setChangedDays] = useState<boolean>(false)

  const getPermissions = localStorage.getItem("permissions")
  const permissions = JSON.parse(getPermissions)[0].sections[0].sub_sections[0]
  const canDeletePartner = permissions.actions.delete

  const today = `${day}-${month}-${year}`

  const deletePartnerFunction = async () => {
    const deletion = await deletePartnerAction(partnerInfo.id)

    if (deletion) {
      setModalSuccess({
        status: "success",
        icon: "IconCheckModal",
        title: `${generalTexts.modalTitles.success}`,
        content: `${partnerTexts.delete.success.content}`,
      })
    } else {
      setModalError({
        status: "alert",
        icon: "IconExclamation",
        title: `${generalTexts.modalTitles.error}`,
        content: `${partnerTexts.delete.error.content}`,
      })
    }
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

      const finalProfit = calcPriceMonthOrDay(
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

    return createBoulderPurchaseCall
  }

  const handleEdit = async e => {
    e.preventDefault()
    let success = false

    let canPurchase = false

    if (comboSelected === null) {
      await paidTimeRef.current?.focus()
      await paidTimeUnitRef.current?.focus()
      canPurchase =
        paidTimeRef.current.attributes.getNamedItem("data-error").value ===
          "false" &&
        paidTimeUnitRef.current.attributes.getNamedItem("data-error").value ===
          "false"
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

    const checkAvailability = checkIfCanUpdatePayment(initialPayment)

    if (comboCondition && checkAvailability.combos) {
      canPurchase = true
    } else if (
      paidTime > 0 &&
      paidTimeUnit.id === 1 &&
      checkAvailability.days
    ) {
      canPurchase = true
    } else if (
      paidTime > 0 &&
      paidTimeUnit.id === 2 &&
      checkAvailability.months
    ) {
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

      if (
        checkAvailability.combos &&
        checkAvailability.days &&
        checkAvailability.months
      ) {
        const expirationDate = getExpirationDate(
          dateSelectedToStart,
          paidTime,
          comboSelected,
        )
        const createPartnerPayment = await createPartnerPaymentAction({
          ...newValues,
          time_paid:
            paidTimeUnit.id === 1
              ? evaluateFinalTime(newValues.time_paid, usesDay)
              : newValues.time_paid,
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

  const excecuteChanges = async () => {
    setHasChanges(false)

    let success: boolean = false
    if (changedDays) {
      if (initialPayment.time_paid > 0) {
        const edit = await editPartnerPaymentAction({
          ...initialPayment,
          time_paid: variableValues[0].value > 0 ? variableValues[0].value : 0,
          time_paid_unit:
            variableValues[0].value > 0 ? initialPayment.time_paid_unit : 0,
          created_by: parseInt(localStorage.getItem("id"), 10),
        })
        success = edit
      }
    }

    if (success) {
      setChangedDays(false)
      setChanges(false)
    }
  }

  const getPayment = async () => {
    const data = await getPartnerPaymentsByIdAction(partnerInfo.id)

    if (data.length > 0) {
      setInitialPayment(data[data.length - 1]) // ACA SETEAR AL ULTIMO
      setVariableValues([
        {
          name: "days",
          value:
            data[data.length - 1].time_paid_unit === 1
              ? data[data.length - 1].time_paid
              : 0,
        },
      ])
    } else {
      setInitialPayment({
        id: 0,
        partner_id: partnerInfo.id,
        partner_name: partnerInfo.name,
        partner_last_name: partnerInfo.last_name,
        combo: 0,
        time_paid: 0,
        time_paid_unit: 0,
        payment_method_id: 0,
        payment_method_name: `${generalTexts.payments.cash}`,
        price_paid: 0,
        date: "",
        payment_expire_date: "",
        created_by: 0,
      })
      setVariableValues([
        {
          name: "days",
          value: 0,
        },
      ])
    }
  }

  useEffect(() => {
    if (partnerInfo !== undefined) {
      getPayment()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [partnerInfo])

  const cancelDiscard = () => {
    setModalHasChanges(false)
  }

  return (
    <Details>
      {modalHasChanges && (
        <ModalChanges
          cancelDiscard={cancelDiscard}
          discardChanges={() => {
            setModalHasChanges(false)
            setHasChanges(false)
            setChanges(false)
            setVariableValues([
              { name: "days", value: initialPayment.time_paid },
            ])
          }}
        />
      )}
      {modalErrorAddDays !== null && (
        <ModalAlert
          success={false}
          message={modalErrorAddDays}
          closeModal={() => {
            cleanStates()
          }}
        />
      )}
      {safeModal && (
        <ModalAlert
          success={false}
          message={{
            status: "alert",
            icon: "IconExclamation",
            title: `${partnerTexts.deleteWarning.title}`,
            content: `${partnerTexts.deleteWarning.content}`,
          }}
          closeModal={() => setSafeModal(false)}
          closeRefresh={() => setSafeModal(false)}
          mainButtonContent={generalTexts.actions.delete}
          secondButtonContent={generalTexts.actions.cancel}
          mainAction={deletePartnerFunction}
          isNotice
        />
      )}
      <div>
        <PartnerData>
          <p>{partnerTexts.full_name}</p>
          {partnerInfo?.name} {partnerInfo?.last_name}
        </PartnerData>

        {partnerInfo?.email !== "" ? (
          <PartnerData>
            <p>{generalTexts.labels.email}</p>
            {partnerInfo?.email}
          </PartnerData>
        ) : (
          <div />
        )}

        {partnerInfo?.phone !== "" ? (
          <PartnerData>
            <p>{generalTexts.labels.phoneNumber}</p>
            {partnerInfo?.phone}
          </PartnerData>
        ) : (
          <div />
        )}

        {partnerInfo?.identification_number !== "" ? (
          <PartnerData>
            <p>{generalTexts.labels.identificationNumber}</p>
            {partnerInfo?.identification_number}
          </PartnerData>
        ) : (
          <div />
        )}

        <PartnerData>
          <p>{partnerTexts.member_since}</p>
          {partnerInfo?.membership_start_date}
        </PartnerData>

        {initialPayment !== undefined &&
          initialPayment.payment_expire_date !== "" && (
            <PartnerData>
              <p>{partnerTexts.paymentExpires}</p>
              {initialPayment.payment_expire_date}
            </PartnerData>
          )}

        <PartnerData>
          <p>{partnerTexts.remainingDays}</p>
          <DaysLeft>
            <button
              className="remove"
              type="button"
              onClick={() => {
                setChangedDays(true)
                setChanges(true)
                setHasChanges(true)
                setVariableValues([
                  { name: "days", value: variableValues[0].value - 1 },
                ])
              }}
            >
              <Icon icon="IconLess" />
            </button>
            <p className="number">{variableValues[0].value}</p>
          </DaysLeft>
        </PartnerData>
      </div>

      <ButtonContainer>
        <RemoveButton
          type="button"
          disabledButton={!canDeletePartner}
          onClick={() => {
            if (canDeletePartner) {
              setSafeModal(true)
            }
          }}
        >
          {generalTexts.actions.removeRecord}
        </RemoveButton>
        {changes === false && (
          <TextButton
            content={partnerTexts.updatePayment}
            cta
            disabled={!canUpdate}
            onClick={() => {
              if (canUpdate) {
                setNewValues({
                  id: initialPayment !== undefined ? initialPayment.id : 0,
                  partner_id: partnerInfo.id,
                  partner_name: partnerInfo.name,
                  partner_last_name: partnerInfo.last_name,
                  combo: 0,
                  time_paid: 0,
                  time_paid_unit: 0,
                  payment_method_id: 0,
                  payment_method_name: "",
                  price_paid: 0,
                  date: "",
                  payment_expire_date: "",
                })
                setUpdatePaymentModal(true)
              }
            }}
          />
        )}
        {changes && (
          <>
            <TextButton
              content={generalTexts.actions.cancel}
              onClick={() => {
                setChanges(false)
                setHasChanges(false)
                setVariableValues([
                  { name: "days", value: initialPayment.time_paid },
                ])
              }}
            />
            <TextButton
              cta
              content={generalTexts.actions.confirm}
              onClick={excecuteChanges}
            />
          </>
        )}
      </ButtonContainer>

      {updatePaymentModal && (
        <EditPayment
          handleEdit={handleEdit}
          cancelEdit={() => cleanStates()}
          partnerName={partnerInfo.name}
          partnerLastName={partnerInfo.last_name}
          disabledButton={disabledButton}
        />
      )}
    </Details>
  )
}

export default DetailsView
