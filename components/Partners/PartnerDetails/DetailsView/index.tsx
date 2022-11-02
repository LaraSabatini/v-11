import React, { useState, useContext, useEffect } from "react"
// SERVICES
import { getPartnerPaymentsById } from "@services/Partners/PartnerPayments.service"
import {
  createPartnerPayment,
  editPartnerPayment,
} from "services/Partners/PartnerPayments.service"
import {
  searchDigitalPaymentByUserAndDate,
  updateDigitalPayment,
  createDigitalPayment,
} from "services/Finances/DigitalPayments.service"
import { createBoulderPurchase } from "services/Finances/Boulderpurchases.service"
import { deletePartner } from "services/Partners/Partner.service"
// DATA STORAGE & TYPES
import { GeneralContext } from "contexts/GeneralContext"
import { months, day, month, year } from "const/time"
import PartnerInterface from "interfaces/partners/PartnerInterface"
import PaymentInterface from "interfaces/partners/PaymentInterface"
import { PartnersContext } from "contexts/Partners"
import partnerTexts from "strings/partners.json"
import generalTexts from "strings/general.json"
import financesTexts from "strings/finances.json"
import getExpirationDate from "utils/getExpirationDate"
// COMPONENTS & STYLING
import TextButton from "components/UI/TextButton"
import ModalAlert from "components/UI/ModalAlert"
import Icon from "components/UI/Assets/Icon"
import EditPayment from "./EditPayment"
import calcPriceMonthOrDay from "../../utils/calcPriceForMonthOrDayPurchase"
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

  const deletePartnerFunction = async () => {
    const deletion = await deletePartner(partnerInfo.id)

    if (deletion.message === "Product deleted successfully") {
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

  const createComboPurchase = async () => {
    let success = false
    const boulderPurchaseBody = {
      id: 0,
      date: `${day}-${month}-${year}`,
      item_id: 1,
      item_name: `${financesTexts.combo}`,
      amount_of_items: 1,
      profit:
        paymentMethodSelected === 1 ? combos[0].price_cash : combos[0].price_mp,
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

  const createDayOrMonthPurchase = async () => {
    let success: boolean = false

    const finalProfit = calcPriceMonthOrDay(
      paidTimeUnit.id,
      paidTime,
      paymentMethodSelected,
      prices,
    )

    const boulderPurchaseBody = {
      id: 0,
      date: `${day}-${month}-${year}`,
      item_id: paidTimeUnit.id === 1 ? 2 : 3,
      item_name:
        paidTimeUnit.id === 1
          ? `${financesTexts.day}`
          : `${financesTexts.month}`,
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

  const addPayment = async () => {
    let success: boolean = false

    const comboCondition =
      newValues.combo !== null &&
      newValues.combo !== undefined &&
      newValues.combo !== 0

    if (comboCondition) {
      const executePurchase = await createComboPurchase()
      success = executePurchase
    }
    if (paidTime !== 0) {
      const executePurchase = await createDayOrMonthPurchase()
      success = executePurchase
    }

    return success
  }

  const addDaysFunc = async (expirationDate: string) => {
    let success: boolean = false
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

    const body = {
      ...newValues,
      time_paid:
        paidTimeUnit.id === 1
          ? finalTime + initialPayment.time_paid
          : initialPayment.time_paid + newValues.time_paid,
      price_paid: finalPrice,
      payment_expire_date:
        (paidTimeUnit !== undefined && paidTimeUnit.id === 2) ||
        (comboSelected !== null && comboSelected !== undefined)
          ? expirationDate
          : "",
      date: `${day}-${month}-${year}`,
      created_by: parseInt(localStorage.getItem("id"), 10),
    }

    const createPayment = await createPartnerPayment(body)
    const addPaymentFunc = await addPayment()

    success =
      createPayment.message === "partnerPayment created successfully" &&
      addPaymentFunc
    return success
  }

  const executeDigitalPayment = async () => {
    let success = false
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
        created_by: parseInt(localStorage.getItem("id"), 10),
      }

      const editDigitalPayment = await updateDigitalPayment(digitalPaymentBody)

      success = editDigitalPayment.message === "payment updated successfully"
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
        created_by: parseInt(localStorage.getItem("id"), 10),
      }

      const createDigital = await createDigitalPayment(digitalPaymentBody)

      success = createDigital.message === "payment created successfully"
    }

    return success
  }

  const handleEdit = async e => {
    e.preventDefault()
    let success = false

    let canPurchase = false

    if (comboSelected === null) {
      await paidTimeRef.current?.focus()
      await paidTimeUnitRef.current?.focus()

      if (
        paidTimeRef.current.attributes.getNamedItem("data-error").value ===
          "false" &&
        paidTimeUnitRef.current.attributes.getNamedItem("data-error").value ===
          "false"
      ) {
        canPurchase = true
      } else {
        canPurchase = false
      }
    }
    await paymentRef.current?.focus()

    if (paymentMethodSelected === 2) {
      await paymentUserRef.current?.focus()
      if (
        paymentUserRef.current.attributes.getNamedItem("data-error").value ===
        "false"
      ) {
        canPurchase = true
      } else {
        canPurchase = false
      }
    }

    const canAddDays =
      initialPayment.time_paid_unit === 0 ||
      initialPayment.time_paid_unit === newValues.time_paid_unit

    if (canAddDays === false) {
      setModalErrorAddDays({
        status: "alert",
        icon: "IconExclamation",
        title: `${partnerTexts.cannotAddDays.title}`,
        content: `${partnerTexts.cannotAddDays.content}`,
      })
      cleanStates()
    }

    if (canPurchase && canAddDays) {
      setDisabledButton(true)
      const expirationDate = getExpirationDate(paidTime, comboSelected)

      const addDays = await addDaysFunc(expirationDate)
      success = addDays

      if (initialPayment === undefined) {
        const body = {
          ...newValues,
          time_paid: newValues.time_paid,
          price_paid: finalPrice,
          payment_expire_date:
            (paidTimeUnit !== undefined && paidTimeUnit.id === 2) ||
            (comboSelected !== null && comboSelected !== undefined)
              ? expirationDate
              : "",
          date: `${day}-${month}-${year}`,
          created_by: parseInt(localStorage.getItem("id"), 10),
        }

        const createPayment = await createPartnerPayment(body)

        const addPaymentFunc = await addPayment()

        success =
          createPayment.message === "payment updated successfully" &&
          addPaymentFunc
      }

      if (paymentMethodSelected === 2) {
        const executePurchase = await executeDigitalPayment()
        success = executePurchase
      }
    }

    if (success && canPurchase) {
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
        if (variableValues[0].value > 0) {
          const body = {
            ...initialPayment,
            time_paid: variableValues[0].value,
            created_by: parseInt(localStorage.getItem("id"), 10),
          }

          const edit = await editPartnerPayment(body)
          if (edit.message === "payment updated successfully") {
            success = true
          }
        } else {
          const body = {
            ...initialPayment,
            time_paid: 0,
            time_paid_unit: 0,
          }
          const edit = await editPartnerPayment(body)
          if (edit.message === "payment updated successfully") {
            success = true
          }
        }
      }
    }

    if (success) {
      setChangedDays(false)
      setChanges(false)
    }
  }

  const getPayment = async () => {
    const data = await getPartnerPaymentsById(partnerInfo.id)

    if (data.data.length > 0) {
      setInitialPayment(data.data[data.data.length - 1]) // ACA SETEAR AL ULTIMO
      setVariableValues([
        {
          name: "days",
          value:
            data.data[data.data.length - 1].time_paid_unit === 1
              ? data.data[data.data.length - 1].time_paid
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
        <ModalAlert
          success={false}
          message={{
            status: `alert`,
            icon: `IconAlert`,
            title: `${generalTexts.modalTitles.discard}`,
            content: `${generalTexts.modalContent.discard}`,
          }}
          closeModal={cancelDiscard}
          closeRefresh={cancelDiscard}
          mainButtonContent={generalTexts.actions.confirm}
          secondButtonContent={generalTexts.actions.cancel}
          mainAction={() => {
            setModalHasChanges(false)
            setHasChanges(false)
            setChanges(false)
            setVariableValues([
              { name: "days", value: initialPayment.time_paid },
            ])
          }}
          isNotice
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
