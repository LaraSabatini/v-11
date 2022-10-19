import React, { useState, useContext, useEffect } from "react"
// SERVICES
import { getPartnerPaymentsById } from "@services/Partners/PartnerPayments.service"
import {
  createPartnerPayment,
  editPartnerPayment,
} from "services/Partners/PartnerPayments.service"
import {
  searchByUserAndDate,
  updateDigitalPayment,
  createDigitalPayment,
} from "services/Finances/DigitalPayments.service"
import { createBoulderPurchase } from "services/Finances/Bouderpurchases.service"
import { getPrices } from "services/Partners/Prices.service"
import { deletePartner } from "services/Partners/Partner.service"
// DATA STORAGE & TYPES
import { months, today, day, month, year } from "const/time"
import PartnerInterface from "interfaces/partners/PartnerInterface"
import PaymentInterface from "interfaces/partners/PaymentInterface"
import { PartnersContext } from "contexts/Partners"
import partnerTexts from "strings/partners.json"
import generalTexts from "strings/general.json"
import financesTexts from "strings/finances.json"

// COMPONENTS & STYLING
import TextButton from "components/UI/TextButton"
import ModalAlert from "components/UI/ModalAlert"
import Icon from "components/UI/Assets/Icon"
import EditPayment from "./EditPayment"
import {
  PartnerData,
  Details,
  RemoveButton,
  ButtonContainer,
  DaysLeft,
} from "./styles"

interface DetailViewInterface {
  partnerInfo: PartnerInterface
}

const DetailsView = ({ partnerInfo }: DetailViewInterface) => {
  const {
    setModalSuccess,
    setModalError,
    setNewValues,
    setPrices,
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
    prices,
    usesDay,
    combos,
  } = useContext(PartnersContext)

  const [initialPayment, setInitialPayment] = useState<PaymentInterface>()
  const [safeModal, setSafeModal] = useState<boolean>(false)
  const [updatePaymentModal, setUpdatePaymentModal] = useState<boolean>(false)
  const [changes, setChanges] = useState<boolean>(false)
  const [variableValues, setVariableValues] = useState([
    { name: "days", value: 0 },
  ])

  const [changedDays, setChangedDays] = useState<boolean>(false)

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

  const addPayment = async () => {
    let success: boolean = false
    if (
      newValues.combo !== null &&
      newValues.combo !== undefined &&
      newValues.combo !== 0
    ) {
      const boulderPurchaseBody = {
        id: 0,
        date: `${day}-${month}-${year}`,
        item_id: 1,
        item_name: `${financesTexts.combo}`,
        amount_of_items: 1,
        profit:
          paymentMethodSelected === 1
            ? combos[0].price_cash
            : combos[0].price_mp,
        payment_method_id: paymentMethodSelected,
      }

      const createBoulderPurchaseCall = await createBoulderPurchase(
        boulderPurchaseBody,
      )
      success =
        createBoulderPurchaseCall.message ===
        "bouderPayment created successfully"
    }
    if (paidTime !== 0) {
      let finalProfit = 0
      if (paidTimeUnit.id === 1) {
        finalProfit =
          paymentMethodSelected === 1
            ? paidTime * prices[0].price_cash
            : paidTime * prices[0].price_mp
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
          paidTimeUnit.id === 1
            ? `${financesTexts.day}`
            : `${financesTexts.month}`,
        amount_of_items: paidTime,
        profit: finalProfit,
        payment_method_id: paymentMethodSelected,
      }

      const createBoulderPurchaseCall = await createBoulderPurchase(
        boulderPurchaseBody,
      )
      success =
        createBoulderPurchaseCall.message ===
        "bouderPayment created successfully"
    }

    return success
  }

  const handleEdit = async e => {
    e.preventDefault()
    let success = false

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
    if (canAddDays) {
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
            ? `${finalExpireDay}/${finalExpireMonth}/${expireYear}`
            : "",
        date: `${day}-${month}-${year}`,
      }

      await paidTimeUnitRef.current?.focus()
      await paymentRef.current?.focus()

      if (
        paidTimeUnitRef.current.attributes.getNamedItem("data-error").value ===
          "false" &&
        paymentRef.current.attributes.getNamedItem("data-error").value ===
          "false"
      ) {
        const createPayment = await createPartnerPayment(body)
        const addPaymentFunc = await addPayment()

        if (
          createPayment.message === "partnerPayment created successfully" &&
          addPaymentFunc
        ) {
          success = true
        } else {
          success = false
        }
      }
    }

    if (initialPayment === undefined) {
      const body = {
        ...newValues,
        time_paid: newValues.time_paid,
        price_paid: finalPrice,
        payment_expire_date:
          (paidTimeUnit !== undefined && paidTimeUnit.id === 2) ||
          (comboSelected !== null && comboSelected !== undefined)
            ? `${finalExpireDay}/${finalExpireMonth}/${expireYear}`
            : "",
        date: `${day}-${month}-${year}`,
      }

      await paidTimeUnitRef.current?.focus()
      await paymentRef.current?.focus()
      if (
        paidTimeUnitRef.current.attributes.getNamedItem("data-error").value ===
          "false" &&
        paymentRef.current.attributes.getNamedItem("data-error").value ===
          "false"
      ) {
        const createPayment = await createPartnerPayment(body)
        const addPaymentFunc = await addPayment()

        if (
          createPayment.message === "payment updated successfully" &&
          addPaymentFunc
        ) {
          success = true
        } else {
          success = false
        }
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
        title: `${generalTexts.modalTitles.success}`,
        content: `${partnerTexts.updatePaymentSuccess.content}`,
      })
    } else {
      setModalError({
        status: "alert",
        icon: "IconExclamation",
        title: `${generalTexts.modalTitles.error}`,
        content: `${partnerTexts.updatePaymentError.content}`,
      })
    }
  }

  const excecuteChanges = async () => {
    let success: boolean = false
    if (changedDays) {
      if (initialPayment.time_paid > 0) {
        if (variableValues[0].value > 0) {
          const body = {
            ...initialPayment,
            time_paid: variableValues[0].value,
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
      })
      setVariableValues([
        {
          name: "days",
          value: 0,
        },
      ])
    }

    const pricesData = await getPrices()
    setPrices(pricesData.data)
  }

  useEffect(() => {
    if (partnerInfo !== undefined) {
      getPayment()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [partnerInfo])

  return (
    <Details>
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
        <RemoveButton type="button" onClick={() => setSafeModal(true)}>
          {generalTexts.actions.removeRecord}
        </RemoveButton>
        {changes === false && (
          <TextButton
            content={partnerTexts.updatePayment}
            cta
            onClick={() => {
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
            }}
          />
        )}
        {changes && (
          <>
            <TextButton
              content={generalTexts.actions.cancel}
              onClick={() => {
                setChanges(false)
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
        />
      )}
    </Details>
  )
}

export default DetailsView
