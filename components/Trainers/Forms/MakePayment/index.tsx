import React, { useContext, useState, useEffect, useRef } from "react"
import {
  getLessonsByPartnerAndPaidAction,
  deleteLessonAction,
  editLessonAction,
} from "helpers/lessons"
import {
  createBoulderPurchaseAction,
  makeAppropiatePayment,
} from "helpers/payments"
import { Lessons } from "contexts/Lessons"
import { GeneralContext } from "contexts/GeneralContext"
import { paymentMethods, paymentUsers } from "const/finances"
import { day, month, year, months } from "const/time"
import ClasesPurchasedInterface from "interfaces/trainers/ClasesPurchasedInterface"
import ModalInterface from "interfaces/components/ModalInterface"
import generalTexts from "strings/general.json"
import trainerTexts from "strings/trainers.json"
import ModalForm from "components/UI/ModalForm"
import ModalAlert from "components/UI/ModalAlert"
import Icon from "components/UI/Assets/Icon"
import Tooltip from "components/UI/Tooltip"
import Autocomplete from "components/UI/Autocomplete"
import checkDiscountForPartners from "../../Helpers/checkDiscountForPartners"
import setPriceWithoutDiscount from "../../Helpers/setPriceWithoutDiscount"
import setPriceWithDiscount from "../../Helpers/setPriceWithDiscount"
import { HorizontalGroup } from "../CreatePurchase/styles"
import { Form, DeleteRecord, ListOfLessons, Lesson, Total } from "./styles"

interface MakePaymentInterface {
  cancelPayment: () => void
}

function MakePayment({ cancelPayment }: MakePaymentInterface) {
  const {
    purchaseSelected,
    setModalSuccess,
    setModalError,
    paymentMethodRef,
    setPaymentMethodSelected,
    setPaymentUserSelected,
    paymentUserSelected,
    paymentUserRef,
    paymentMethodSelected,
    finalPrice,
    setFinalPrice,
  } = useContext(Lessons)
  const { prices } = useContext(GeneralContext)

  const today = `${day}-${month}-${year}`
  const currentUser = parseInt(localStorage.getItem("id"), 10)

  const [hasDiscount, setHasDiscount] = useState<boolean>(false)
  const [disabledButton, setDisabledButton] = useState<boolean>(false)
  const [lessonsNotPaid, setLessonsNotPaid] = useState<
    ClasesPurchasedInterface[]
  >([purchaseSelected])

  const [modalConfirmDelete, setModalConfirmDelete] = useState<ModalInterface>(
    null,
  )

  const [lessonsSelected, setLessonsSelected] = useState<
    ClasesPurchasedInterface[]
  >([])

  const unusedRef = useRef(null)

  const validateInputs = async () => {
    await paymentMethodRef.current?.focus()

    if (paymentMethodSelected?.id === 2) {
      await paymentUserRef.current?.focus()
    }
    await unusedRef.current?.focus()

    const checkPaymentUser =
      paymentMethodSelected?.id === 2
        ? paymentUserRef.current.attributes.getNamedItem("data-error").value ===
          "false"
        : true

    return (
      paymentMethodRef.current.attributes.getNamedItem("data-error").value ===
        "false" && checkPaymentUser
    )
  }

  const handlePayment = async (e: any) => {
    e.preventDefault()

    let message = {
      status: 0,
      message: {},
    }

    const validate = await validateInputs()

    if (validate) {
      setDisabledButton(true)

      for (let i = 0; i < lessonsSelected.length; i += 1) {
        const editLessonBody: ClasesPurchasedInterface = {
          ...lessonsSelected[i],
          paid: "SI",
          final_price: finalPrice / lessonsSelected.length,
          paid_day: today,
          created_by: currentUser,
        }

        // eslint-disable-next-line no-await-in-loop
        const changeLessonToPaid = await editLessonAction(editLessonBody)
        message = changeLessonToPaid
      }

      const boulderPurchaseBody = {
        id: 0,
        amount_of_items: lessonsSelected.length,
        date: today,
        item_id: 4,
        item_name: "Clases",
        payment_method_id: paymentMethodSelected.id,
        profit: finalPrice,
        created_by: currentUser,
      }
      const createBoulderPurchase = await createBoulderPurchaseAction(
        boulderPurchaseBody,
      )
      message = createBoulderPurchase

      if (paymentMethodSelected.id === 2) {
        const makeDigitalPayment = await makeAppropiatePayment(
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
        message = makeDigitalPayment
      }
    }

    if (message.status === 200) {
      setModalSuccess(message.message)
      cancelPayment()
    } else {
      setModalError(message.message)
      cancelPayment()
    }
  }

  const getPartnerDebt = async () => {
    const getLessonsNotPaid = await getLessonsByPartnerAndPaidAction(
      purchaseSelected.partner_id,
      "NO",
    )
    setLessonsNotPaid(getLessonsNotPaid)
    setLessonsSelected(getLessonsNotPaid)
  }

  const removePurchases = async () => {
    let message: {
      status: 200 | 500
      message: {}
    }
    for (let i = 0; i < lessonsSelected.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const deleteCall = await deleteLessonAction(lessonsSelected[i].id)
      message = deleteCall
    }

    if (message.status === 200) {
      setModalSuccess(message.message)
      cancelPayment()
    } else {
      setModalError(message.message)
    }
  }

  const selectLesson = (e: any, lesson: ClasesPurchasedInterface) => {
    e.preventDefault()
    const isAlreadySelected =
      lessonsSelected.filter(item => item.id === lesson.id).length > 0
    if (isAlreadySelected) {
      const filterLesson = lessonsSelected.filter(item => item.id !== lesson.id)
      setLessonsSelected(filterLesson)
    } else {
      const newListOfLessonsSelected = lessonsSelected.concat(lesson)
      setLessonsSelected(newListOfLessonsSelected)
    }
  }

  const calculateFinalPrice = async () => {
    const lessonsArray = []
    lessonsSelected.forEach(lesson =>
      lessonsArray.push({
        id: lesson.id,
        date: lesson.lesson_date,
        shift: lesson.shift,
      }),
    )
    const checkDiscount = await checkDiscountForPartners(
      lessonsNotPaid[0].partner_id,
      lessonsArray,
    )

    const lessonWithDiscount = checkDiscount.filter(
      lesson => lesson.hasDiscount,
    )
    const lessonWithoutDiscount = checkDiscount.filter(
      lesson => !lesson.hasDiscount,
    )

    setHasDiscount(lessonWithDiscount.length > 0)

    const priceWithoutDiscount = setPriceWithoutDiscount(
      lessonWithoutDiscount.length,
      paymentMethodSelected.id,
      prices,
    )

    const priceWithDiscount = setPriceWithDiscount(
      lessonWithDiscount.length,
      paymentMethodSelected,
      prices,
    )

    setFinalPrice(priceWithoutDiscount + priceWithDiscount)
  }

  useEffect(() => {
    getPartnerDebt()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (paymentMethodSelected !== null) {
      calculateFinalPrice()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentMethodSelected, lessonsSelected])

  return (
    <ModalForm
      title={`${trainerTexts.executePayment.title} - ${purchaseSelected.partner_name} ${purchaseSelected.partner_last_name}`}
      cancelButtonContent={generalTexts.actions.cancel}
      submitButtonContent={generalTexts.actions.pay}
      submit={handlePayment}
      cancelFunction={cancelPayment}
      disabledButton={disabledButton}
    >
      <Form>
        {modalConfirmDelete !== null && (
          <ModalAlert
            success={false}
            message={modalConfirmDelete}
            closeModal={() => setModalConfirmDelete(null)}
            closeRefresh={() => setModalConfirmDelete(null)}
            mainButtonContent={generalTexts.actions.removeRecord}
            secondButtonContent={generalTexts.actions.cancel}
            mainAction={removePurchases}
            isNotice
          />
        )}
        <DeleteRecord
          type="button"
          ref={unusedRef}
          onClick={() =>
            setModalConfirmDelete({
              status: `alert`,
              icon: `IconAlert`,
              title: `${trainerTexts.deleteModalWarning.title}`,
              content: `${lessonsSelected.map(
                lesson => ` ${lesson.lesson_date}`,
              )}`,
            })
          }
        >
          <Tooltip
            title={generalTexts.actions.removeRecord}
            placement="bottom-end"
          >
            <Icon icon="IconRemove" color="#FF6363" />
          </Tooltip>
        </DeleteRecord>
        <ListOfLessons>
          <p className="title">{trainerTexts.makePayment.lessonsDebt}</p>
          <div>
            {lessonsNotPaid.length &&
              lessonsNotPaid.map((lesson: ClasesPurchasedInterface) => (
                <Lesson
                  key={lesson.id}
                  selected={
                    lessonsSelected.filter(less => less.id === lesson.id)
                      .length > 0
                  }
                  onClick={e => selectLesson(e, lesson)}
                >
                  • {lesson.lesson_date}
                </Lesson>
              ))}
          </div>
        </ListOfLessons>
        <HorizontalGroup>
          <Autocomplete
            options={paymentMethods}
            label={trainerTexts.createPurchase.paymentMethod}
            required
            width={150}
            ref={paymentMethodRef}
            onChangeProps={(e: { id: number; display_name: string }) => {
              setPaymentMethodSelected(e)
              if (e.id === 1) {
                setPaymentUserSelected(null)
              }
            }}
          />
          {paymentMethodSelected?.id === 2 && (
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
            * {trainerTexts.makePayment.discount}
          </span>
        )}
      </Form>
    </ModalForm>
  )
}

export default MakePayment
