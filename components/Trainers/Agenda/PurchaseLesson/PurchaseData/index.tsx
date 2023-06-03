import React, { useState, useContext, useEffect } from "react"
import { getLessonScheduleByDay } from "services/Trainers/agenda.service"
import { getPrices } from "services/Partners/Prices.service"
import { TrainersContext } from "contexts/Trainers"
import { getPartnerPaymentsById } from "services/Partners/PartnerPayments.service"
import { LessonTypesInterface } from "interfaces/lessons/Calendar"
import TextField from "@components/UI/TextField"
import { isBeforeToday } from "utils"
import Icon from "components/UI/Assets/Icon"
import Autocomplete from "@components/UI/Autocomplete"
import { hoursForComboBox } from "const/time"
import InputCalendar from "@components/UI/InputCalendar"
import { paymentMethods, paymentUsers } from "const/finances"
import { PaymentContainer } from "../styles"

function PurchaseData({
  type,
  clientSelected,
  isNew,
}: {
  type: LessonTypesInterface
  isNew: boolean
  clientSelected: {
    id: number
    name: string
  }
}) {
  const {
    datesSelected,
    setDatesSelected,
    setReadyToPay,
    finalPrice,
    setFinalPrice,
    setMpUserSelected,
    paymentMethodSelected,
    setPaymentMethodSelected,
  } = useContext(TrainersContext)

  const [amountOfLessons, setAmountOfLessons] = useState<number>(0)
  const [hourSelected, setHourSelected] = useState<{
    id: number
    display_name: string
  }>(null)
  const [dateSelected, setDateSelected] = useState<string>("")

  const hoursAvailable: {
    id: number
    display_name: string
  }[] = hoursForComboBox.filter(hour =>
    JSON.parse(type.hours as string).includes(hour.id),
  )

  const [noQuotaAvailable, setNoQuotaAvailable] = useState<boolean>(false)

  const setList = async () => {
    const req = await getLessonScheduleByDay(dateSelected.replaceAll("/", "-"))

    const findSameType = req.data?.filter(
      lesson =>
        lesson.type === type.value &&
        parseInt(lesson.hourRange, 10) === hourSelected.id,
    )

    if (req.data.length === 0 || findSameType.length === 0) {
      const list = [...datesSelected]
      list.push({
        date: dateSelected,
        hour: hourSelected,
      })

      setDatesSelected(list)
    } else {
      const amountOfStudents = JSON.parse(findSameType[0].purchaseIds)

      if (amountOfStudents.length < type.quota) {
        setNoQuotaAvailable(false)
        const list = [...datesSelected]
        list.push({
          date: dateSelected,
          hour: hourSelected,
        })

        setDatesSelected(list)
      } else {
        setNoQuotaAvailable(true)
      }
    }
  }

  const removeLessonFromList = (date: {
    date: string
    hour: {
      id: number
      display_name: string
    }
  }) => {
    const filterDates = datesSelected.filter(dateItem => dateItem !== date)
    setDatesSelected(filterDates)
  }

  useEffect(() => {
    if (amountOfLessons === datesSelected.length && amountOfLessons > 0) {
      setReadyToPay(true)
    } else {
      setReadyToPay(false)
    }
    //  eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amountOfLessons, datesSelected])

  const calcPriceWithoutDiscount = () => {
    if (amountOfLessons !== 4 && amountOfLessons !== 8) {
      setFinalPrice(
        paymentMethodSelected === 2
          ? type.unit_price_mp * amountOfLessons
          : type.unit_price_cash * amountOfLessons,
      )
    } else if (amountOfLessons === 4) {
      setFinalPrice(
        paymentMethodSelected === 2 ? type.four_price_mp : type.four_price_cash,
      )
    } else {
      setFinalPrice(
        paymentMethodSelected === 2
          ? type.eight_price_mp
          : type.eight_price_cash,
      )
    }
  }

  const calculatePriceWithDiscount = async () => {
    const req = await getPrices()

    if (amountOfLessons === 4) {
      const originalPrice =
        paymentMethodSelected === 2 ? type.four_price_mp : type.four_price_cash

      const discount =
        paymentMethodSelected === 2
          ? req.data[6].price_mp
          : req.data[6].price_cash

      setFinalPrice(originalPrice - discount)
    } else if (amountOfLessons === 8) {
      const originalPrice =
        paymentMethodSelected === 2
          ? type.eight_price_mp
          : type.eight_price_cash

      const discount =
        paymentMethodSelected === 2
          ? req.data[1].price_mp
          : req.data[1].price_cash

      setFinalPrice(originalPrice - discount)
    } else {
      const originalPrice =
        paymentMethodSelected === 2
          ? type.unit_price_mp * amountOfLessons
          : type.unit_price_cash * amountOfLessons

      const discount =
        paymentMethodSelected === 2
          ? req.data[0].price_mp * amountOfLessons
          : req.data[0].price_cash * amountOfLessons

      setFinalPrice(originalPrice - discount)
    }
  }

  const calculatePrice = async () => {
    if (type.value !== "kids" && !isNew) {
      const getPayments = await getPartnerPaymentsById(clientSelected.id)
      const filterPayments = getPayments.data.filter(
        payment =>
          !isBeforeToday(payment.payment_expire_date.replaceAll("-", "/")) &&
          payment.time_paid_unit === 2,
      )
      if (filterPayments.length > 0) {
        calculatePriceWithDiscount()
      } else {
        calcPriceWithoutDiscount()
      }
    } else {
      calcPriceWithoutDiscount()
    }
  }

  useEffect(() => {
    if (amountOfLessons === datesSelected.length) {
      calculatePrice()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentMethodSelected, amountOfLessons, datesSelected])

  return (
    <div>
      <div className="display-vertical">
        <div>
          <div className="horizontal">
            <TextField
              label="Cantidad de clases"
              required
              type="text"
              width={120}
              onChange={e => {
                setAmountOfLessons(parseInt(e.target.value, 10))
              }}
            />
            <Autocomplete
              width={100}
              required
              label="Horario"
              options={amountOfLessons > 0 ? hoursAvailable : []}
              onChangeProps={(e: { id: number; display_name: string }) => {
                setHourSelected(e)
                setNoQuotaAvailable(false)
              }}
            />
          </div>
          <div className="horizontal">
            <InputCalendar
              reference={undefined}
              label="Fechas"
              required
              width={190}
              disabled={
                amountOfLessons === 0 ||
                datesSelected.length === amountOfLessons
              }
              onChange={e => {
                setDateSelected(e.selectedChangeDate)
                setNoQuotaAvailable(false)
              }}
            />

            <button
              type="button"
              className="add-date"
              onClick={() => {
                if (
                  amountOfLessons !== 0 &&
                  hourSelected !== null &&
                  dateSelected !== null &&
                  datesSelected.length < amountOfLessons
                ) {
                  setList()
                }
              }}
            >
              <Icon icon="IconAdd" color="white" />
            </button>
          </div>
        </div>
        <div className="lesson-data">
          {datesSelected.length > 0 ? (
            datesSelected.map(date => (
              <p key={date.date}>
                {date.date} - {date.hour.display_name} hs{" "}
                <button
                  type="button"
                  onClick={() => removeLessonFromList(date)}
                >
                  <Icon icon="IconMenuOff" />
                </button>
              </p>
            ))
          ) : (
            <></>
          )}
        </div>
      </div>

      <PaymentContainer>
        {noQuotaAvailable && (
          <p className="error">
            No hay disponibilidad para la fecha y/u horario seleccionados
          </p>
        )}
        {datesSelected.length > 0 && datesSelected.length === amountOfLessons && (
          <>
            <div className="horizontal">
              <Autocomplete
                width={200}
                required
                label="Metodo de pago"
                options={paymentMethods}
                onChangeProps={(e: { id: number; display_name: string }) => {
                  setPaymentMethodSelected(e.id)
                }}
              />
              {paymentMethodSelected === 2 && (
                <Autocomplete
                  width={200}
                  required
                  label="MP User"
                  options={paymentUsers}
                  onChangeProps={(e: { id: number; display_name: string }) => {
                    setMpUserSelected(e)
                  }}
                />
              )}
            </div>
            <p className="price">Total: ${finalPrice}</p>
          </>
        )}
      </PaymentContainer>
    </div>
  )
}

export default PurchaseData
