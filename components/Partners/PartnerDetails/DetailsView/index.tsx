import React, { useState, useContext, useEffect } from "react"
import { getPartnerPaymentsById } from "services/Partners/GetPartnerPayments.service"
import editPartnerPayment from "services/Partners/EditPartnerPayment.service"
import getPrices from "services/Partners/GetPrices.service"
import deletePartner from "services/Partners/DeletePartner.service"
import PartnerInterface from "interfaces/partners/PartnerInterface"
import { PartnersContext } from "contexts/Partners"
import texts from "strings/partners.json"
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
  } = useContext(PartnersContext)

  const [initialPayment, setInitialPayment] = useState<{
    id: number
    partner_id: number
    partner_name: string
    partner_last_name: string
    combo: number
    time_paid: number
    time_paid_unit: number
    clases_paid: number
    payment_method_id: number
    payment_method_name: string
    price_paid: number
    date: string
    payment_expire_date: string
    days_and_hours: string
  }>()
  const [safeModal, setSafeModal] = useState<boolean>(false)
  const [updatePaymentModal, setUpdatePaymentModal] = useState<boolean>(false)
  const [changes, setChanges] = useState<boolean>(false)
  const [variableValues, setVariableValues] = useState([
    { name: "clases", value: 0 },
    { name: "days", value: 0 },
  ])

  const [changedDays, setChangedDays] = useState<boolean>(false)
  const [changedClases, setChangedClases] = useState<boolean>(false)

  const deletePartnerFunction = async () => {
    const deletion = await deletePartner(partnerInfo.id)

    if (deletion.message === "Product deleted successfully") {
      setModalSuccess({
        status: "success",
        icon: "IconCheckModal",
        title: "Excelente!",
        content: "El socio se ha eliminado correctamente",
      })
    } else {
      setModalError({
        status: "alert",
        icon: "IconExclamation",
        title: "UPS!",
        content:
          "Ha ocurrido un error al eliminar el socio, por favor intentalo nuevamente o comunicate con el admin.",
      })
    }
  }

  // const handleEdit = async e => {
  //   e.preventDefault()

  //   const newDate = new Date(today.setMonth(today.getMonth() + paidTime))
  //   const expireDate = newDate.getDate()
  //   const expireMonth = newDate.getMonth()
  //   const expireYear = newDate.getFullYear()
  //   const finalExpireDay = expireDate > 9 ? expireDate : `0${expireDate}`
  //   let finalExpireMonth
  //   if (comboSelected !== null && comboSelected !== undefined) {
  //     finalExpireMonth =
  //       expireMonth + 2 > 9 ? expireMonth + 2 : `0${expireMonth + 2}`
  //   } else {
  //     finalExpireMonth =
  //       expireMonth + 1 > 9 ? expireMonth + 1 : `0${expireMonth + 1}`
  //   }

  //   const body = {
  //     ...newValues,
  //     price_paid: finalPrice,
  //     payment_expire_date:
  //       (paidTimeUnit !== undefined && paidTimeUnit.id === 2) ||
  //       (comboSelected !== null && comboSelected !== undefined)
  //         ? `${finalExpireDay}/${finalExpireMonth}/${expireYear}`
  //         : "",
  //     days_and_hours: scheduleSelected.length > 0 ? `${scheduleSelected}` : "",
  //     date: `${day}/${month}/${year}`,
  //   }

  //   await paidTimeUnitRef.current?.focus()
  //   await paymentRef.current?.focus()
  //   if (
  //     paidTimeUnitRef.current.attributes.getNamedItem("data-error").value ===
  //       "false" &&
  //     paymentRef.current.attributes.getNamedItem("data-error").value === "false"
  //   ) {
  //     const executeEdition = await editPartnerPayment(body)

  //     const boulderBody = {
  //       id: 0,
  //       partner_id: newValues.partner_id,
  //       combo: newValues.combo,
  //       time_paid: newValues.time_paid,
  //       time_paid_unit: newValues.time_paid_unit,
  //       clases_paid: newValues.clases_paid,
  //       payment_method_id: newValues.payment_method_id,
  //       price_paid: finalPrice,
  //       date: `${day}/${month}/${year}`,
  //     }
  //     const boulderPayment = await createBoulderPayment(boulderBody)

  //     if (
  //       executeEdition.message === "payment updated successfully" &&
  //       boulderPayment.message === "payment created successfully"
  //     ) {
  //       setModalSuccess({
  //         status: "success",
  //         icon: "IconCheckModal",
  //         title: "Excelente!",
  //         content: "El pago ha sido actualizado correctamente",
  //       })
  //       setTriggerListUpdate(triggerListUpdate + 1)
  //       setActiveEdition(null)
  //       setNewValues(null)
  //       cleanStates()
  //     } else {
  //       setModalError({
  //         status: "alert",
  //         icon: "IconExclamation",
  //         title: "UPS!",
  //         content:
  //           "El pago no se pudo procesar, por favor intentalo nuevamente o comunicate con el admin.",
  //       })
  //       setActiveEdition(null)
  //       setNewValues(null)
  //       cleanStates()
  //     }
  //   }
  // }

  // const cancelEdit = () => {
  //   setActiveEdition(null)
  //   setNewValues(null)
  //   cleanStates()
  // }

  const handleEdit = () => {}
  const cancelEdit = () => {}

  // const onClickRemoveDays = () => {
  //   setChangedDays(true)
  // }
  // const onClickRemoveClases = () => {
  //   setChangedClases(true)
  // }
  const cancelChange = () => {}
  const excecuteChanges = async () => {
    let success: boolean = false
    if (changedDays) {
      if (initialPayment.time_paid > 0) {
        if (variableValues[1].value > 0) {
          const body = {
            ...initialPayment,
            time_paid: variableValues[1].value,
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
    if (changedClases) {
      if (variableValues[0].value > 0) {
        const body = {
          ...initialPayment,
          clases_paid: variableValues[0].value,
        }
        const edit = await editPartnerPayment(body)
        if (edit.message === "payment updated successfully") {
          success = true
        }
      } else {
        const body = {
          ...initialPayment,
          clases_paid: 0,
        }
        const edit = await editPartnerPayment(body)
        if (edit.message === "payment updated successfully") {
          success = true
        }
      }
    }

    if (success) {
      setChangedDays(false)
      setChangedClases(false)
      setChanges(false)
    }
  }

  const getPayment = async () => {
    const data = await getPartnerPaymentsById(partnerInfo.id)

    if (data.data.length > 0) {
      setInitialPayment(data.data[0])
      setVariableValues([
        { name: "clases", value: data.data[0].clases_paid },
        {
          name: "days",
          value: data.data[0].time_paid_unit === 1 ? data.data[0].time_paid : 0,
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
      {safeModal && (
        <ModalAlert
          success={false}
          message={{
            status: "alert",
            icon: "IconExclamation",
            title: "Estas seguro de que deseas eliminar al cliente?",
            content:
              "Si lo eliminas se borraran todos los registros de la base de datos",
          }}
          closeModal={() => setSafeModal(false)}
          closeRefresh={() => setSafeModal(false)}
          mainButtonContent="Borrar"
          secondButtonContent="Cancelar"
          mainAction={deletePartnerFunction}
          isNotice
        />
      )}
      <div>
        <PartnerData>
          <p>{texts.full_name}</p>
          {partnerInfo?.name} {partnerInfo?.last_name}
        </PartnerData>

        {partnerInfo?.email !== "" ? (
          <PartnerData>
            <p>{texts.email}</p>
            {partnerInfo?.email}
          </PartnerData>
        ) : (
          <></>
        )}

        {partnerInfo?.phone !== "" ? (
          <PartnerData>
            <p>N° de telefono:</p>
            {partnerInfo?.phone}
          </PartnerData>
        ) : (
          <></>
        )}

        {partnerInfo?.identification_number !== "" ? (
          <PartnerData>
            <p>{texts.identification}</p>
            {partnerInfo?.identification_number}
          </PartnerData>
        ) : (
          <></>
        )}

        <PartnerData>
          <p>{texts.member_since}</p>
          {partnerInfo?.membership_start_date}
        </PartnerData>

        {initialPayment !== undefined &&
          initialPayment.payment_expire_date !== "" && (
            <PartnerData>
              <p>Vencimiento de pago</p>
              {initialPayment.payment_expire_date}
            </PartnerData>
          )}

        {partnerInfo?.is_student === "SI" ? (
          <PartnerData>
            <p>{texts.trainer}</p>
            Guillermo
          </PartnerData>
        ) : (
          <></>
        )}

        <PartnerData>
          <p>Dias restantes</p>
          <DaysLeft>
            <button
              className="remove"
              type="button"
              onClick={() => {
                setChangedDays(true)
                setChanges(true)
                setVariableValues([
                  { name: "clases", value: variableValues[0].value },
                  { name: "days", value: variableValues[1].value - 1 },
                ])
              }}
            >
              <Icon icon="IconLess" />
            </button>
            <p className="number">{variableValues[1].value}</p>
          </DaysLeft>
        </PartnerData>

        <PartnerData>
          <p>Clases restantes</p>
          <DaysLeft>
            <button
              className="remove"
              type="button"
              onClick={() => {
                setChangedClases(true)
                setChanges(true)
                setVariableValues([
                  { name: "clases", value: variableValues[0].value - 1 },
                  {
                    name: "days",
                    value: variableValues[1].value,
                  },
                ])
              }}
            >
              <Icon icon="IconLess" />
            </button>
            <p>{variableValues[0].value}</p>
          </DaysLeft>
        </PartnerData>
      </div>

      <ButtonContainer>
        <RemoveButton type="button" onClick={() => setSafeModal(true)}>
          Eliminar
        </RemoveButton>
        {changes === false && (
          <TextButton
            content="Actualizar pago"
            cta
            onClick={() => {
              setNewValues({
                id: initialPayment.id,
                partner_id: initialPayment.partner_id,
                partner_name: initialPayment.partner_name,
                partner_last_name: initialPayment.partner_last_name,
                combo: 0,
                time_paid: 0,
                time_paid_unit: 0,
                clases_paid: 0,
                payment_method_id: 0,
                payment_method_name: "",
                price_paid: 0,
                date: "",
                payment_expire_date: "",
                days_and_hours: "",
              })
              setUpdatePaymentModal(true)
            }}
          />
        )}
        {changes && (
          <>
            <TextButton
              content="Cancelar"
              onClick={() => {
                setChanges(false)
                cancelChange()
                setVariableValues([
                  { name: "clases", value: initialPayment.clases_paid },
                  { name: "days", value: initialPayment.time_paid },
                ])
              }}
            />
            <TextButton cta content="confirmar" onClick={excecuteChanges} />
          </>
        )}
      </ButtonContainer>

      {updatePaymentModal && (
        <EditPayment
          handleEdit={handleEdit}
          cancelEdit={cancelEdit}
          partnerName={partnerInfo.name}
          partnerLastName={partnerInfo.last_name}
        />
      )}
    </Details>
  )
}

export default DetailsView
