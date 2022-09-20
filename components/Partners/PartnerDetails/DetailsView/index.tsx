import React, { useState, useContext, useEffect } from "react"
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
import { getPrices } from "services/Partners/Prices.service"
import { deletePartner } from "services/Partners/Partner.service"
import PartnerInterface from "interfaces/partners/PartnerInterface"
import PaymentInterface from "interfaces/partners/PaymentInterface"
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
    cleanStates,
    newValues,
    paidTime,
    comboSelected,
    finalPrice,
    paidTimeUnit,
    scheduleSelected,
    paidTimeUnitRef,
    paymentRef,
    setModalErrorAddDays,
    modalErrorAddDays,
    paymentMethodSelected,
    paymentUserSelected,
    months,
  } = useContext(PartnersContext)

  const [initialPayment, setInitialPayment] = useState<PaymentInterface>()
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

  const today = new Date()
  const getDay = today.getDate()
  const getMonth = today.getMonth()
  const year = today.getFullYear()

  const day = getDay > 9 ? getDay : `0${getDay}`
  const month = getMonth + 1 > 9 ? getMonth + 1 : `0${getMonth + 1}`

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
      initialPayment !== undefined &&
      initialPayment.time_paid_unit === newValues.time_paid_unit

    if (canAddDays === false && initialPayment !== undefined) {
      setModalErrorAddDays({
        status: "alert",
        icon: "IconExclamation",
        title: "No se puede realizar esta accion",
        content:
          "Esta accion no se puede realizar porque el socio cuenta con un abono activo",
      })
      cleanStates()
    }
    if (canAddDays) {
      const body = {
        ...newValues,
        time_paid: initialPayment.time_paid + newValues.time_paid,
        price_paid: finalPrice,
        payment_expire_date:
          (paidTimeUnit !== undefined && paidTimeUnit.id === 2) ||
          (comboSelected !== null && comboSelected !== undefined)
            ? `${finalExpireDay}/${finalExpireMonth}/${expireYear}`
            : "",
        days_and_hours:
          scheduleSelected.length > 0 ? `${scheduleSelected}` : "",
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

        if (createPayment.message === "payment updated successfully") {
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
        days_and_hours:
          scheduleSelected.length > 0 ? `${scheduleSelected}` : "",
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

        if (createPayment.message === "payment updated successfully") {
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
        // editar
      } else {
        // crear
        const digitalPaymentBody = {
          id: 0,
          user_id: paymentUserSelected.id,
          user_name: paymentUserSelected.display_name,
          date: `${day}-${month}-${year}`,
          month: months.filter(m => m.id === getMonth + 1)[0].display_name,
          month_id: getMonth + 1,
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
        title: "Excelente!",
        content: "El pago ha sido actualizado correctamente",
      })
      cleanStates()
    } else {
      setModalError({
        status: "alert",
        icon: "IconExclamation",
        title: "UPS!",
        content:
          "El pago no se pudo procesar, por favor intentalo nuevamente o comunicate con el admin.",
      })
      cleanStates()
    }
  }

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
      setInitialPayment(data.data[data.data.length - 1]) // ACA SETEAR AL ULTIMO
      setVariableValues([
        { name: "clases", value: data.data[data.data.length - 1].clases_paid },
        {
          name: "days",
          value:
            data.data[data.data.length - 1].time_paid_unit === 1
              ? data.data[data.data.length - 1].time_paid
              : 0,
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
                id: initialPayment !== undefined ? initialPayment.id : 0,
                partner_id: partnerInfo.id,
                partner_name: partnerInfo.name,
                partner_last_name: partnerInfo.last_name,
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
          cancelEdit={() => cleanStates()}
          partnerName={partnerInfo.name}
          partnerLastName={partnerInfo.last_name}
        />
      )}
    </Details>
  )
}

export default DetailsView
