import React, { useContext, useEffect, useState, useRef } from "react"
// SERVICES
import { getPartnerPaymentsById } from "services/Partners/PartnerPayments.service"
import {
  getLessonsByPartnerAndPaid,
  editLesson,
  deleteLessonPurchase,
} from "services/Trainers/LessonsPurchased.service"
import { createBoulderPurchase } from "services/Finances/Bouderpurchases.service"
import {
  createDigitalPayment,
  searchDigitalPaymentByUserAndDate,
  updateDigitalPayment,
} from "services/Finances/DigitalPayments.service"
// DATA STORAGE & TYPES
import { Lessons } from "@contexts/Lessons"
import { paymentMethods, paymentUsers } from "const/finances"
import { day, month, year, months } from "const/time"
import ClasesPurchasedInterface from "interfaces/trainers/ClasesPurchasedInterface"
import trainerTexts from "strings/trainers.json"
import generalTexts from "strings/general.json"
import ModalInterface from "interfaces/components/ModalInterface"

// COMPONENTS & STYLING
import ModalAlert from "components/UI/ModalAlert"
import Icon from "components/UI/Assets/Icon"
import Tooltip from "components/UI/Tooltip"
import Autocomplete from "components/UI/Autocomplete"
import ModalForm from "components/UI/ModalForm"
import {
  Form,
  HorizontalGroup,
  List,
  Total,
  ListItem,
  DeleteRecord,
} from "./styles"

interface DataInterface {
  data: ClasesPurchasedInterface
  cancelPayment: () => void
}

function MakePayment({ data, cancelPayment }: DataInterface) {
  const {
    setPaymentMethodSelected,
    setPaymentUserSelected,
    paymentUserSelected,
    paymentMethodRef,
    paymentMethodSelected,
    paymentUserRef,
    finalPrice,
    setFinalPrice,
    prices,
    setModalSuccess,
    setModalError,
  } = useContext(Lessons)

  const unusedRef = useRef(null)

  const [disabledButton, setDisabledButton] = useState<boolean>(false)

  const [hasDiscount, setHasDiscount] = useState<boolean>(false)
  const [listOfLessonsToPay, setListOfLessonsToPay] = useState<
    ClasesPurchasedInterface[]
  >([])

  const [lessonsSelectedToPay, setLessonsSelectedToPay] = useState<
    ClasesPurchasedInterface[]
  >([])

  const [modalConfirmDelete, setModalConfirmDelete] = useState<ModalInterface>(
    null,
  )

  const executePayment = async () => {
    let success: boolean = false
    for (let i = 0; i < lessonsSelectedToPay.length; i += 1) {
      const body: ClasesPurchasedInterface = {
        ...lessonsSelectedToPay[i],
        paid: "SI",
        payment_method_id: paymentMethodSelected.id,
        final_price: finalPrice / lessonsSelectedToPay.length,
        paid_day: `${day}-${month}-${year}`,
      }

      // eslint-disable-next-line no-await-in-loop
      const changePaymentState = await editLesson(body)
      success =
        changePaymentState.message === "Lesson purchase updated successfully"
    }

    const boulderPurchaseBody = {
      id: 0,
      date: `${day}-${month}-${year}`,
      item_id: 4,
      item_name: "Clases",
      amount_of_items: lessonsSelectedToPay.length,
      profit: finalPrice,
      payment_method_id: paymentMethodSelected.id,
    }
    const boulderPurchaseCall = await createBoulderPurchase(boulderPurchaseBody)

    success =
      boulderPurchaseCall.message === "bouderPayment created successfully"
    if (paymentMethodSelected.id === 2) {
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
        content: `${trainerTexts.createPurchase.successModal.content}`,
      })
      cancelPayment()
    } else {
      setModalError({
        status: "alert",
        icon: "IconExclamation",
        title: `${generalTexts.modalTitles.error}`,
        content: `${trainerTexts.createPurchase.errorModal.content}`,
      })
      cancelPayment()
    }
  }

  const handlePayment = async e => {
    e.preventDefault()
    await paymentMethodRef.current?.focus()
    await unusedRef.current?.focus()
    if (paymentMethodSelected?.id === 2) {
      await paymentUserRef.current?.focus()
      await unusedRef.current?.focus()
    }

    if (
      paymentMethodRef.current.attributes.getNamedItem("data-error").value ===
      "false"
    ) {
      if (paymentMethodSelected.id === 2) {
        if (
          paymentUserRef.current.attributes.getNamedItem("data-error").value ===
          "false"
        ) {
          setDisabledButton(true)
          await executePayment()
        }
      } else {
        setDisabledButton(true)
        await executePayment()
      }
    }
  }

  const checkTypeOfPayment = async () => {
    const checkListOfToPay = await getLessonsByPartnerAndPaid(
      data.partner_id,
      "NO",
    )
    setListOfLessonsToPay(checkListOfToPay.data)
    setLessonsSelectedToPay([data])

    const checkPayment = await getPartnerPaymentsById(data.partner_id)
    if (checkPayment.data.length) {
      const expirationDate =
        checkPayment.data[checkPayment.data.length - 1].payment_expire_date

      const expirationDay = expirationDate.slice(0, 2)
      const expirationMonth = expirationDate.slice(3, 5)
      const expirationYear = expirationDate.slice(6, 10)

      const expirationDateCleaned = new Date(
        `${expirationYear}-${expirationMonth}-${expirationDay}`,
      )
      const todayDate = new Date(`${year}-${month}-${day}`)

      const hasDiscountConditional: boolean = expirationDateCleaned > todayDate

      setHasDiscount(hasDiscountConditional)
    }
  }

  useEffect(() => {
    checkTypeOfPayment()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  const calculateFinalPrice = () => {
    let price: number = 0

    const lessonPriceForFreePass: {
      amount_of_lessons: number
      cash: number
      mp: number
    }[] = [
      {
        amount_of_lessons: 1,
        cash: prices[3].price_cash - prices[0].price_cash,
        mp: prices[3].price_mp - prices[0].price_mp,
      },
      {
        amount_of_lessons: 4,
        cash: prices[4].price_cash - prices[0].price_cash * 4,
        mp: prices[4].price_mp - prices[0].price_mp * 4,
      },
      {
        amount_of_lessons: 8,
        cash: prices[5].price_cash - prices[0].price_cash * 8,
        mp: prices[5].price_mp - prices[0].price_mp * 8,
      },
    ]

    if (hasDiscount) {
      if (lessonsSelectedToPay.length === 4) {
        price =
          paymentMethodSelected.id === 1
            ? lessonPriceForFreePass[1].cash
            : lessonPriceForFreePass[1].mp
      } else if (lessonsSelectedToPay.length === 8) {
        price =
          paymentMethodSelected.id === 1
            ? lessonPriceForFreePass[2].cash
            : lessonPriceForFreePass[2].mp
      } else {
        price =
          paymentMethodSelected.id === 1
            ? lessonPriceForFreePass[0].cash * lessonsSelectedToPay.length
            : lessonPriceForFreePass[0].mp * lessonsSelectedToPay.length
      }
    } else {
      // eslint-disable-next-line no-lonely-if
      if (lessonsSelectedToPay.length === 4) {
        price =
          paymentMethodSelected.id === 1
            ? prices[4].price_cash
            : prices[4].price_mp
      } else if (lessonsSelectedToPay.length === 8) {
        price =
          paymentMethodSelected.id === 1
            ? prices[5].price_cash
            : prices[5].price_mp
      } else {
        price =
          paymentMethodSelected.id === 1
            ? prices[3].price_cash * lessonsSelectedToPay.length
            : prices[3].price_mp * lessonsSelectedToPay.length
      }
    }

    setFinalPrice(price)
  }

  useEffect(() => {
    if (paymentMethodSelected !== null) {
      calculateFinalPrice()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentMethodSelected, lessonsSelectedToPay])

  const selectLessonToPay = (e, lesson: ClasesPurchasedInterface) => {
    e.preventDefault()
    const checkIfExists = lessonsSelectedToPay.filter(
      purchase => purchase === lesson,
    )

    if (checkIfExists.length === 0) {
      setLessonsSelectedToPay([...lessonsSelectedToPay, lesson])
    } else {
      const newArrOfLessons = lessonsSelectedToPay.filter(
        purchase => purchase !== lesson,
      )
      setLessonsSelectedToPay(newArrOfLessons)
    }
  }

  const removePurchases = async () => {
    let success: boolean = false
    for (let i = 0; i < lessonsSelectedToPay.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const deleteCall = await deleteLessonPurchase(lessonsSelectedToPay[i].id)
      success = deleteCall.message === "purchase deleted successfully"
    }

    if (success) {
      setModalSuccess({
        status: "success",
        icon: "IconCheckModal",
        title: "Excelente!",
        content: "Se han eliminado las clases reservadas exitosamente.",
      })
      cancelPayment()
    } else {
      setModalError({
        status: "alert",
        icon: "IconExclamation",
        title: "UPS!",
        content: "Ha ocurrido un error al borrar las reservas.",
      })
    }
  }

  return (
    <ModalForm
      title={`${trainerTexts.executePayment.title} - ${data.partner_name} ${data.partner_last_name}`}
      cancelButtonContent={generalTexts.actions.cancel}
      submitButtonContent={generalTexts.actions.pay}
      submit={handlePayment}
      cancelFunction={cancelPayment}
      disabledButton={disabledButton}
    >
      {modalConfirmDelete !== null && (
        <ModalAlert
          success={false}
          message={modalConfirmDelete}
          closeModal={() => setModalConfirmDelete(null)}
          closeRefresh={() => setModalConfirmDelete(null)}
          mainButtonContent="Eliminar"
          secondButtonContent="Cancelar"
          mainAction={removePurchases}
          isNotice
        />
      )}
      <Form>
        <List>
          <p>Clases pendientes por pagar:</p>
          <div className="list">
            {listOfLessonsToPay.map(payment => (
              <ListItem
                selected={
                  lessonsSelectedToPay.filter(
                    lesson => lesson.id === payment.id,
                  ).length > 0
                }
                onClick={e => selectLessonToPay(e, payment)}
              >
                • {payment.lesson_date} - {payment.shift}
              </ListItem>
            ))}
          </div>
        </List>
        <HorizontalGroup>
          <Autocomplete
            options={paymentMethods}
            label={trainerTexts.createPurchase.paymentMethod}
            required
            ref={paymentMethodRef}
            width={150}
            onChangeProps={(e: { id: number; display_name: string }) => {
              setPaymentMethodSelected(e)
              if (e.id === 1) {
                setPaymentUserSelected(null)
              }
            }}
          />
          {paymentMethodSelected !== null && paymentMethodSelected.id === 2 && (
            <Autocomplete
              options={paymentUsers}
              label={generalTexts.payments.digital_user}
              required
              ref={paymentUserRef}
              width={150}
              onChangeProps={(e: { id: number; display_name: string }) =>
                setPaymentUserSelected(e)
              }
            />
          )}
        </HorizontalGroup>

        <Total>
          <p>{trainerTexts.createPurchase.total}</p>
          <p>$ {finalPrice}</p>
        </Total>
        {hasDiscount && (
          <span className="aclaration">
            * El cliente cuenta con el pase descontado
          </span>
        )}
        <DeleteRecord
          type="button"
          ref={unusedRef}
          onClick={() =>
            setModalConfirmDelete({
              status: `alert`,
              icon: `IconAlert`,
              title:
                "Estas seguro de que deseas eliminar las clases reservadas?",
              content: `${lessonsSelectedToPay.map(
                lesson => ` ${lesson.lesson_date}`,
              )}`,
            })
          }
        >
          <Tooltip title="Eliminar" placement="bottom-end">
            <Icon icon="IconRemove" color="#FF6363" />
          </Tooltip>
        </DeleteRecord>
      </Form>
    </ModalForm>
  )
}

export default MakePayment
