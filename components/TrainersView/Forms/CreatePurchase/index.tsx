import React, { useContext } from "react"
import { Lessons } from "contexts/Lessons"
import { searchPartnerAction, createPartnerAction } from "helpers/partners"
import {
  createBoulderPurchaseAction,
  makeAppropiatePayment,
} from "helpers/payments"
import { createLessonPurchaseAction } from "helpers/lessons"
import PartnerPaymentsHistoryInterface from "interfaces/finances/PartnerPaymentsHistory"
import ClasesPurchasedInterface from "interfaces/trainers/ClasesPurchasedInterface"
import LessonsSelectedInterface from "interfaces/trainers/LessonsSelected"
import trainerTexts from "strings/trainers.json"
import generalTexts from "strings/general.json"
import { day, month, year } from "const/time"
import yesOrNoArr from "const/fixedVariables"
import ModalForm from "components/UI/ModalForm"
import Autocomplete from "components/UI/Autocomplete"
import SelectPartner from "./SelectPartner"
import SelectLessons from "./SelectLessons"
import SearchResults from "./SearchResults"
import PaymentSection from "./PaymentSection"
import CreateClient from "./CreatePartner"
import getWeekNumber from "../../Helpers/getWeekNumber"
import { Form, HorizontalGroup } from "./styles"

interface CreatePurchaseInterface {
  cancelCreatePurchase: () => void
}

function CreatePurchase({ cancelCreatePurchase }: CreatePurchaseInterface) {
  const {
    clientRef,
    setClientSelected,
    setClientIsRegistered,
    clientIsRegistered,
    clientSelected,
    amountOfLessons,
    datesSelected,
    identificationError,
    disablePurchaseButton,
    setDisablePurchaseButton,
    amountOfLessonsRef,
    lessonRef,
    shiftRef,
    buyedComboRef,
    buyedCombo,
    paysNowRef,
    paid,
    paymentMethodRef,
    paymentUserRef,
    paymentMethodSelected,
    nameRef,
    lastNameRef,
    identificationNumberRef,
    newPartnerData,
    setIdentificationError,
    finalPrice,
    paymentUserSelected,
  } = useContext(Lessons)

  const today = `${day}-${month}-${year}`
  const currentUser = parseInt(localStorage.getItem("id"), 10)

  const validateInputsIsRegistered = async () => {
    await clientRef.current?.focus()
    await amountOfLessonsRef.current?.focus()
    await lessonRef.current?.focus()
    await shiftRef.current?.focus()
    await buyedComboRef.current?.focus()

    if (!buyedCombo) {
      await paysNowRef.current?.focus()
    }

    if (!buyedCombo && paid) {
      await paymentMethodRef.current?.focus()
    }

    if (!buyedCombo && paid && paymentMethodSelected.id === 2) {
      await paymentUserRef.current?.focus()
    }

    const checkPaid = !buyedCombo
      ? paysNowRef.current?.attributes.getNamedItem("data-error").value ===
        "false"
      : true

    await buyedComboRef.current?.focus()

    const checkPaymentMethod =
      !buyedCombo && paid
        ? paymentMethodRef.current.attributes.getNamedItem("data-error")
            .value === "false"
        : true

    const checkPaymentUser =
      !buyedCombo && paid && paymentMethodSelected.id === 2
        ? paymentUserRef.current.attributes.getNamedItem("data-error").value ===
          "false"
        : true

    return (
      clientRef.current.attributes.getNamedItem("data-error").value ===
        "false" &&
      amountOfLessonsRef.current?.attributes.getNamedItem("data-error")
        .value === "false" &&
      lessonRef.current?.attributes.getNamedItem("data-error").value ===
        "false" &&
      shiftRef.current?.attributes.getNamedItem("data-error").value ===
        "false" &&
      buyedComboRef.current?.attributes.getNamedItem("data-error").value ===
        "false" &&
      checkPaid &&
      checkPaymentMethod &&
      checkPaymentUser
    )
  }

  const validateInputsIsNotRegistered = async () => {
    await nameRef.current?.focus()
    await lastNameRef.current?.focus()
    await identificationNumberRef.current?.focus()
    await clientRef.current?.focus()
    await amountOfLessonsRef.current?.focus()
    await lessonRef.current?.focus()
    await shiftRef.current?.focus()
    await paysNowRef.current?.focus()

    if (paid) {
      await paymentMethodRef.current?.focus()
    }

    if (paid && paymentMethodSelected?.id === 2) {
      await paymentUserRef.current?.focus()
    }

    const checkPaymentMethod = paid
      ? paymentMethodRef.current?.attributes.getNamedItem("data-error")
          .value === "false"
      : true

    const checkPaymentUser =
      paid && paymentMethodSelected?.id === 2
        ? paymentUserRef.current?.attributes.getNamedItem("data-error")
            .value === "false"
        : true

    return (
      nameRef.current?.attributes.getNamedItem("data-error").value ===
        "false" &&
      lastNameRef.current?.attributes.getNamedItem("data-error").value ===
        "false" &&
      identificationNumberRef.current?.attributes.getNamedItem("data-error")
        .value === "false" &&
      clientRef.current.attributes.getNamedItem("data-error").value ===
        "false" &&
      amountOfLessonsRef.current?.attributes.getNamedItem("data-error")
        .value === "false" &&
      lessonRef.current?.attributes.getNamedItem("data-error").value ===
        "false" &&
      shiftRef.current?.attributes.getNamedItem("data-error").value ===
        "false" &&
      checkPaymentMethod &&
      checkPaymentUser
    )
  }

  const checkIfPartnerIsDuplicated = async () => {
    const validate = await searchPartnerAction(
      newPartnerData.identification_number,
    )
    return validate.data.length > 0
  }

  const createBoulderPurchase = async () => {
    let success = false
    const boulderPurchaseBody: PartnerPaymentsHistoryInterface = {
      id: 0,
      amount_of_items: amountOfLessons,
      date: today,
      item_id: 4,
      item_name: `${trainerTexts.lessons}`,
      payment_method_id: paymentMethodSelected.id,
      profit: finalPrice,
      created_by: currentUser,
    }

    const makePurchase = await createBoulderPurchaseAction(boulderPurchaseBody)
    success = makePurchase.status === 200

    if (paymentMethodSelected === 2) {
      const makeDigitalPayment = await makeAppropiatePayment(
        paymentUserSelected.id,
        finalPrice,
        paymentUserSelected,
      )
      success = makeDigitalPayment.status === 200
    }
    return success
  }

  const createLessonPurchases = async (id: number) => {
    let success = false

    datesSelected.forEach(async (lesson: LessonsSelectedInterface) => {
      const lessonDate = `${lesson.date.slice(0, 2)}-${lesson.date.slice(
        3,
        5,
      )}-${lesson.date.slice(6, 10)}`
      const lessonBody: ClasesPurchasedInterface = {
        id: 0,
        lesson_date: lessonDate,
        shift: lesson.shift,
        partner_id: id,
        partner_name: clientSelected.name,
        partner_last_name: clientSelected.last_name,
        trainer_id: 0,
        trainer_name: "",
        week_id: getWeekNumber(lessonDate).week,
        paid: paid ? "SI" : "NO",
        day_id: getWeekNumber(lessonDate).day.getDay(),
        final_price: paid ? finalPrice / amountOfLessons : 0,
        payment_method_id: paid ? paymentMethodSelected.id : 0,
        paid_day: paid ? today : "",
        created_by: currentUser,
      }
      const createLesson = await createLessonPurchaseAction(lessonBody)
      success = createLesson
    })

    return success
  }

  const handleCreatePurchase = async (e: any) => {
    e.preventDefault()
    let success = false

    if (clientIsRegistered) {
      const validate = await validateInputsIsRegistered()

      if (validate && clientSelected !== null) {
        // eslint-disable-next-line no-console
        console.log("crear")
        setDisablePurchaseButton(true)

        if (paid) {
          const executePurchase = await createBoulderPurchase()
          success = executePurchase
        }

        const createLessons = await createLessonPurchases(clientSelected.id)
        success = createLessons
        // function comun
      }
    } else {
      const validate = await validateInputsIsNotRegistered()

      if (validate) {
        // validar dni
        const validateDuplicated = await checkIfPartnerIsDuplicated()
        setIdentificationError(validateDuplicated)

        if (!validateDuplicated) {
          // eslint-disable-next-line no-console
          console.log("se puede")
          // crear socio
          const createPartner = await createPartnerAction(newPartnerData)
          success = createPartner.status === 200

          const createLessons = await createLessonPurchases(
            createPartner.partnerId,
          )
          success = createLessons

          if (paid) {
            const executePurchase = await createBoulderPurchase()
            success = executePurchase
          }
        } else {
          // eslint-disable-next-line no-console
          console.log("no se puede por dni - BORRAR ESTE ELSE")
        }
      } else {
        // eslint-disable-next-line no-console
        console.log("no se puede - BORRAR ESTE ELSE")
      }
    }
    // eslint-disable-next-line no-console
    console.log("success", success)
  }

  return (
    <ModalForm
      title={trainerTexts.createPurchase.title}
      cancelButtonContent={generalTexts.actions.cancel}
      submitButtonContent={generalTexts.actions.create}
      submit={handleCreatePurchase}
      cancelFunction={cancelCreatePurchase}
      disabledButton={disablePurchaseButton && !identificationError}
    >
      <Form>
        <HorizontalGroup>
          <Autocomplete
            label={trainerTexts.createPurchase.registeredLabel}
            required
            width={200}
            options={yesOrNoArr}
            ref={clientRef}
            onChangeProps={(e: { id: number; display_name: string }) => {
              if (e.id === 1) {
                setClientIsRegistered(true)
                setClientSelected(null)
              } else {
                setClientIsRegistered(false)
                setClientSelected(null)
              }
            }}
          />
          {clientIsRegistered && <SelectPartner />}
        </HorizontalGroup>
        <SearchResults />
        {!clientIsRegistered && clientIsRegistered !== null && <CreateClient />}

        {((clientIsRegistered && clientSelected !== null) ||
          (!clientIsRegistered &&
            clientIsRegistered !== null &&
            clientSelected === null)) && <SelectLessons />}

        {amountOfLessons > 0 && datesSelected.length === amountOfLessons && (
          <PaymentSection />
        )}
      </Form>
    </ModalForm>
  )
}

export default CreatePurchase
