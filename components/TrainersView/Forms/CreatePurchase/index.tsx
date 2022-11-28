import React, { useContext } from "react"
import { Lessons } from "contexts/Lessons"
import trainerTexts from "strings/trainers.json"
import generalTexts from "strings/general.json"
import yesOrNoArr from "const/fixedVariables"
import ModalForm from "components/UI/ModalForm"
import Autocomplete from "components/UI/Autocomplete"
import SelectPartner from "./SelectPartner"
import SelectLessons from "./SelectLessons"
import SearchResults from "./SearchResults"
import PaymentSection from "./PaymentSection"
import CreateClient from "./CreatePartner"
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
  } = useContext(Lessons)

  console.log(clientIsRegistered)

  const validateInputs = async () => {
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

  const validatePartnerInputs = async () => {
    await nameRef.current?.focus()
    await lastNameRef.current?.focus()
    await identificationNumberRef.current?.focus()

    return (
      nameRef.current?.attributes.getNamedItem("data-error").value ===
        "false" &&
      lastNameRef.current?.attributes.getNamedItem("data-error").value ===
        "false" &&
      identificationNumberRef.current?.attributes.getNamedItem("data-error")
        .value === "false"
    )
  }

  const handleCreatePurchase = async (e: any) => {
    e.preventDefault()

    if (clientIsRegistered) {
      const validate = await validateInputs()

      if (validate && clientSelected !== null) {
        // eslint-disable-next-line no-console
        console.log("crear")
        setDisablePurchaseButton(true)
      }
    } else {
      const validatePartner = await validatePartnerInputs()
      const validate = await validateInputs()

      if (validatePartner && validate) {
        // validar dni
        console.log("se puede")
      } else {
        console.log("no se puede")
      }
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
