import React, { useContext, useEffect, useState, useRef } from "react"
// DATA STORAGE & TYPES
import {
  createBoulderPurchaseAction,
  makeAppropiatePayment,
} from "helpers/payments"
import {
  getLessonsByPartnerAndPaidAction,
  editLessonAction,
  deleteLessonAction,
} from "helpers/lessons"
import { GeneralContext } from "contexts/GeneralContext"
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
import checkDiscountForLessons from "../../helpers/checkDiscountForLessons"
import calculatePriceWithoutDiscount from "../../helpers/calculatePriceWithoutDiscount"
import calculatePriceWithDiscount from "../../helpers/calculatePriceWithDiscount"
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
    setModalSuccess,
    setModalError,
  } = useContext(Lessons)

  const { prices } = useContext(GeneralContext)

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

  const today = `${day}-${month}-${year}`

  const executePayment = async () => {
    let success: boolean = false
    for (let i = 0; i < lessonsSelectedToPay.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const changePaymentState = await editLessonAction({
        ...lessonsSelectedToPay[i],
        paid: "SI",
        payment_method_id: paymentMethodSelected.id,
        final_price: finalPrice / lessonsSelectedToPay.length,
        paid_day: today,
        created_by: parseInt(localStorage.getItem("id"), 10),
      })
      success = changePaymentState
    }

    const boulderPurchaseCall = await createBoulderPurchaseAction({
      id: 0,
      date: today,
      item_id: 4,
      item_name: "Clases",
      amount_of_items: lessonsSelectedToPay.length,
      profit: finalPrice,
      payment_method_id: paymentMethodSelected.id,
      created_by: parseInt(localStorage.getItem("id"), 10),
    })

    success = boulderPurchaseCall.status === 200
    if (paymentMethodSelected.id === 2) {
      const makePayment = await makeAppropiatePayment(
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
      success = makePayment.status === 200
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
    const checkListOfToPay = await getLessonsByPartnerAndPaidAction(
      data.partner_id,
      "NO",
    )
    setListOfLessonsToPay(checkListOfToPay)
  }

  useEffect(() => {
    checkTypeOfPayment()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  const calculateFinalPrice = async () => {
    const lessonsArray = []
    lessonsSelectedToPay.forEach(lesson =>
      lessonsArray.push({
        id: lesson.id,
        date: lesson.lesson_date,
        shift: lesson.shift,
      }),
    )

    const checkPayment = await checkDiscountForLessons(
      data.partner_id,
      lessonsArray,
    )

    const lessonWithDiscount = checkPayment.filter(lesson => lesson.hasDiscount)
    const lessonWithoutDiscount = checkPayment.filter(
      lesson => !lesson.hasDiscount,
    )

    setHasDiscount(lessonWithDiscount.length > 0)

    const priceWithoutDiscount = calculatePriceWithoutDiscount(
      lessonWithoutDiscount.length,
      paymentMethodSelected.id,
      prices,
    )

    const priceWithDiscount = calculatePriceWithDiscount(
      lessonWithDiscount.length,
      paymentMethodSelected,
      prices,
    )

    setFinalPrice(priceWithoutDiscount + priceWithDiscount)
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
      const deleteCall = await deleteLessonAction(lessonsSelectedToPay[i].id)
      success = deleteCall
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
