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
import trainerTexts from "strings/trainers.json"
import generalTexts from "strings/general.json"
import { day, month, year, months } from "const/time"
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
    setClientSelected,
    setClientIsRegistered,
    clientIsRegistered,
    clientSelected,
    amountOfLessons,
    datesSelected,
    identificationError,
    disablePurchaseButton,
    setDisablePurchaseButton,
    paymentMethodSelected,
    newPartnerData,
    setIdentificationError,
    finalPrice,
    paymentUserSelected,
    setModalSuccess,
    setModalError,
    setCreateLessonPurchaseView,
    clientRef,
    amountOfLessonsRef,
    lessonRef,
    shiftRef,
    buyedComboRef,
    buyedCombo,
    paysNowRef,
    paid,
    paymentMethodRef,
    paymentUserRef,
    nameRef,
    lastNameRef,
    identificationNumberRef,
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
          created_by: currentUser,
        },
      )

      success = makeDigitalPayment.status === 200
    }
    return success
  }

  const createLessonPurchases = async (
    id: number,
    name: string,
    lastName: string,
  ) => {
    let message

    // datesSelected.forEach(async (lesson: LessonsSelectedInterface) => {
    for (let i = 0; i < amountOfLessons; i += 1) {
      const lessonDate = `${datesSelected[i].date.slice(0, 2)}-${datesSelected[
        i
      ].date.slice(3, 5)}-${datesSelected[i].date.slice(6, 10)}`
      const lessonBody: ClasesPurchasedInterface = {
        id: 0,
        lesson_date: lessonDate,
        shift: datesSelected[i].shift,
        partner_id: id,
        partner_name: name,
        partner_last_name: lastName,
        trainer_id: 0,
        trainer_name: "",
        week_id: getWeekNumber(lessonDate).week,
        paid: paid || buyedCombo ? "SI" : "NO",
        day_id: getWeekNumber(lessonDate).day.getDay(),
        final_price: paid ? finalPrice / amountOfLessons : 0,
        payment_method_id: paid ? paymentMethodSelected.id : 0,
        paid_day: paid ? today : "",
        created_by: currentUser,
      }
      // eslint-disable-next-line no-await-in-loop
      const createLesson = await createLessonPurchaseAction(lessonBody)

      message = createLesson
    }
    // })

    return message
  }

  const handleCreatePurchase = async (e: any) => {
    e.preventDefault()
    let success = false
    let canShowModalError = true
    let modalMessage = {}

    if (clientIsRegistered) {
      const validate = await validateInputsIsRegistered()

      if (validate && clientSelected !== null) {
        setDisablePurchaseButton(true)

        if (paid) {
          const executePurchase = await createBoulderPurchase()
          success = executePurchase
        }

        const createLessons = await createLessonPurchases(
          clientSelected.id,
          clientSelected.name,
          clientSelected.last_name,
        )
        success = createLessons.status === 200
        modalMessage = createLessons.message
      }
    } else {
      const validate = await validateInputsIsNotRegistered()

      if (validate) {
        const validateDuplicated = await checkIfPartnerIsDuplicated()
        setIdentificationError(validateDuplicated)
        canShowModalError = !validateDuplicated

        if (!validateDuplicated) {
          const createPartner = await createPartnerAction(newPartnerData)
          success = createPartner.status === 200

          const createLessons = await createLessonPurchases(
            createPartner.partnerId,
            newPartnerData.name,
            newPartnerData.last_name,
          )
          success = createLessons.status === 200
          console.log("createLessons", createLessons)

          modalMessage = createLessons.message

          if (paid) {
            const executePurchase = await createBoulderPurchase()
            success = executePurchase
          }
        }
      }
    }
    if (success) {
      setModalSuccess(modalMessage)
      setCreateLessonPurchaseView(false)
    }
    if (canShowModalError && !success) {
      setModalError(modalMessage)
      setCreateLessonPurchaseView(false)
    }
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
