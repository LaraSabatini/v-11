import React, { useState, useContext, useEffect } from "react"
import { PartnersContext } from "contexts/Partners"
import {
  editPartnerPaymentAction,
  getPartnerPaymentsByIdAction,
} from "helpers/partners"
import PartnerInterface from "interfaces/partners/PartnerInterface"
import PaymentInterface from "interfaces/partners/PaymentInterface"
import partnerTexts from "strings/partners.json"
import generalTexts from "strings/general.json"
import Icon from "components/UI/Assets/Icon"
import TextButton from "components/UI/TextButton"
import UpdatePaymentForm from "../../../Forms/UpdatePayment"
import {
  PartnerData,
  Details,
  RemoveButton,
  ButtonContainer,
  DaysLeft,
} from "./styles"

interface DetailDataInterface {
  partnerInfo: PartnerInterface
  canDelete: boolean
  canUpdate: boolean
}

function DetailsData({
  partnerInfo,
  canDelete,
  canUpdate,
}: DetailDataInterface) {
  const {
    setHasChanges,
    setSafeModal,
    cleanStates,
    setNewValues,
    setUpdatePaymentModal,
    updatePaymentModal,
  } = useContext(PartnersContext)

  const [initialPayment, setInitialPayment] = useState<PaymentInterface>()
  const [changedDays, setChangedDays] = useState<boolean>(false)
  const [changes, setChanges] = useState<boolean>(false)
  const [variableValues, setVariableValues] = useState([
    { name: "days", value: 0 },
  ])

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
        success = edit.status === 200
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

  return (
    <Details>
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
          disabledButton={!canDelete}
          onClick={() => {
            if (canDelete) {
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
        <UpdatePaymentForm
          cancelEdit={() => cleanStates()}
          partnerInfo={partnerInfo}
          initialPayment={initialPayment}
        />
      )}
    </Details>
  )
}

export default DetailsData
