/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useContext, useEffect } from "react"
// SERVICES
// DATA STORAGE & TYPES
import { searchPartnerAction } from "helpers/partners"
import { GeneralContext } from "contexts/GeneralContext"
import { paymentMethods, paymentUsers } from "const/finances"
import yesOrNoArr from "const/fixedVariables"
import { shifts, day, month, year } from "const/time"
import { Lessons } from "contexts/Lessons"
import PartnerInterface from "interfaces/partners/PartnerInterface"
import trainerTexts from "strings/trainers.json"
import generalTexts from "strings/general.json"
// COMPONENTS & STYLING
import ModalForm from "components/UI/ModalForm"
import Autocomplete from "components/UI/Autocomplete"
import SearchBar from "components/UI/SearchBar"
import TextField from "components/UI/TextField"
import InputCalendar from "components/UI/InputCalendar"
import Icon from "components/UI/Assets/Icon"
import PopOver from "components/UI/PopOver"
import ScrollView from "components/UI/ScrollView"
import deleteLessonFromList from "../../helpers/deleteLessonFromList"
import checkIfDateHasSpace from "../../helpers/checkIfDateHasSpace"
import calculatePriceWithoutDiscount from "../../helpers/calculatePriceWithoutDiscount"
import checkDiscount from "../../helpers/checkDiscount"
import calculatePriceWithDiscount from "../../helpers/calculatePriceWithDiscount"
import {
  FormContainer,
  HorizontalGroup,
  RegisterClientContainer,
  SelectedClient,
  PopOverContainer,
  Results,
  ListItem,
  LessonsContainer,
  LessonsSubGroup,
  LessonsPurchasedList,
  DisablingDiv,
  AcceptButton,
  PriceContainer,
  Warning,
} from "./styles"

interface CreatePurchaseInterface {
  handleCreatePurchase: (arg?: any) => void
  cancelCreatePurchase: (arg?: any) => void
}

function CreatePurchaseModal({
  handleCreatePurchase,
  cancelCreatePurchase,
}: CreatePurchaseInterface) {
  const {
    clientRef,
    birthDateRef,
    amountOfLessonsRef,
    amountOfLessons,
    setAmountOfLessons,
    lessonRef,
    datesSelected,
    setDatesSelected,
    paymentMethodSelected,
    setPaymentMethodSelected,
    clientSelected,
    setClientSelected,
    paid,
    setPaid,
    finalPrice,
    setFinalPrice,
    setPaymentUserSelected,
    setNewPartnerData,
    newPartnerData,
    clientIsRegistered,
    setClientIsRegistered,
    shiftRef,
    paysNowRef,
    paymentMethodRef,
    paymentUserRef,
    paymentUserSelected,
    identificationError,
    buyedCombo,
    setBuyedCombo,
    cleanStates,
    disablePurchaseButton,
  } = useContext(Lessons)
  const { prices } = useContext(GeneralContext)

  const [popOverView, setPopOverView] = useState<boolean>(false)

  const [searchValue, setSearchValue] = useState<string>("")
  const [searchResults, setSearchResults] = useState<PartnerInterface[]>([])
  const [cannotAddDate, setCannotAddDate] = useState<boolean>(false)

  const [provisionalSelection, setProvisionalSelection] = useState<{
    date: string
    shift: "AM" | "PM" | ""
  }>({
    date: "",
    shift: "",
  })

  const searchClients = async () => {
    if (searchValue.length > 3) {
      const searchCall = await searchPartnerAction(searchValue)
      setSearchResults(searchCall.data)
    } else {
      setSearchResults([])
    }
  }

  const handle = err => {
    console.log("hubo un error", err)
  }

  useEffect(() => {
    searchClients()
      // eslint-disable-next-line no-console
      .catch(err => handle(err))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue])

  const setFinalPriceFunction = () => {
    const calcFinalPrice = calculatePriceWithoutDiscount(
      amountOfLessons,
      paymentMethodSelected.id,
      prices,
    )
    setFinalPrice(calcFinalPrice)
  }

  const calculatePrice = async () => {
    const hasDiscount = await checkDiscount(clientSelected.id)
    let price: number = 0

    if (hasDiscount) {
      price = calculatePriceWithDiscount(
        amountOfLessons,
        paymentMethodSelected.id,
        prices,
      )
      setFinalPrice(price)
    } else {
      setFinalPriceFunction()
    }
  }

  useEffect(() => {
    if (paid && paymentMethodSelected !== null) {
      if (clientSelected !== null && clientSelected.free_pass === 1) {
        calculatePrice()
      } else {
        setFinalPriceFunction()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentMethodSelected, paid])

  const selectedClient = clientIsRegistered
    ? clientSelected !== null
    : clientSelected === null
  const selectedAmountOfLessons = amountOfLessons > 0
  const selectedAmount = datesSelected.length === amountOfLessons
  const selectedPays = paid && paymentMethodSelected !== null

  let payment: boolean = false
  if (paid) {
    if (selectedPays && paymentMethodSelected.id === 2) {
      payment = paymentUserSelected !== null
    } else if (selectedPays && paymentMethodSelected.id === 1) {
      payment = true
    }
  } else {
    payment = true
  }

  const partnerDataFilled =
    newPartnerData.name !== "" &&
    newPartnerData.last_name !== "" &&
    newPartnerData.identification_number !== "" &&
    newPartnerData.membership_start_date !== ""

  const conditionsForClientRegistered =
    clientIsRegistered &&
    selectedClient &&
    selectedAmountOfLessons &&
    selectedAmount &&
    ((paid !== null && payment) || buyedCombo)

  const conditionsForClientNotRegistered =
    selectedAmountOfLessons &&
    selectedAmount &&
    paid !== null &&
    payment &&
    !identificationError &&
    partnerDataFilled

  const canExecute = clientIsRegistered
    ? conditionsForClientRegistered
    : conditionsForClientNotRegistered

  return (
    <ModalForm
      title={trainerTexts.createPurchase.title}
      cancelButtonContent={generalTexts.actions.cancel}
      submitButtonContent={generalTexts.actions.create}
      submit={handleCreatePurchase}
      cancelFunction={cancelCreatePurchase}
      disabledButton={
        (!canExecute || disablePurchaseButton) && !identificationError
      }
    >
      <FormContainer>
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
          {clientIsRegistered && (
            <div className="search">
              <SearchBar
                searchValue={searchValue}
                onChangeSearch={e => setSearchValue(e.target.value)}
                width={220}
              />
              <PopOverContainer>
                <PopOver
                  title={trainerTexts.createPurchase.search}
                  description={trainerTexts.createPurchase.searchDescription}
                  view={popOverView}
                />
              </PopOverContainer>
              <div
                style={{ cursor: "pointer" }}
                onClick={() => setPopOverView(!popOverView)}
              >
                <Icon icon="IconHelp" />
              </div>
              <SelectedClient>
                <p>
                  {clientSelected?.name} {clientSelected?.last_name}
                </p>
                <button onClick={() => cleanStates()} type="button">
                  <Icon icon="IconMenuOff" />
                </button>
              </SelectedClient>
            </div>
          )}
        </HorizontalGroup>
        <Results>
          {searchValue !== "" && (
            <>
              <p className="title">{trainerTexts.createPurchase.results}</p>
              <ScrollView height={150}>
                {searchResults.length > 0 &&
                  searchResults.map((client: PartnerInterface) => (
                    <ListItem
                      selected={client.id === clientSelected?.id}
                      key={client.id}
                      onClick={() => {
                        setClientSelected(client)
                        setSearchResults([])
                        setSearchValue("")
                      }}
                    >
                      <span>
                        • {client.name} {client.last_name}
                      </span>
                    </ListItem>
                  ))}
              </ScrollView>
            </>
          )}
        </Results>

        {!clientIsRegistered && clientIsRegistered !== null && (
          <RegisterClientContainer>
            <HorizontalGroup>
              <TextField
                label={generalTexts.labels.name}
                required
                type="text"
                width={200}
                onChange={e => {
                  setNewPartnerData({ ...newPartnerData, name: e.target.value })
                }}
              />
              <TextField
                label={generalTexts.labels.lastName}
                required
                type="text"
                width={200}
                onChange={e => {
                  setNewPartnerData({
                    ...newPartnerData,
                    last_name: e.target.value,
                  })
                }}
              />
              <TextField
                label={generalTexts.labels.identificationNumber}
                required
                type="text"
                width={200}
                backError={identificationError}
                backErrorMessage={trainerTexts.createPurchase.errorMessage}
                onChange={e => {
                  setNewPartnerData({
                    ...newPartnerData,
                    identification_number: e.target.value,
                  })
                }}
              />
            </HorizontalGroup>
            <HorizontalGroup>
              <InputCalendar
                label={generalTexts.labels.birthDate}
                reference={birthDateRef}
                width={200}
                onChange={e => {
                  setNewPartnerData({
                    ...newPartnerData,
                    birth_date: e.selectedChangeDate,
                  })
                }}
              />
              <TextField
                label={generalTexts.labels.email}
                type="email"
                width={200}
                onChange={e => {
                  setNewPartnerData({
                    ...newPartnerData,
                    email: e.target.value,
                  })
                }}
              />
              <TextField
                label={generalTexts.labels.phoneNumber}
                type="text"
                width={200}
                onChange={e => {
                  setNewPartnerData({
                    ...newPartnerData,
                    phone: e.target.value,
                  })
                }}
              />
            </HorizontalGroup>
          </RegisterClientContainer>
        )}

        {(clientSelected !== null || clientIsRegistered === false) && (
          <div className="subdiv">
            <LessonsContainer>
              <LessonsSubGroup>
                <TextField
                  label={trainerTexts.createPurchase.amountOfLessons}
                  type="number"
                  max={10}
                  width={100}
                  required
                  reference={amountOfLessonsRef}
                  onChange={e => {
                    if (e.target.value.length > 0) {
                      setAmountOfLessons(parseInt(e.target.value, 10))
                    } else {
                      setAmountOfLessons(0)
                    }
                  }}
                />
              </LessonsSubGroup>

              {(amountOfLessons === 0 ||
                datesSelected.length === amountOfLessons) && <DisablingDiv />}

              <LessonsSubGroup>
                <InputCalendar
                  position={clientIsRegistered ? "bottom-left" : "top-left"}
                  label={trainerTexts.createPurchase.lessonsDate}
                  minCalendarDate={`${day}/${month}/${year}`}
                  valueCalendar={provisionalSelection.date}
                  required={datesSelected.length < amountOfLessons}
                  reference={lessonRef}
                  width={150}
                  onChange={e =>
                    setProvisionalSelection({
                      ...provisionalSelection,
                      date: e.selectedChangeDate,
                      shift: provisionalSelection.shift,
                    })
                  }
                />
                <Autocomplete
                  setValue={provisionalSelection.shift}
                  width={110}
                  label={trainerTexts.createPurchase.shift}
                  required={datesSelected.length < amountOfLessons}
                  ref={shiftRef}
                  options={shifts}
                  onChangeProps={(e: {
                    id: number
                    display_name: "AM" | "PM"
                  }) =>
                    setProvisionalSelection({
                      ...provisionalSelection,
                      date: provisionalSelection.date,
                      shift: e.display_name,
                    })
                  }
                />
                <AcceptButton
                  type="button"
                  disabled={
                    provisionalSelection.date === "" ||
                    provisionalSelection.shift === ""
                  }
                  onClick={async () => {
                    if (
                      provisionalSelection.date !== "" &&
                      provisionalSelection.shift !== ""
                    ) {
                      const checkDate = await checkIfDateHasSpace(
                        provisionalSelection,
                        datesSelected,
                      )

                      if (checkDate.can) {
                        setDatesSelected(checkDate.newDates)
                        setProvisionalSelection({
                          date: "",
                          shift: "",
                        })
                        setCannotAddDate(false)
                      } else {
                        setCannotAddDate(true)
                      }
                    }
                  }}
                >
                  <Icon icon="IconCheck" />
                </AcceptButton>
              </LessonsSubGroup>
            </LessonsContainer>
            <LessonsPurchasedList>
              <p className="title">
                {trainerTexts.createPurchase.datesSelected}
              </p>
              <ScrollView height={100}>
                <div className="dates">
                  {datesSelected.length > 0 &&
                    datesSelected.map(date => (
                      <p key={date.id}>
                        <span>• {date.date}</span> <b>{date.shift}</b>
                        <button
                          type="button"
                          onClick={() => {
                            const newArrayOfDates = deleteLessonFromList(
                              date,
                              datesSelected,
                            )
                            setDatesSelected(newArrayOfDates)
                          }}
                        >
                          <Icon icon="IconMenuOff" />
                        </button>
                      </p>
                    ))}
                </div>
              </ScrollView>
            </LessonsPurchasedList>
          </div>
        )}
        {cannotAddDate && (
          <Warning>{trainerTexts.createPurchase.warningMessage}</Warning>
        )}
        {amountOfLessons > 0 && datesSelected.length === amountOfLessons && (
          <LessonsSubGroup>
            {clientSelected !== null && (
              <Autocomplete
                options={yesOrNoArr}
                label={trainerTexts.createPurchase.buyed_combo}
                required
                ref={paysNowRef}
                width={100}
                onChangeProps={(e: { id: number; display_name: string }) => {
                  if (e.id === 1) {
                    setBuyedCombo(true)
                    setFinalPrice(0)
                    setPaid(null)
                    setPaymentMethodSelected(null)
                  } else {
                    setBuyedCombo(false)
                    setPaid(null)
                    setPaymentMethodSelected(null)
                  }
                }}
              />
            )}
            {(!buyedCombo || clientSelected === null) && (
              <Autocomplete
                options={yesOrNoArr}
                label={trainerTexts.createPurchase.paysNow}
                required
                ref={paysNowRef}
                width={100}
                onChangeProps={(e: { id: number; display_name: string }) => {
                  if (e.id === 1) {
                    setPaid(true)
                  } else {
                    setPaid(false)
                    setFinalPrice(0)
                    setPaymentUserSelected(null)
                    setPaymentMethodSelected(null)
                  }
                }}
              />
            )}
            {((clientSelected !== null && paid && !buyedCombo) ||
              (clientSelected === null && paid)) && (
              <Autocomplete
                options={paymentMethods}
                label={trainerTexts.createPurchase.paymentMethod}
                required
                ref={paymentMethodRef}
                width={100}
                onChangeProps={(e: { id: number; display_name: string }) => {
                  setPaymentMethodSelected(e)
                  if (e.id === 1) {
                    setPaymentUserSelected(null)
                  }
                }}
              />
            )}
            {paymentMethodSelected !== null &&
              paymentMethodSelected.id === 2 &&
              paid !== null && (
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
            <PriceContainer>
              <p>{trainerTexts.createPurchase.total}</p>{" "}
              <p>
                <b>${finalPrice}</b>
              </p>
            </PriceContainer>
          </LessonsSubGroup>
        )}
      </FormContainer>
    </ModalForm>
  )
}

export default CreatePurchaseModal
